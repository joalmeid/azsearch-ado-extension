import { AzureServiceClient } from 'ms-rest-azure';

export const AZSEARCH_DATAAPI_VERSION: string = '2019-05-06'
export const AZSEARCH_MGMTAPI_VERSION: string = '2019-10-01-Preview'

export interface IndexOptions {
  subscriptionId: string,
  resourceGroup: string,
  azsearchName: string,
  payload: string,
  payloadPath:string
  indexName: string,
  allowIndexDowntime: boolean,
}

export interface IndexerOptions {
  subscriptionId: string,
  resourceGroup: string,
  azsearchName: string,
  payload: string,
  payloadPath:string
  datasourceName: string,
  indexerName: string,
}

export class AdminKeyResult {
  public primaryKey: string;
  public secondaryKey: string;
}

export class AzureSearchClient {
  public azureClient: AzureServiceClient;
  public azureSearchAdminKey: string;
}