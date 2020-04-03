import { AzureSearch } from 'azure-search';

// var schema = {
//     name: 'mysynonmap',
//     // only the 'solr' format is supported for now
//     format: 'solr',
//     synonyms: 'a=>b\nb=>c',
//   }
  
export class SynonymsApi {
    constructor(private azSearchClient: AzureSearch) { }
    
    // Create Synonym Map
    public CreateSynonymMap(schema: object) {
        return this.azSearchClient.createSynonymMap(schema);
    }

    // Update Synonym Map
    public UpdateOrCreateSynonymMap(synonymName: string, schema: object) {
        return this.azSearchClient.updateOrCreateSynonymMap(schema);
    }

    // List Synonym Maps
    public ListSynonymMaps() {
        return this.azSearchClient.listSynonymMaps();
    }

    // Get Synonym Map
    public getSynonymMap(synonymName: string) {
        return this.azSearchClient.GetSynonymMap(synonymName);
    }

    // Delete Synonym Map
    public DeleteSynonymMap(synonymName: string) {
        return this.azSearchClient.deleteSynonymMap(schema);
    }

}