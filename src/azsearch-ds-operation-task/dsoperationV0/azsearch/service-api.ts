import { AzureSearch } from 'azure-search';

export class ServiceApi {
    constructor(private azSearchClient: AzureSearch) { }

    // Get Service Statistics
    public GetServiceStatistics() {
        return this.azSearchClient.getServiceStatistics();
    }
}