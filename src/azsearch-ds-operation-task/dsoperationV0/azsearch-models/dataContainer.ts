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
