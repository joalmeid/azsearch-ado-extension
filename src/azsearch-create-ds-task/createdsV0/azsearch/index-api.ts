import { AzureSearch } from 'azure-search';

export class IndexApi {
    constructor(private azSearchClient: AzureSearch) { }

    // Create Index
    public CreateIndex(indexName: string, schema: object) {
        return this.azSearchClient.createIndex(schema);
    }
    // Update Index
    public UpdateIndex(indexName: string, schema: object) {
        return this.azSearchClient.getIndexStats();
    }
    // List Indexes
    public ListIndexes() {
        return this.azSearchClient.listIndexes();
    }

    // Get Index
    public GetIndex(indexName: string) {
        return this.azSearchClient.getIndex();
    }

    // Delete Index
    public DeleteIndex(indexName: string) {
        return this.azSearchClient.deleteIndex();
    }

    // Get Index Statistics
    public GetIndexStatistics(indexName: string, project: string) {
        return this.azSearchClient.getIndexStats();
    }

    // Analyze TextindexName
    public AnalyzeText(indexName: string, query: object) {
        return this.azSearchClient.testAnalyzer();
    }
}