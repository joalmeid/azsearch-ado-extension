import * as tl from 'azure-pipelines-task-lib/task';
import * as fs from 'fs';
const fsPromises = require('fs').promises;
// const { promisify } = require("util");
import * as msRestAzure from 'ms-rest-azure';
import { AzureServiceClient } from 'ms-rest-azure';
import { IncomingMessage, UrlBasedRequestPrepareOptions } from 'ms-rest';
import { DocumentOperationTaskParameters } from '../azure-devops-models';
import {
  AZSEARCH_DATAAPI_VERSION,
  AZSEARCH_MGMTAPI_VERSION,
  AzureSearchClient,
  AdminKeyResult,
  DocumentOptions,
  DocumentOpResult
} from '../../../common';

export class azDocumentController {
  private taskParameters: DocumentOperationTaskParameters;
  private asClient: AzureSearchClient;
  private docOptions: DocumentOptions;

  constructor(taskParameters: DocumentOperationTaskParameters) {
    this.taskParameters = taskParameters;
    this.asClient = new AzureSearchClient();

    this.docOptions = {
      subscriptionId: this.taskParameters.subscriptionId,
      azsearchName: this.taskParameters.azsearchName,
      resourceGroup: this.taskParameters.resourceGroupName,
      payloadPath:
        this.taskParameters.jsonPayloadLocation == 'filePath'
          ? this.taskParameters.jsonPayloadPath
          : null,
      payload: this.taskParameters.inlineJsonPayload,
      indexName: this.taskParameters.indexName
    };
  }

  public addUpdateDeleteDocument(): Promise<DocumentOpResult[]> {
    return new Promise<DocumentOpResult[]>(async (resolve, reject) => {
      try {
        if (this.docOptions.payloadPath) {
          this.docOptions.payload = fs.readFileSync(
            this.docOptions.payloadPath,
            'utf8'
          );
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.docOptions.azsearchName}.search.windows.net/indexes/${this.docOptions.indexName}/docs/index?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          },
          body: this.docOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            let opsList: DocumentOpResult[] = result.value;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode == 200) {
              console.log(
                tl.loc(
                  'AzureSearchDocumentSuccess',
                  this.docOptions.azsearchName
                )
              );
              resolve(opsList);
            } else if (response.statusCode == 207) {
              console.log(
                tl.loc(
                  'AzureSearchDocumentWarning',
                  this.docOptions.azsearchName
                )
              );
              resolve(opsList);
            } else if (response.statusCode == 429) {
              console.log(
                tl.loc(
                  'AzureSearchDocumentQuotaExceeded',
                  this.docOptions.azsearchName
                )
              );
              resolve(opsList);
            } else {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public searchDocument(): Promise<any[]> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.docOptions.azsearchName}.search.windows.net/indexes/${this.docOptions.indexName}/docs/search?$count=true&api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          }
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else {
              console.log(
                tl.loc(
                  'AzureSearchDocumentSearchExecuted',
                  result['@odata.count']
                )
              );
              resolve(result);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public countDocuments(): Promise<number> {
    return new Promise<number>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.docOptions.azsearchName}.search.windows.net/indexes/${this.docOptions.indexName}/docs/$count?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          }
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            } else {
              console.log(tl.loc('AzureSearchDocumentCountExecuted', result));
              resolve(result);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  // Azure
  public async setupAzure(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try {
        this.asClient.azureClient = await this.LoginAzure(
          this.taskParameters.clientId,
          this.taskParameters.clientSecret,
          this.taskParameters.tenantId
        );
        this.asClient.azureSearchAdminKey = await this.GetAzureSearchKey(
          this.asClient.azureClient,
          this.taskParameters.subscriptionId,
          this.taskParameters.resourceGroupName,
          this.taskParameters.azsearchName
        );
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  private async LoginAzure(
    clientId: string,
    secret: string,
    domain: string
  ): Promise<AzureServiceClient> {
    return new Promise<AzureServiceClient>(async (resolve, reject) => {
      try {
        await msRestAzure.loginWithServicePrincipalSecret(
          clientId,
          secret,
          domain,
          (err, creds) => {
            if (err) {
              tl.debug(tl.loc('AzureRESTAuthenticationError', err.message));
              reject(tl.loc('AzureRESTAuthenticationError', err.message));
            }
            resolve(new AzureServiceClient(creds, {}));
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  private async GetAzureSearchKey(
    azureClient: AzureServiceClient,
    subscriptionId: string,
    resourceGroupName: string,
    searchServiceName: string
  ): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Search/searchServices/${searchServiceName}/listAdminKeys?api-version=${AZSEARCH_MGMTAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null
        };

        let request = await azureClient.sendRequest(
          options,
          (err, result: AdminKeyResult, request, response) => {
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode == 404) {
              tl.debug(
                tl.loc(
                  'AzureResourceNotFound',
                  subscriptionId,
                  resourceGroupName,
                  searchServiceName
                )
              );
              reject(
                tl.loc(
                  'AzureResourceNotFound',
                  subscriptionId,
                  resourceGroupName,
                  searchServiceName
                )
              );
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', response.statusMessage));
              reject(tl.loc('AzureRESTRequestError', response.statusMessage));
            } else {
              tl.debug(tl.loc('AzureSearchAdminKeyResult'));
              resolve(result.primaryKey);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
