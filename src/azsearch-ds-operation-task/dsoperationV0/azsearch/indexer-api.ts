import { AzureSearch } from 'azure-search';

// var options = {
// 	name : "blob-datasource",
// 	type : "azureblob",
// 	credentials : { connectionString : "DefaultEndpointsProtocol=https;AccountName=xxx;AccountKey=yyy" },
// 	container : { name : "mycontainer", query : "" }
// }


export class IndexerApi {
    constructor(private azSearchClient: AzureSearch) { }

    // Create DataSource
    public CreateDataSource(options: object) {
        return this.azSearchClient.createDataSource(options);
    }

    // Update DataSource
    public UpdateDataSource(options: object) {
        return this.azSearchClient.updateDataSource(options);
    }

    // List Data Sources
    public ListDataSources() {
        return this.azSearchClient.listDataSources();
    }

    // Get Data Sources
    public GetDataSource(dataSourceName: string) {
        return this.azSearchClient.getDataSource(dataSourceName);
    }

    // Delete Data Sources
    public DeleteDataSource(dataSourceName: string) {
        return this.azSearchClient.deleteDataSource(dataSourceName);
    }


    // var schema = {
    //     name: 'myindexer',
    //     description: 'Anything', //Optional. Anything you want, or null
    //     dataSourceName: 'myDSName', //Required. The name of an existing data source
    //     targetIndexName: 'myIndexName', //Required. The name of an existing index
    //     schedule: { //Optional. All of the parameters below are required.
    //       interval: 'PT15M', //The pattern for this is: "P[nD][T[nH][nM]]". Examples:  PT15M for every 15 minutes, PT2H for every 2 hours.
    //       startTime: '2016-06-01T00:00:00Z' //A UTC datetime when the indexer should start running.
    //     },
    //     parameters: { //Optional. All of the parameters below are optional.
    //       'maxFailedItems' : 10, //Default is 0
    //       'maxFailedItemsPerBatch' : 5, //Default is 0
    //       'base64EncodeKeys': false, //Default is false
    //       'batchSize': 500 //The default depends on the data source type: it is 1000 for Azure SQL and DocumentDB, and 10 for Azure Blob Storage
    //     }};
      



    // Create Indexer
    public CreateIndexer(schema: object) {
        return this.azSearchClient.createIndexer(schema);
    }

    // Update Indexer
    public UpdateIndexer(schema: object) {
        return this.azSearchClient.updateIndexer(schema);
    }

    // List Indexers
    public ListIndexers(indexName: string, schema: object) {
        return this.azSearchClient.listIndexers();
    }

    // Get Indexer
    public GetIndexers() {
        return this.azSearchClient.getIndexers();
    }

    // Delete Indexer
    public DeleteIndexer(indexerName: string) {
        return this.azSearchClient.deleteIndexer(indexerName);
    }

    // Run Indexer
    public RunIndexer(indexerName: string) {
        return this.azSearchClient.runIndexer(indexerName);
    }

    // Get Indexer Status
    public GetIndexerStatus(indexerName: string) {
        return this.azSearchClient.getIndexerStatus(indexerName);
    }

    // Reset Indexer
    public resetIndexer(indexerName: string) {
        return this.azSearchClient.resetIndexer(indexerName);
    }
}