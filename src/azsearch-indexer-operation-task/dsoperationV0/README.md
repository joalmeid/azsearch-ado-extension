# Azure Cognitive Search Indexer Operations task

### [Overview](https://docs.microsoft.com/en-us/rest/api/searchservice/indexer-operations)

An indexer is a resource that crawls a data source and loads documents into a target search index. Key scenarios for indexers can be described as follows:
Perform a one-time copy of the data to populate an index.
Sync an index with incremental changes from the data source on a recurring schedule. The schedule is part of the indexer definition.
Invoke an indexer on-demand to update an index as needed.
All of the above scenarios are achieved through the Run Indexer (Azure Cognitive Search REST API), which you can run as a standalone operation or scheduled using the built-in scheduler, to load data from supported data sources.

X [Create Data Source](https://docs.microsoft.com/en-us/rest/api/searchservice/create-data-source)
DataSourceName
(azureblob) connectionstring, container
file ou inline

X [Update Data Source](https://docs.microsoft.com/en-us/rest/api/searchservice/update-data-source)
[Get Data Source](https://docs.microsoft.com/en-us/rest/api/searchservice/get-data-source)
[Delete Data Source](https://docs.microsoft.com/en-us/rest/api/searchservice/delete-data-source)
[List Data Sources](https://docs.microsoft.com/en-us/rest/api/searchservice/list-data-sources)

[Create Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/create-indexer)
[Update Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/update-indexer)
[List Indexers](https://docs.microsoft.com/en-us/rest/api/searchservice/list-indexers)
[Get Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/get-indexer)
[Delete Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/delete-indexer)
[Run Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/run-indexer)
[Get Indexer Status](https://docs.microsoft.com/en-us/rest/api/searchservice/get-indexer-status)
[Reset Indexer](https://docs.microsoft.com/en-us/rest/api/searchservice/reset-indexer)

[Create Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/reset-indexer)

## Pre-requisites for the task

The following pre-requisites need to be setup for the task to work properly.

#### Azure Subscription

To deploy to Azure, an Azure subscription has to be linked to Team Foundation Server or to Azure Pipelines using the Services tab in the Account Administration section. Add the Azure subscription to use in the Build or Release Management definition by opening the Account Administration screen (gear icon on the top-right of the screen) and then click on the Services Tab. Create a service endpoint of 'Azure Resource Manager' type. For more troubleshooting guidance around endpoint creation, refer [this](https://www.visualstudio.com/en-us/docs/build/actions/azure-rm-endpoint).

For Azure MSDN accounts, one can either use a [Service Principal](https://go.microsoft.com/fwlink/?LinkID=623000&clcid=0x409) or a work account. It's easy to create a work account as shown below:

1. Create an user in the Azure Active Directory from the [portal](https://msdn.microsoft.com/en-us/library/azure/hh967632.aspx) (this is the old Azure portal). After adding the account, the following two things need to be done to use the organization in Azure Pipelines:
  - Add the Active Directory account to the co-administrators in the subscription. Go to the Settings and then click on administrators and add the account as a co-admin like, [testuser@joehotmail.onmicrosoft.com](mailto:testuser@joehotmail.onmicrosoft.com)
  - Login to the portal with this Active Directory account wiz. [testuser@joehotmail.onmicrosoft.com](mailto:testuser@joehotmail.onmicrosoft.com), and change the password. Initially a temporary password is created and that needs to be changed at the first login.
2. Add that user and password in the service connections in Azure Pipelines and deployments will work with that account.

### Parameters of the task:

The parameters of the task are described below. The parameters listed with a \* are required parameters for the task:

