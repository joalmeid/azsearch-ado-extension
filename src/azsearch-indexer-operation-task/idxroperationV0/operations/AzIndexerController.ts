import * as tl from 'azure-pipelines-task-lib/task';
import * as fs from 'fs';
import { UrlBasedRequestPrepareOptions } from 'ms-rest';
import { IndexerOperationTaskParameters } from '../azure-devops-models';
import {
  AZSEARCH_DATAAPI_VERSION,
  AzureSearchClient,
  IndexerOptions,
  DataSource,
  Indexer,
  IndexerStatus
} from '../../../common';

export class azIndexerController {
  private taskParameters: IndexerOperationTaskParameters;
  public asClient: AzureSearchClient;
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
      payloadPath:
        this.taskParameters.jsonPayloadLocation == 'filePath'
          ? this.taskParameters.jsonPayloadPath
          : null,
      payload: this.taskParameters.inlineJsonPayload
    };
  }

  public createUpdateDataSource(): Promise<DataSource> {
    return new Promise<DataSource>(async (resolve, reject) => {
      try {
        if (this.indexerOptions.payloadPath) {
          this.indexerOptions.payload = fs.readFileSync(
            this.indexerOptions.payloadPath,
            'utf8'
          );
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources/${this.indexerOptions.datasourceName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          },
          body: this.indexerOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            let createdDs: DataSource = result;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode == 204) {
              console.log(
                tl.loc(
                  'AzureSearchDatasourceUpdated',
                  this.indexerOptions.azsearchName
                )
              );
              resolve(createdDs);
            } else if (response.statusCode == 201) {
              console.log(
                tl.loc(
                  'AzureSearchDatasourceCreated',
                  this.indexerOptions.azsearchName
                )
              );
              resolve(createdDs);
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

  public listDataSources(): Promise<DataSource[]> {
    return new Promise<DataSource[]>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources?api-version=${AZSEARCH_DATAAPI_VERSION}&$select=name,description,type,credentials,container`,
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
            let dsList: DataSource[] = result.value;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else {
              console.log(tl.loc('AzureSearchDatasourcesFound', dsList.length));
              resolve(dsList);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteDataSource(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/datasources/${this.indexerOptions.datasourceName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            } else if (response.statusCode != 204) {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            } else {
              console.log(tl.loc('AzureSearchDatasourceDeleted'));
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public createUpdateIndexer(): Promise<Indexer> {
    return new Promise<Indexer>(async (resolve, reject) => {
      try {
        if (this.indexerOptions.payloadPath) {
          this.indexerOptions.payload = fs.readFileSync(
            this.indexerOptions.payloadPath,
            'utf8'
          );
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          },
          body: this.indexerOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            let createdIndexer: Indexer = result as Indexer;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode == 204) {
              console.log(
                tl.loc(
                  'AzureSearchIndexerUpdated',
                  this.indexerOptions.indexerName
                )
              );
              resolve(createdIndexer);
            } else if (response.statusCode == 201) {
              console.log(
                tl.loc(
                  'AzureSearchIndexerCreated',
                  this.indexerOptions.indexerName
                )
              );
              resolve(createdIndexer);
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

  public listIndexers(): Promise<Indexer[]> {
    return new Promise<Indexer[]>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            let indexersList: Indexer[] = result.value;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else {
              console.log(
                tl.loc('AzureSearchIndexersFound', indexersList.length)
              );
              resolve(indexersList);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public getIndexerStatus(): Promise<IndexerStatus> {
    return new Promise<IndexerStatus>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/status?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
              let statusResult: IndexerStatus = result as IndexerStatus;
              //TOREVIEW
              console.log(tl.loc('AzureSearchIndexerStatus'));
              resolve(statusResult);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public resetIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/reset?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            } else if (response.statusCode != 204) {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            } else {
              console.log(
                tl.loc('AzureSearchIndexerReset'),
                this.indexerOptions.indexerName
              );
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public runIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'POST',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}/run?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            } else if (response.statusCode != 202) {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            } else {
              console.log(
                tl.loc('AzureSearchIndexerRun'),
                this.indexerOptions.indexerName
              );
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteIndexer(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.indexerOptions.azsearchName}.search.windows.net/indexers/${this.indexerOptions.indexerName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            } else if (response.statusCode != 204) {
              tl.debug(tl.loc('AzureSearchBadRequest', result.error.message));
              reject(tl.loc('AzureSearchBadRequest', result.error.message));
            } else {
              console.log(
                tl.loc('AzureSearchIndexerDeleted'),
                this.indexerOptions.indexerName
              );
              resolve(true);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }
}
