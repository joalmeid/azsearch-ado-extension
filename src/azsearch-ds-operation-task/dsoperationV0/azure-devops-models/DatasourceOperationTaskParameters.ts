import tl = require("azure-pipelines-task-lib/task");

export class DatasourceOperationTaskParameters {

    // Authentication details
    public connectedServiceName: string;
    public scheme: string;
    public subscriptionId: string; 
    public tenantId: string;
    public clientId?: string;
    public clientSecret?: string;

    // Service connection scope (Management Group or Subscription)
    public serviceConnectionScope: string;
    public resourceGroupName: string;

    // azSearch Datasournce details
    public azsearchName: string;
    public datasourceName: string;

    public async getDatasourceOperationTaskParameters() : Promise<DatasourceOperationTaskParameters> {
      this.connectedServiceName = tl.getInput('ConnectedServiceName', true);
      if(this.connectedServiceName==='debug'){ // local debug
        this.subscriptionId = tl.getInput('SubscriptionId', true);
        this.tenantId = tl.getInput('tenantid', true);
        this.clientId = tl.getInput('serviceprincipalid', true);
        this.clientSecret = tl.getInput('serviceprincipalkey', true);
        this.scheme = tl.getInput('scheme', true);
        this.serviceConnectionScope = tl.getInput('scopeLevel', true);
      } else {
        this.subscriptionId = tl.getEndpointDataParameter(this.connectedServiceName, 'SubscriptionId', true);
        this.tenantId = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'tenantid', true);
        this.clientId = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'serviceprincipalid', true);
        this.clientSecret = tl.getEndpointAuthorizationParameter(this.connectedServiceName, 'serviceprincipalkey', true);
        this.scheme = tl.getEndpointAuthorizationScheme(this.connectedServiceName, false);
        this.serviceConnectionScope = tl.getEndpointDataParameter(this.connectedServiceName, 'scopeLevel', true);
      }

      this.datasourceName = tl.getInput('DatasourceName', true);
      this.azsearchName = tl.getInput('AzureSearchName', true);

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
      
      return this;
    }
}

