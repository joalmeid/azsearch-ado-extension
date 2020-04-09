import tl = require("azure-pipelines-task-lib/task");

export class IndexerOperationTaskParameters {

    // Authentication details
    public connectedServiceName: string;
    public scheme: string;
    public subscriptionId: string; 
    public tenantId: string;
    public clientId?: string;
    public clientSecret?: string;

    public serviceConnectionScope: string;
    public resourceGroupName: string;

    // azSearch Datasournce details
    public azsearchName: string;
    public datasourceName: string;
    public indexerName: string;
    public indexName: string;
    public indexerOperation: string;
    public jsonPayloadLocation: string;
    public jsonPayloadPath?: string;
    public inlineJsonPayload?: string;

    public async getDatasourceOperationTaskParameters() : Promise<IndexerOperationTaskParameters> {
      this.connectedServiceName = tl.getInput('ConnectedServiceName', true);
      if(this.connectedServiceName==='debug'){ // local debug
        this.subscriptionId = tl.getInput('SubscriptionId', true);
        this.tenantId = tl.getInput('tenantid', true);
        this.clientId = tl.getInput('serviceprincipalid', true);
        this.clientSecret = tl.getInput('serviceprincipalkey', true);
        this.scheme = tl.getInput('scheme', true);
      } else {
        this.subscriptionId = tl.getEndpointDataParameter(this.connectedServiceName, 'SubscriptionId', true);
        this.tenantId = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'tenantid', true);
        this.clientId = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'serviceprincipalid', true);
        this.clientSecret = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'serviceprincipalkey', true);
        this.scheme = tl.getEndpointAuthorizationScheme(this.connectedServiceName, false);
      }

      this.resourceGroupName = tl.getInput('resourceGroupName', false);
      this.datasourceName = tl.getInput('DatasourceName', false);
      this.indexerName = tl.getInput('IndexerName', false);
      this.azsearchName = tl.getInput('AzureSearchName', true);
      this.jsonPayloadLocation = tl.getInput('JsonPayloadLocation', true);
      this.jsonPayloadPath = tl.getInput('JsonPayloadPath', false);
      this.inlineJsonPayload = tl.getInput('InlineJsonPayload', false);
      this.indexerOperation = tl.getInput('IndexerOperation', false);
  
      //Print input variables values
      tl.debug(tl.loc("ParsedTaskInputsLabel"));
      tl.debug(tl.loc("InputsconnectedServiceNameLabel", this.connectedServiceName));
      tl.debug(tl.loc("InputsSubscriptionIdLabel", this.subscriptionId));
      tl.debug(tl.loc("InputTenantIdLabel", this.tenantId));
      tl.debug(tl.loc("InputClientIdLabel", this.clientId));
      tl.debug(tl.loc("InputClientSecretLabel", this.clientSecret));
      tl.debug(tl.loc("InputSchemeLabel", this.scheme));
      tl.debug(tl.loc("InputServiceConnectionScopeLabel", this.serviceConnectionScope));
      tl.debug(tl.loc("InputDatasourceNameLabel", this.datasourceName));
      tl.debug(tl.loc("InputIndexerNameLabel", this.indexerName));
      tl.debug(tl.loc("InputJsonPayloadLocationLabel", this.datasourceName));
      tl.debug(tl.loc("InputJsonPayloadPathLabel", this.datasourceName));
      tl.debug(tl.loc("InputInlineJsonPayloadLabel", this.datasourceName));
      tl.debug(tl.loc("InputIndexerOperationLabel", this.datasourceName));
      
      return this;
    }
}

