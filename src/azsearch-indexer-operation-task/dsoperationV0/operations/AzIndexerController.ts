import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
const fsPromises = require('fs').promises; 
// const { promisify } = require("util");
import * as msRestAzure from 'ms-rest-azure';
import { AzureServiceClient } from 'ms-rest-azure';
import { IncomingMessage, UrlBasedRequestPrepareOptions } from 'ms-rest';
import { IndexerOperationTaskParameters } from '../azure-devops-models'
import { AzureSearchClient, AdminKeyResult, IndexerOptions, DataSource, Indexer, IndexerStatus } from '../azsearch-models'

const AZSEARCH_DATAAPI_VERSION: string = '2019-05-06'
const AZSEARCH_MGMTAPI_VERSION: string = '2019-10-01-Preview'


export class azIndexerController {

  private taskParameters: IndexerOperationTaskParameters;
  private asClient:AzureSearchClient;
  private indexerOptions: IndexerOptions;

  constructor(taskParameters: IndexerOperationTaskParameters) {
    this.taskParameters = taskParameters;
    this.asClient = new AzureSearchClient();

    this.indexerOptions = {
      subscriptionId: this.taskParameters.subscriptionId,
      azsearchName: this.taskParameters.azsearchName,
      resourceGroup: this.taskParameters.resourceGroupName,
      datasourceName: this.taskParameters.datasourceName,
      indexerName: this.taskParameters.indexerName,
      payloadPath: this.taskParameters.jsonPayloadLocation == 'filePath' ? this.taskParameters.jsonPayloadPath : null,
      payload: this.taskParameters.inlineJsonPayload
    };
  }

  public createUpdateDataSource(): Promise<DataSource> {
    return new Promise<DataSource>(async (resolve, reject) => {
      try{
        if(this.indexerOptions.payloadPath){
          this.indexerOptions.payload = fs.readFileSync(this.indexerOptions.payloadPath, 'utf8');
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources/${this.indexerOptions.datasourceName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}, 
          body: this.indexerOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let createdDs: DataSource = result;
            if (err) {
              tl.debug(tl.loc("AzureRESTRequestError", err.message));
              reject(tl.loc("AzureRESTRequestError", err.message));
            } else if (response.statusCode==204) {
              tl.debug(tl.loc("AzureSearchDatasourceUpdated", this.indexerOptions.azsearchName));
              resolve (createdDs);
            } else if (response.statusCode==201) {
              tl.debug(tl.loc("AzureSearchDatasourceCreated", this.indexerOptions.azsearchName));
              resolve (createdDs);
            } else {
              tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
              reject(tl.loc("AzureSearchBadRequest", result.error.message));
            }
          });
      } catch(error) { reject(error); }
    });
  }

  public listDataSources(): Promise<DataSource[]> {
    return new Promise<DataSource[]>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources?api-version=${AZSEARCH_DATAAPI_VERSION}&$select=name,description,type,credentials,container`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let dsList: DataSource[] = result.value;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else {
            tl.debug(tl.loc("AzureSearchDatasourcesFound", dsList.length));
            resolve (dsList);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public deleteDataSource(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources/${this.indexerOptions.datasourceName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            tl.debug(tl.loc("AzureSearchDatasourceDeleted"));
            resolve (true);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public createUpdateIndexer(): Promise<Indexer> {
    return new Promise<Indexer>(async (resolve, reject) => {
      try{
        if(this.indexerOptions.payloadPath){
          this.indexerOptions.payload = fs.readFileSync(this.indexerOptions.payloadPath, 'utf8');
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}, 
          body: this.indexerOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let createdIndexer: Indexer = result as Indexer;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode==204) {
            tl.debug(tl.loc("AzureSearchIndexerUpdated", this.indexerOptions.indexerName));
            resolve (createdIndexer);
          } else if (response.statusCode==201) {
            tl.debug(tl.loc("AzureSearchIndexerCreated", this.indexerOptions.indexerName));
            resolve (createdIndexer);
          } else {
            tl.debug(tl.loc("AzureSearchBadRequest", result.error.message));
            reject(tl.loc("AzureSearchBadRequest", result.error.message));
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public listIndexers(): Promise<Indexer[]> {
    return new Promise<Indexer[]>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {'Content-Type': 'application/json', 'api-key': `${this.asClient.azureSearchAdminKey}`}
        };

        let request = await this.asClient.azureClient.sendRequest(options, (err, result: any, request, response) => {
          let indexersList: Indexer[] = result.value;
          if (err) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else if (response.statusCode!=200) {
            tl.debug(tl.loc("AzureRESTRequestError", err.message));
            reject(tl.loc("AzureRESTRequestError", err.message));
          } else {
            tl.debug(tl.loc("AzureSearchIndexersFound", indexersList.length));
            resolve (indexersList);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public getIndexerStatus(): Promise<IndexerStatus> {
    return new Promise<IndexerStatus>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/status?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            let statusResult: IndexerStatus = result as IndexerStatus;
            tl.debug(tl.loc("AzureSearchIndexerStatus"));
            resolve (statusResult);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public resetIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/reset?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            tl.debug(tl.loc("AzureSearchIndexerReset"));
            resolve (true);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public runIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/run?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            tl.debug(tl.loc("AzureSearchIndexerRun"));
            resolve (true);
          }
        });
      } catch(error) { reject(error); }
    });
  }

  public deleteIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try{
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            tl.debug(tl.loc("AzureSearchIndexerDeleted"));
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
              tl.debug(tl.loc("AzureSearchAdminKeyResult", result.primaryKey));
              resolve (result.primaryKey);
            }
        });
      } catch(error) { reject(error); }
    });
  }
}