import * as tl from 'azure-pipelines-task-lib/task';
import * as fs from 'fs';
import { UrlBasedRequestPrepareOptions } from 'ms-rest';
import { SynonymMapOperationTaskParameters } from '../azure-devops-models';
import {
  AZSEARCH_DATAAPI_VERSION,
  AzureSearchClient,
  SynonymMapOptions,
  SynonymMap
} from '../../../common';

export class azSynonymMapController {
  private taskParameters: SynonymMapOperationTaskParameters;
  public asClient: AzureSearchClient;
  private synmOptions: SynonymMapOptions;

  constructor(taskParameters: SynonymMapOperationTaskParameters) {
    this.taskParameters = taskParameters;
    this.asClient = new AzureSearchClient();

    this.synmOptions = {
      subscriptionId: this.taskParameters.subscriptionId,
      azsearchName: this.taskParameters.azsearchName,
      resourceGroup: this.taskParameters.resourceGroupName,
      payloadPath:
        this.taskParameters.jsonPayloadLocation == 'filePath'
          ? this.taskParameters.jsonPayloadPath
          : null,
      payload: this.taskParameters.inlineJsonPayload,
      synonymMapName: this.taskParameters.synonymMapName
    };
  }

  public createUpdateSynonymMap(): Promise<any> {
    return new Promise<any>(async (resolve, reject) => {
      try {
        if (this.synmOptions.payloadPath) {
          this.synmOptions.payload = fs.readFileSync(
            this.synmOptions.payloadPath,
            'utf8'
          );
        }

        let options: UrlBasedRequestPrepareOptions = {
          method: 'PUT',
          url: `https://${this.synmOptions.azsearchName}.search.windows.net/synonymmaps/${this.synmOptions.synonymMapName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
          serializationMapper: null,
          deserializationMapper: null,
          headers: {
            'Content-Type': 'application/json',
            'api-key': `${this.asClient.azureSearchAdminKey}`
          },
          body: this.synmOptions.payload,
          disableJsonStringifyOnBody: true
        };

        let request = await this.asClient.azureClient.sendRequest(
          options,
          (err, result: any, request, response) => {
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode == 201) {
              console.log(
                tl.loc(
                  'AzureSearchSynonymMapCreated',
                  this.synmOptions.synonymMapName
                )
              );
              resolve(result);
            } else if (response.statusCode == 204) {
              console.log(
                tl.loc(
                  'AzureSearchSynonymMapUpdated',
                  this.synmOptions.synonymMapName
                )
              );
              resolve(result);
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

  public listSynonymMap(): Promise<SynonymMap[]> {
    return new Promise<SynonymMap[]>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.synmOptions.azsearchName}.search.windows.net/synonymmaps?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            let synmList: SynonymMap[] = result.value;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else {
              console.log(
                tl.loc('AzureSearchSynonymMapsFound', synmList.length)
              );
              resolve(synmList);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public getSynonymMap(): Promise<SynonymMap> {
    return new Promise<SynonymMap>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'GET',
          url: `https://${this.synmOptions.azsearchName}.search.windows.net/synonymmaps/${this.synmOptions.synonymMapName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
            let curSynmap: SynonymMap = result.value;
            if (err) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else if (response.statusCode != 200) {
              tl.debug(tl.loc('AzureRESTRequestError', err.message));
              reject(tl.loc('AzureRESTRequestError', err.message));
            } else {
              console.log(
                tl.loc(
                  'AzureSearchSynonymMapFound',
                  curSynmap.name,
                  curSynmap.synonyms.length
                )
              );
              resolve(curSynmap);
            }
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  public deleteSynonymMap(): Promise<boolean> {
    return new Promise<boolean>(async (resolve, reject) => {
      try {
        let options: UrlBasedRequestPrepareOptions = {
          method: 'DELETE',
          url: `https://${this.synmOptions.azsearchName}.search.windows.net/synonymmaps/${this.synmOptions.synonymMapName}?api-version=${AZSEARCH_DATAAPI_VERSION}`,
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
              console.log(tl.loc('AzureSearchSynonymMapDeleted'));
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
