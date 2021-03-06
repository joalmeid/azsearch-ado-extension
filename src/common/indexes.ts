/**
 * Represents a search index definition, which describes the fields and search behavior of an
 * index.
 */
export class Index {
  private _name: string;
  private _fields: Field[];
  // private _scoringProfiles?: ScoringProfile[];
  private _defaultScoringProfile?: string;
  // private _corsOptions?: CorsOptions;
  // private _suggesters?: Suggester[];
  // private _analyzers?: AnalyzerUnion[];
  // private _tokenizers?: TokenizerUnion[];
  // private _tokenFilters?: TokenFilterUnion[];
  // private _charFilters?: CharFilterUnion[];
  // private _encryptionKey?: EncryptionKey;

  constructor(name: string) {}

  get name(): string {
    return this._name;
  }

  get fields(): Field[] {
    return this._fields;
  }

  get defaultScoringProfile(): string {
    return this._defaultScoringProfile;
  }

  // get scoringProfiles(): ScoringProfile[] {
  //   return this._scoringProfiles;
  // }

  // get corsOptions(): CorsOptions {
  //   return this._corsOptions;
  // }

  // get suggesters(): Suggester[] {
  //   return this._suggesters;
  // }

  // get analyzers(): AnalyzerUnion[] {
  //   return this._analyzers;
  // }
  // get tokenizers(): TokenizerUnion[] {
  //   return this._tokenizers;
  // }
  // get tokenFilters(): TokenFilterUnion[] {
  //   return this._tokenFilters;
  // }
  // get charFilters(): CharFilterUnion[] {
  //   return this._charFilters;
  // }

  // get encryptionKey(): EncryptionKey {
  //   return this._encryptionKey;
  // }
}

export type DataType =
  | 'Edm.String'
  | 'Edm.Int32'
  | 'Edm.Int64'
  | 'Edm.Double'
  | 'Edm.Boolean'
  | 'Edm.DateTimeOffset'
  | 'Edm.GeographyPoint'
  | 'Edm.ComplexType'
  | 'Collection(Edm.String)'
  | 'Collection(Edm.Int32)'
  | 'Collection(Edm.Int64)'
  | 'Collection(Edm.Double)'
  | 'Collection(Edm.Boolean)'
  | 'Collection(Edm.DateTimeOffset)'
  | 'Collection(Edm.GeographyPoint)'
  | 'Collection(Edm.ComplexType)';

/**
 * Represents a field in an index definition, which describes the name, data type, and search
 * behavior of a field.
 */
export interface Field {
  /**
   * The name of the field, which must be unique within the fields collection of the index or
   * parent field.
   */
  name: string;
  /**
   * The data type of the field. Possible values include: 'Edm.String', 'Edm.Int32', 'Edm.Int64',
   * 'Edm.Double', 'Edm.Boolean', 'Edm.DateTimeOffset', 'Edm.GeographyPoint', 'Edm.ComplexType',
   * 'Collection(Edm.String)', 'Collection(Edm.Int32)', 'Collection(Edm.Int64)',
   * 'Collection(Edm.Double)', 'Collection(Edm.Boolean)', 'Collection(Edm.DateTimeOffset)',
   * 'Collection(Edm.GeographyPoint)', 'Collection(Edm.ComplexType)'
   */
  type: DataType;
  /**
   * A value indicating whether the field uniquely identifies documents in the index. Exactly one
   * top-level field in each index must be chosen as the key field and it must be of type
   * Edm.String. Key fields can be used to look up documents directly and update or delete specific
   * documents. Default is false for simple fields and null for complex fields.
   */
  key?: boolean;
  /**
   * A value indicating whether the field can be returned in a search result. You can disable this
   * option if you want to use a field (for example, margin) as a filter, sorting, or scoring
   * mechanism but do not want the field to be visible to the end user. This property must be true
   * for key fields, and it must be null for complex fields. This property can be changed on
   * existing fields. Enabling this property does not cause any increase in index storage
   * requirements. Default is true for simple fields and null for complex fields.
   */
  retrievable?: boolean;
  /**
   * A value indicating whether the field is full-text searchable. This means it will undergo
   * analysis such as word-breaking during indexing. If you set a searchable field to a value like
   * "sunny day", internally it will be split into the individual tokens "sunny" and "day". This
   * enables full-text searches for these terms. Fields of type Edm.String or
   * Collection(Edm.String) are searchable by default. This property must be false for simple
   * fields of other non-string data types, and it must be null for complex fields. Note:
   * searchable fields consume extra space in your index since Azure Cognitive Search will store an
   * additional tokenized version of the field value for full-text searches. If you want to save
   * space in your index and you don't need a field to be included in searches, set searchable to
   * false.
   */
  searchable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $filter queries. filterable
   * differs from searchable in how strings are handled. Fields of type Edm.String or
   * Collection(Edm.String) that are filterable do not undergo word-breaking, so comparisons are
   * for exact matches only. For example, if you set such a field f to "sunny day", $filter=f eq
   * 'sunny' will find no matches, but $filter=f eq 'sunny day' will. This property must be null
   * for complex fields. Default is true for simple fields and null for complex fields.
   */
  filterable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in $orderby expressions. By
   * default Azure Cognitive Search sorts results by score, but in many experiences users will want
   * to sort by fields in the documents. A simple field can be sortable only if it is single-valued
   * (it has a single value in the scope of the parent document). Simple collection fields cannot
   * be sortable, since they are multi-valued. Simple sub-fields of complex collections are also
   * multi-valued, and therefore cannot be sortable. This is true whether it's an immediate parent
   * field, or an ancestor field, that's the complex collection. Complex fields cannot be sortable
   * and the sortable property must be null for such fields. The default for sortable is true for
   * single-valued simple fields, false for multi-valued simple fields, and null for complex
   * fields.
   */
  sortable?: boolean;
  /**
   * A value indicating whether to enable the field to be referenced in facet queries. Typically
   * used in a presentation of search results that includes hit count by category (for example,
   * search for digital cameras and see hits by brand, by megapixels, by price, and so on). This
   * property must be null for complex fields. Fields of type Edm.GeographyPoint or
   * Collection(Edm.GeographyPoint) cannot be facetable. Default is true for all other simple
   * fields.
   */
  facetable?: boolean;
  /**
   * The name of the language analyzer to use for the field. This option can be used only with
   * searchable fields and it can't be set together with either searchAnalyzer or indexAnalyzer.
   * Once the analyzer is chosen, it cannot be changed for the field. Must be null for complex
   * fields. KnownAnalyzerNames is an enum containing known values.
   */
  analyzer?: string;
  /**
   * The name of the analyzer used at search time for the field. This option can be used only with
   * searchable fields. It must be set together with indexAnalyzer and it cannot be set together
   * with the analyzer option. This analyzer can be updated on an existing field. Must be null for
   * complex fields. KnownAnalyzerNames is an enum containing known values.
   */
  searchAnalyzer?: string;
  /**
   * The name of the analyzer used at indexing time for the field. This option can be used only
   * with searchable fields. It must be set together with searchAnalyzer and it cannot be set
   * together with the analyzer option. Once the analyzer is chosen, it cannot be changed for the
   * field. Must be null for complex fields. KnownAnalyzerNames is an enum containing known values.
   */
  indexAnalyzer?: string;
  /**
   * A list of the names of synonym maps to associate with this field. This option can be used only
   * with searchable fields. Currently only one synonym map per field is supported. Assigning a
   * synonym map to a field ensures that query terms targeting that field are expanded at
   * query-time using the rules in the synonym map. This attribute can be changed on existing
   * fields. Must be null or an empty collection for complex fields.
   */
  synonymMaps?: string[];
  /**
   * A list of sub-fields if this is a field of type Edm.ComplexType or
   * Collection(Edm.ComplexType). Must be null or empty for simple fields.
   */
  fields?: Field[];
}

/**
 * Statistics for a given index. Statistics are collected periodically and are not guaranteed to
 * always be up-to-date.
 */
export class IndexStatistics {
  private _documentCount?: number; /* The number of documents in the index. */
  private _storageSize: number; /* The amount of storage in bytes consumed by the index. */

  constructor(name: string) {}

  get documentCount(): number {
    return this._documentCount;
  }

  get storageSize(): number {
    return this._storageSize;
  }
}

export interface TextAnalyzeResult {
  tokens: Token[];
}

export class Token {
  private _token: string; /* token */
  private _startOffset: number; /* index of the first character of the token. */
  private _endOffset: number; /* index of the last character of the token. */
  private _position: number; /* position of the token in the input text. */

  constructor(name: string) {}

  get token(): string {
    return this._token;
  }

  get startOffset(): number {
    return this._startOffset;
  }

  get endOffset(): number {
    return this._endOffset;
  }

  get position(): number {
    return this._position;
  }
}
