export interface Document {}

/**
 * Represents a AddUpdateDeleteDocument Document Operation result.
 */
export class DocumentOpResult {
  private _key: string;
  private _status: boolean;
  private _errorMessage: string;
  private _statusCode: number;

  constructor(key: string) {
    this._key = key;
  }

  /**
   * The name of the indexer.
   */
  key(): string {
    return this._key;
  }

  /**
   * The description of the indexer.
   */
  status(): boolean {
    return this._status;
  }

  /**
   * The name of the datasource from which this indexer reads data.
   */
  errorMessage(): string {
    return this._errorMessage;
  }

  statusCode(): number {
    return this._statusCode;
  }
}
