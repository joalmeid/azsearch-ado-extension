import * as tl from 'azure-pipelines-task-lib/task';
import * as fs from 'fs';
import { UrlBasedRequestPrepareOptions } from 'ms-rest';
import { DocumentOperationTaskParameters } from '../azure-devops-models';
import {
  AZSEARCH_DATAAPI_VERSION,
  AzureSearchClient,
  DocumentOptions,
  DocumentOpResult
} from '../../../common';

export class azDocumentController {
  private taskParameters: DocumentOperationTaskParameters;
  public asClient: AzureSearchClient;
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
}
