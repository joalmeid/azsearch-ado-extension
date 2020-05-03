import * as tl from 'azure-pipelines-task-lib/task';
import * as msRestAzure from 'ms-rest-azure';
import { AzureServiceClient } from 'ms-rest-azure';
import { UrlBasedRequestPrepareOptions } from 'ms-rest';
import {
  AZSEARCH_MGMTAPI_VERSION,
  AzureSearchClient,
  AdminKeyResult
} from '../common';

async function LoginAzure(
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

async function GetAzureSearchKey(
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

      await azureClient.sendRequest(
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

export async function setupAzure(
  clientId: string,
  clientSecret: string,
  tenantId: string,
  subscriptionId: string,
  resourceGroupName: string,
  azsearchName: string
): Promise<AzureSearchClient> {
  return new Promise<AzureSearchClient>(async (resolve, reject) => {
    try {
      let azureClient: AzureServiceClient = await LoginAzure(
        clientId,
        clientSecret,
        tenantId
      );

      let azureSearchAdminKey: string = await GetAzureSearchKey(
        azureClient,
        subscriptionId,
        resourceGroupName,
        azsearchName
      );

      let azSearchClient: AzureSearchClient = {
        azureClient: azureClient,
        azureSearchAdminKey: azureSearchAdminKey
      };

      resolve(azSearchClient);
    } catch (error) {
      reject(error);
    }
  });
}
