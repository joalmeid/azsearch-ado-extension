import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
const fsPromises = require('fs').promises; 
// const { promisify } = require("util");
import * as msRestAzure from 'ms-rest-azure';
import { AzureServiceClient } from 'ms-rest-azure';
import { IncomingMessage, UrlBasedRequestPrepareOptions } from 'ms-rest';
import { IndexOperationTaskParameters } from '../azure-devops-models'
import { AzureSearchClient, AdminKeyResult, IndexOptions, Index, IndexStatistics} from '../azsearch-models'

const AZSEARCH_DATAAPI_VERSION: string = '2019-05-06'
const AZSEARCH_MGMTAPI_VERSION: string = '2019-10-01-Preview'


export class azIndexerController {

  private taskParameters: IndexOperationTaskParameters;
  private asClient:AzureSearchClient;
  private indexOptions: IndexOptions;

  constructor(taskParameters: IndexOperationTaskParameters) {
    this.taskParameters = taskParameters;
    this.asClient = new AzureSearchClient();

    this.indexOptions = {
      subscriptionId: this.taskParameters.subscriptionId,
      azsearchName: this.taskParameters.azsearchName,
      resourceGroup: this.taskParameters.resourceGroupName,
      indexName: this.taskParameters.indexName,
      payloadPath: this.taskParameters.jsonPayloadLocation == 'filePath' ? this.taskParameters.jsonPayloadPath : null,
      payload: this.taskParameters.inlineJsonPayload
    };
  }

  public createUpdateIndex(): Promise<Index> {
    return new Promise<Index>(async (resolve, reject) => {
      try{
        if(this.indexOptions.payloadPath){
          this.indexOptions.payload = fs.readFileSync(this.indexOptions.payloadPath, 'utf8');
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/datasources/${this.indexOptions.indexName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}, 
          body: this.indexOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let createdDs: Index = result;
            if (err) {
              tl.debug(tl.loc("AzureRESTRequestError", err.message));
              reject(tl.loc("AzureRESTRequestError", err.message));
            } else if (response.statusCode==204) {
              console.log(tl.loc("AzureSearchIndexUpdated", this.indexOptions.azsearchName));
              resolve (createdDs);
            } else if (response.statusCode==201) {
              console.log(tl.loc("AzureSearchIndexCreated", this.indexOptions.azsearchName));
              resolve (createdDs);
            } else {
              tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
              reject(tl.loc("AzureSearchBadRequest", result.error.message));
            }
          });
      } catch(error) { reject(error); }
    });
  }

  public listIndexes(): Promise<Index[]> {
    return new Promise<Index[]>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/datasources?api-version=${AZSEARCH_DATAAPI_VERSION}&$select=name,description,type,credentials,container`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let dsList: Index[] = result.value;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else {
            console.log(tl.loc("AzureSearchIndexesFound", dsList.length));
            resolve (dsList);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public getIndex(): Promise<Index> {
    return new Promise<Index>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/datasources?api-version=${AZSEARCH_DATAAPI_VERSION}&$select=name,description,type,credentials,container`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let curIndex: Index = result.value;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else {
            console.log(tl.loc("AzureSearchIndexesFound", curIndex.fields.length));
            resolve (curIndex);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public deleteIndex(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/indexers/${this.indexOptions.indexName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=204) {
            tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
            reject(tl.loc("AzureSearchBadRequest", result.error.message));
          } else {
            console.log(tl.loc("AzureSearchIndexDeleted"), this.indexOptions.indexName);
            resolve (true);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public listIndexers(): Promise<Index[]> {
    return new Promise<Index[]>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/indexers?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let indexersList: Index[] = result.value;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else {
            console.log(tl.loc("AzureSearchIndexesFound", indexersList.length));
            resolve (indexersList);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public getIndexStatistics(): Promise<IndexStatistics> {
    return new Promise<IndexStatistics>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/indexers/${this.indexOptions.indexName}/status?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
            reject(tl.loc("AzureSearchBadRequest", result.error.message));
          } else {
            let statusResult: IndexStatistics = result as IndexStatistics;
            //TOREVIEW
            console.log(tl.loc("AzureSearchIndexStatistics"));
            resolve (statusResult);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public analyzeText(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.indexOptions.azsearchName}.search.windows.net/indexers/${this.indexOptions.indexName}/run?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=202) {
            tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
            reject(tl.loc("AzureSearchBadRequest", result.error.message));
          } else {
            console.log(tl.loc("AzureSearchIndexerRun"), this.indexOptions.indexName);
            resolve (true);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  // Azure
  public async setupAzure(): Promise<void> {
    return new Promise<void>(async (resolve, reject) => {
      try{
        this.asClient.azureClient = await this.LoginAzure(this.taskParameters.clientId, this.taskParameters.clientSecret, this.taskParameters.tenantId);
        this.asClient.azureSearchAdminKey = await this.GetAzureSearchKey(this.asClient.azureClient, this.taskParameters.subscriptionId, this.taskParameters.resourceGroupName, this.taskParameters.azsearchName);
        resolve();
      } catch(error) { reject(error); }
    });
  }

  private async LoginAzure(clientId: string, secret: string, domain: string): Promise<AzureServiceClient> {
    return new Promise<AzureServiceClient>(async (resolve, reject) => {
      try{
        await msRestAzure.loginWithServicePrincipalSecret(clientId, secret, domain, (err, creds) => {
          if (err) {
            tl.debug(tl.loc("AzureRESTAuthenticationError", err.message));
            reject(tl.loc("AzureRESTAuthenticationError", err.message));
          }
          resolve(new AzureServiceClient(creds, {}));
        });
      } catch(error) { reject(error); }
    });
  }

  private async GetAzureSearchKey(azureClient:AzureServiceClient, subscriptionId: string, resourceGroupName: string, searchServiceName: string): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      try{

        let options: UrlBasedRequestPrepareOptions = {
              method: 'POST',
              url: `https://management.azure.com/subscriptions/${subscriptionId}/resourceGroups/${resourceGroupName}/providers/Microsoft.Search/searchServices/${searchServiceName}/listAdminKeys?api-version=${AZSEARCH_MGMTAPI_VERSION}`,
              serializationMapper: null,
              deserializationMapper: null
          };

          let request = await azureClient.sendRequest(options, (err, result: AdminKeyResult, request, response) => {
            if (err) {
              tl.debug(tl.loc("AzureRESTRequestError", err.message));
              reject(tl.loc("AzureRESTRequestError", err.message));
            } else if (response.statusCode==404) { 
              tl.debug(tl.loc("AzureResourceNotFound", subscriptionId, resourceGroupName, searchServiceName)); 
              reject(tl.loc("AzureResourceNotFound", subscriptionId, resourceGroupName, searchServiceName)); 
            } else if (response.statusCode!=200) {
              tl.debug(tl.loc("AzureRESTRequestError", response.statusMessage));
              reject(tl.loc("AzureRESTRequestError", response.statusMessage));
            } else {
              tl.debug(tl.loc("AzureSearchAdminKeyResult"));
              resolve (result.primaryKey);
            }
        });
      } catch(error) { reject(error); }
    });
  }
}