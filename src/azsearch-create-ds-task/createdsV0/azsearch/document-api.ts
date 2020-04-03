// import { Build, BuildArtifact } from "azure-devops-node-api/interfaces/BuildInterfaces";
// import { IBuildApi } from "azure-devops-node-api/BuildApi";
import { AzureSearch } from 'azure-search';

export class DocumentApi {
    constructor(private azSearchClient: AzureSearch) { }

    // Add Documents  , Update or Delete Documents
    public AddDocuments(indexName: string, schema: object) {
        return this.azSearchClient.addDocuments(schema);
    }

    //retrieve a document from an index
    public Lookup(indexName: string, schema: object) {
        return this.azSearchClient.lookup(schema);
    }

    // count the number of documents in the index
    public Count(indexName: string, schema: object) {
        return this.azSearchClient.count(schema);
    }

    // search the index (note that multiple arguments can be passed as an array)
    public Search(indexName: string, schema: object) {
        return this.azSearchClient.search(schema);
    }

    // suggest results based on partial input
    public Suggest(indexName: string, schema: object) {
        return this.azSearchClient.suggest(schema);
    }
}