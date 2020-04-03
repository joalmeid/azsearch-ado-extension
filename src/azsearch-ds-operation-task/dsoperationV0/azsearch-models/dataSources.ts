import { DataSourceCredentials, DataContainer } from './index';

export class DataSources {
  private _name: string;
  private _description: string;
  private _type: string;
  private _credentials: DataSourceCredentials;
  private _container: DataContainer;
  private _dataChangeDetectionPolicy: string;
  private _dataDeletionDetectionPolicy: string;


  constructor(name: string) {
  }
}

//   createOrUpdate(dataSourceName: string, dataSource: Models.DataSource, options?: Models.DataSourcesCreateOrUpdateOptionalParams): Promise<Models.DataSourcesCreateOrUpdateResponse>;

//   createOrUpdate(dataSourceName: string, dataSource: Models.DataSource, callback: coreHttp.ServiceCallback<Models.DataSource>): void;

//   createOrUpdate(dataSourceName: string, dataSource: Models.DataSource, options: Models.DataSourcesCreateOrUpdateOptionalParams, callback: coreHttp.ServiceCallback<Models.DataSource>): void;
//   createOrUpdate(dataSourceName: string, dataSource: Models.DataSource, options?: Models.DataSourcesCreateOrUpdateOptionalParams | coreHttp.ServiceCallback<Models.DataSource>, callback?: coreHttp.ServiceCallback<Models.DataSource>): Promise<Models.DataSourcesCreateOrUpdateResponse> {
//     return this.client.sendOperationRequest(
//       {
//         dataSourceName,
//         dataSource,
//         options
//       },
//       createOrUpdateOperationSpec,
//       callback) as Promise<Models.DataSourcesCreateOrUpdateResponse>;
//   }

//   deleteMethod(dataSourceName: string, options?: Models.DataSourcesDeleteMethodOptionalParams): Promise<coreHttp.RestResponse>;
//   deleteMethod(dataSourceName: string, callback: coreHttp.ServiceCallback<void>): void;
//   deleteMethod(dataSourceName: string, options: Models.DataSourcesDeleteMethodOptionalParams, callback: coreHttp.ServiceCallback<void>): void;
//   deleteMethod(dataSourceName: string, options?: Models.DataSourcesDeleteMethodOptionalParams | coreHttp.ServiceCallback<void>, callback?: coreHttp.ServiceCallback<void>): Promise<coreHttp.RestResponse> {
//     return this.client.sendOperationRequest(
//       {
//         dataSourceName,
//         options
//       },
//       deleteMethodOperationSpec,
//       callback);
//   }

//   get(dataSourceName: string, options?: coreHttp.RequestOptionsBase): Promise<Models.DataSourcesGetResponse>;
//   get(dataSourceName: string, callback: coreHttp.ServiceCallback<Models.DataSource>): void;
//   get(dataSourceName: string, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.DataSource>): void;
//   get(dataSourceName: string, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.DataSource>, callback?: coreHttp.ServiceCallback<Models.DataSource>): Promise<Models.DataSourcesGetResponse> {
//     return this.client.sendOperationRequest(
//       {
//         dataSourceName,
//         options
//       },
//       getOperationSpec,
//       callback) as Promise<Models.DataSourcesGetResponse>;
//   }

//   list(options?: Models.DataSourcesListOptionalParams): Promise<Models.DataSourcesListResponse>;
//   list(callback: coreHttp.ServiceCallback<Models.ListDataSourcesResult>): void;
//   list(options: Models.DataSourcesListOptionalParams, callback: coreHttp.ServiceCallback<Models.ListDataSourcesResult>): void;
//   list(options?: Models.DataSourcesListOptionalParams | coreHttp.ServiceCallback<Models.ListDataSourcesResult>, callback?: coreHttp.ServiceCallback<Models.ListDataSourcesResult>): Promise<Models.DataSourcesListResponse> {
//     return this.client.sendOperationRequest(
//       {
//         options
//       },
//       listOperationSpec,
//       callback) as Promise<Models.DataSourcesListResponse>;
//   }

//   create(dataSource: Models.DataSource, options?: coreHttp.RequestOptionsBase): Promise<Models.DataSourcesCreateResponse>;
//   create(dataSource: Models.DataSource, callback: coreHttp.ServiceCallback<Models.DataSource>): void;
//   create(dataSource: Models.DataSource, options: coreHttp.RequestOptionsBase, callback: coreHttp.ServiceCallback<Models.DataSource>): void;
//   create(dataSource: Models.DataSource, options?: coreHttp.RequestOptionsBase | coreHttp.ServiceCallback<Models.DataSource>, callback?: coreHttp.ServiceCallback<Models.DataSource>): Promise<Models.DataSourcesCreateResponse> {
//     return this.client.sendOperationRequest(
//       {
//         dataSource,
//         options
//       },
//       createOperationSpec,
//       callback) as Promise<Models.DataSourcesCreateResponse>;
//   }
// }

// // Operation Specifications
// const serializer = new coreHttp.Serializer(Mappers);
// const createOrUpdateOperationSpec: coreHttp.OperationSpec = {
//   httpMethod: "PUT",
//   path: "datasources('{dataSourceName}')",
//   urlParameters: [
//     Parameters.endpoint,
//     Parameters.dataSourceName
//   ],
//   queryParameters: [
//     Parameters.apiVersion
//   ],
//   headerParameters: [
//     Parameters.prefer,
//     Parameters.ifMatch,
//     Parameters.ifNoneMatch
//   ],
//   requestBody: {
//     parameterPath: "dataSource",
//     mapper: {
//       ...Mappers.DataSource,
//       required: true
//     }
//   },
//   responses: {
//     200: {
//       bodyMapper: Mappers.DataSource
//     },
//     201: {
//       bodyMapper: Mappers.DataSource
//     },
//     default: {
//       bodyMapper: Mappers.SearchError
//     }
//   },
//   serializer
// };

// const deleteMethodOperationSpec: coreHttp.OperationSpec = {
//   httpMethod: "DELETE",
//   path: "datasources('{dataSourceName}')",
//   urlParameters: [
//     Parameters.endpoint,
//     Parameters.dataSourceName
//   ],
//   queryParameters: [
//     Parameters.apiVersion
//   ],
//   headerParameters: [
//     Parameters.ifMatch,
//     Parameters.ifNoneMatch
//   ],
//   responses: {
//     204: {},
//     404: {},
//     default: {
//       bodyMapper: Mappers.SearchError
//     }
//   },
//   serializer
// };

// const getOperationSpec: coreHttp.OperationSpec = {
//   httpMethod: "GET",
//   path: "datasources('{dataSourceName}')",
//   urlParameters: [
//     Parameters.endpoint,
//     Parameters.dataSourceName
//   ],
//   queryParameters: [
//     Parameters.apiVersion
//   ],
//   responses: {
//     200: {
//       bodyMapper: Mappers.DataSource
//     },
//     default: {
//       bodyMapper: Mappers.SearchError
//     }
//   },
//   serializer
// };

// const listOperationSpec: coreHttp.OperationSpec = {
//   httpMethod: "GET",
//   path: "datasources",
//   urlParameters: [
//     Parameters.endpoint
//   ],
//   queryParameters: [
//     Parameters.select,
//     Parameters.apiVersion
//   ],
//   responses: {
//     200: {
//       bodyMapper: Mappers.ListDataSourcesResult
//     },
//     default: {
//       bodyMapper: Mappers.SearchError
//     }
//   },
//   serializer
// };

// const createOperationSpec: coreHttp.OperationSpec = {
//   httpMethod: "POST",
//   path: "datasources",
//   urlParameters: [
//     Parameters.endpoint
//   ],
//   queryParameters: [
//     Parameters.apiVersion
//   ],
//   requestBody: {
//     parameterPath: "dataSource",
//     mapper: {
//       ...Mappers.DataSource,
//       required: true
//     }
//   },
//   responses: {
//     201: {
//       bodyMapper: Mappers.DataSource
//     },
//     default: {
//       bodyMapper: Mappers.SearchError
//     }
//   },
//   serializer
// };
