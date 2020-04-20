/**
 * Represents a datasource definition, which can be used to configure an indexer.
 */
export class DataSource {
  private _name: string;
  private _description: string;
  private _type: DataSourceType;
  private _credentials: DataSourceCredentials;
  private _container: DataContainer;
  private _dataChangeDetectionPolicy: string;
  private _dataDeletionDetectionPolicy: string;

  constructor(name: string) {
  }
  
  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  get type(): DataSourceType {
    return this._type;
  }

  get credentials(): DataSourceCredentials {
    return this._credentials;
  }

  get container(): DataContainer {
    return this._container;
  }
}

/**
 * Defines values for DataSourceType.
 * Possible values include: 'AzureSql', 'CosmosDb', 'AzureBlob', 'AzureTable', 'MySql'
 * @readonly
 * @enum {string}
 */
export type DataSourceType = 'azuresql' | 'cosmosdb' | 'azureblob' | 'azuretable' | 'mysql';

/**
 * Represents credentials that can be used to connect to a datasource.
 */
export interface DataSourceCredentials {
  /**
   * The connection string for the datasource.
   */
  connectionString?: string;
}

/**
 * Represents information about the entity (such as Azure SQL table or CosmosDB collection) that
 * will be indexed.
 */
export interface DataContainer {
  /**
   * The name of the table or view (for Azure SQL data source) or collection (for CosmosDB data
   * source) that will be indexed.
   */
  name: string;
  /**
   * A query that is applied to this data container. The syntax and meaning of this parameter is
   * datasource-specific. Not supported by Azure SQL datasources.
   */
  query?: string;
}
