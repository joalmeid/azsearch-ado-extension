// /**
//  * Represents a datasource definition, which can be used to configure an indexer.
//  */
export interface DataSource {}
//   /**
//    * The name of the datasource.
//    */
//   name: string;
//   /**
//    * The description of the datasource.
//    */
//   description?: string;
//   /**
//    * The type of the datasource. Possible values include: 'AzureSql', 'CosmosDb', 'AzureBlob',
//    * 'AzureTable', 'MySql'
//    */
//   type: DataSourceType;
//   /**
//    * Credentials for the datasource.
//    */
//   credentials: DataSourceCredentials;
//   /**
//    * The data container for the datasource.
//    */
//   container: DataContainer;
//   /**
//    * The data change detection policy for the datasource.
//    */
//   dataChangeDetectionPolicy?: DataChangeDetectionPolicyUnion;
//   /**
//    * The data deletion detection policy for the datasource.
//    */
//   dataDeletionDetectionPolicy?: DataDeletionDetectionPolicyUnion;
//   /**
//    * The ETag of the DataSource.
//    */
//   etag?: string;
// }

// /**
//  * Response from a List Datasources request. If successful, it includes the full definitions of all
//  * datasources.
//  */
// export interface ListDataSourcesResult {
//   /**
//    * The datasources in the Search service.
//    * **NOTE: This property will not be serialized. It can only be populated by the server.**
//    */
//   readonly dataSources: DataSource[];
// }