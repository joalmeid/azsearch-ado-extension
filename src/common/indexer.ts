import { DataSourceType } from '.';

/**
 * Represents an indexer.
 */
export class Indexer {
  private _name: string;
  private _description?: string;
  private _dataSourceName: DataSourceType;
  private _skillsetName?: string;
  private _targetIndexName: string;
  private _schedule?: IndexingSchedule;
  private _parameters?: IndexingParameters;
  private _fieldMappings?: FieldMapping[];
  private _outputFieldMappings?: FieldMapping[];
  private _isDisabled?: boolean;

  constructor(name: string) {}

  /**
   * The name of the indexer.
   */
  name(): string {
    return this._name;
  }

  /**
   * The description of the indexer.
   */
  description(): string {
    return this._description;
  }

  /**
   * The name of the datasource from which this indexer reads data.
   */
  dataSourceName(): string {
    return this._dataSourceName;
  }

  /**
   * The name of the skillset executing with this indexer.
   */
  skillsetName(): string {
    return this._skillsetName;
  }

  /**
   * The name of the index to which this indexer writes data.
   */
  targetIndexName(): string {
    return this._targetIndexName;
  }

  /**
   * The schedule for this indexer.
   */
  schedule(): IndexingSchedule {
    return this._schedule;
  }

  /**
   * Parameters for indexer execution.
   */
  parameters(): IndexingParameters {
    return this._parameters;
  }

  /**
   * Defines mappings between fields in the data source and corresponding target fields in the
   * index.
   */
  fieldMappings(): FieldMapping[] {
    return this._fieldMappings;
  }

  /**
   * Output field mappings are applied after enrichment and immediately before indexing.
   */
  outputFieldMappings(): FieldMapping[] {
    return this._outputFieldMappings;
  }

  /**
   * A value indicating whether the indexer is disabled. Default is false. Default value(): false.
   */
  isDisabled(): boolean {
    return this._isDisabled;
  }
}

/**
 * Represents a schedule for indexer execution.
 */
export interface IndexingSchedule {
  /**
   * The interval of time between indexer executions.
   */
  interval: string;
  /**
   * The time when an indexer should start running.
   */
  startTime?: Date;
}

/**
 * Represents parameters for indexer execution.
 */
export interface IndexingParameters {
  /**
   * The number of items that are read from the data source and indexed as a single batch in order
   * to improve performance. The default depends on the data source type.
   */
  batchSize?: number;
  /**
   * The maximum number of items that can fail indexing for indexer execution to still be
   * considered successful. -1 means no limit. Default is 0. Default value: 0.
   */
  maxFailedItems?: number;
  /**
   * The maximum number of items in a single batch that can fail indexing for the batch to still be
   * considered successful. -1 means no limit. Default is 0. Default value: 0.
   */
  maxFailedItemsPerBatch?: number;
  /**
   * A dictionary of indexer-specific configuration properties. Each name is the name of a specific
   * property. Each value must be of a primitive type.
   */
  configuration?: { [propertyName: string]: any };
}

/**
 * Represents a function that transforms a value from a data source before indexing.
 */
export interface FieldMappingFunction {
  /**
   * The name of the field mapping function.
   */
  name: string;
  /**
   * A dictionary of parameter name/value pairs to pass to the function. Each value must be of a
   * primitive type.
   */
  parameters?: { [propertyName: string]: any };
}

/**
 * Defines a mapping between a field in a data source and a target field in an index.
 */
export interface FieldMapping {
  /**
   * The name of the field in the data source.
   */
  sourceFieldName: string;
  /**
   * The name of the target field in the index. Same as the source field name by default.
   */
  targetFieldName?: string;
  /**
   * A function to apply to each source field value before indexing.
   */
  mappingFunction?: FieldMappingFunction;
}

/**
 * Represents the current status and execution history of an indexer.
 */
export interface IndexerExecutionInfo {
  /**
   * Overall indexer status. Possible values include: 'unknown', 'error', 'running'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly status: IndexerStatus;
  /**
   * The result of the most recent or an in-progress indexer execution.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly lastResult?: IndexerExecutionResult;
  /**
   * History of the recent indexer executions, sorted in reverse chronological order.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly executionHistory: IndexerExecutionResult[];
  /**
   * The execution limits for the indexer.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly limits: IndexerLimits;
}

/**
 * Defines values for IndexerStatus.
 * Possible values include: 'unknown', 'error', 'running'
 * @readonly
 * @enum {string}
 */
export type IndexerStatus = 'unknown' | 'error' | 'running';

/**
 * Defines values for IndexerExecutionStatus.
 * Possible values include: 'transientFailure', 'success', 'inProgress', 'reset'
 * @readonly
 * @enum {string}
 */
export type IndexerExecutionStatus =
  | 'transientFailure'
  | 'success'
  | 'inProgress'
  | 'reset';

/**
 * Represents the result of an individual indexer execution.
 */
export interface IndexerExecutionResult {
  /**
   * The outcome of this indexer execution. Possible values include: 'transientFailure', 'success',
   * 'inProgress', 'reset'
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly status: IndexerExecutionStatus;
  /**
   * The error message indicating the top-level error, if any.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly errorMessage?: string;
  /**
   * The start time of this indexer execution.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly startTime?: Date;
  /**
   * The end time of this indexer execution, if the execution has already completed.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly endTime?: Date;
  /**
   * The item-level indexing errors.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly errors: ItemError[];
  /**
   * The item-level indexing warnings.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly warnings: ItemWarning[];
  /**
   * The number of items that were processed during this indexer execution. This includes both
   * successfully processed items and items where indexing was attempted but failed.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly itemCount: number;
  /**
   * The number of items that failed to be indexed during this indexer execution.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly failedItemCount: number;
  /**
   * Change tracking state with which an indexer execution started.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly initialTrackingState?: string;
  /**
   * Change tracking state with which an indexer execution finished.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly finalTrackingState?: string;
}

/**
 * An interface representing IndexerLimits.
 */
export interface IndexerLimits {
  /**
   * The maximum duration that the indexer is permitted to run for one execution.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly maxRunTime?: string;
  /**
   * The maximum size of a document, in bytes, which will be considered valid for indexing.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly maxDocumentExtractionSize?: number;
  /**
   * The maximum number of characters that will be extracted from a document picked up for
   * indexing.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly maxDocumentContentCharactersToExtract?: number;
}

/**
 * Represents an item- or document-level indexing error.
 */
export interface ItemError {
  /**
   * The key of the item for which indexing failed.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly key?: string;
  /**
   * The message describing the error that occurred while processing the item.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly errorMessage: string;
  /**
   * The status code indicating why the indexing operation failed. Possible values include: 400 for
   * a malformed input document, 404 for document not found, 409 for a version conflict, 422 when
   * the index is temporarily unavailable, or 503 for when the service is too busy.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly statusCode: number;
  /**
   * The name of the source at which the error originated. For example, this could refer to a
   * particular skill in the attached skillset. This may not be always available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Additional, verbose details about the error to assist in debugging the indexer. This may not
   * be always available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly details?: string;
  /**
   * A link to a troubleshooting guide for these classes of errors. This may not be always
   * available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly documentationLink?: string;
}

/**
 * Represents an item-level warning.
 */
export interface ItemWarning {
  /**
   * The key of the item which generated a warning.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly key?: string;
  /**
   * The message describing the warning that occurred while processing the item.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly message: string;
  /**
   * The name of the source at which the warning originated. For example, this could refer to a
   * particular skill in the attached skillset. This may not be always available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly name?: string;
  /**
   * Additional, verbose details about the warning to assist in debugging the indexer. This may not
   * be always available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly details?: string;
  /**
   * A link to a troubleshooting guide for these classes of warnings. This may not be always
   * available.
   * **NOTE: This property will not be serialized. It can only be populated by the server.**
   */
  readonly documentationLink?: string;
}
