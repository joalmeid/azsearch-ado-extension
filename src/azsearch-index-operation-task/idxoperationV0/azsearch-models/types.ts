import { AzureServiceClient } from 'ms-rest-azure';

export interface IndexOptions {
  subscriptionId: string,
  resourceGroup: string,
  azsearchName: string,
  indexName: string,
  payload: string,
  payloadPath:string
}

export class AdminKeyResult {
  public primaryKey: string;
  public secondaryKey: string;
}

export class AzureSearchClient {
  public azureClient: AzureServiceClient;
  public azureSearchAdminKey: string;
}
