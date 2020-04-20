import { AzureServiceClient } from 'ms-rest-azure';

export interface IndexerOptions {
  subscriptionId: string,
  resourceGroup: string,
  azsearchName: string,
  datasourceName: string,
  indexerName: string,
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
