# Azure Cognitive Search Index Operations task

### [Overview](https://docs.microsoft.com/en-us/rest/api/searchservice/index-operations)

You can create and manage indexes in Azure Cognitive Search service via simple HTTP requests (POST, GET, PUT, DELETE) against a given index resource. To create an index, you first POST a JSON document that describes the index schema. The schema defines the fields of the index, their data types, and how they can be used (for example, in full-text searches, filters, sorting, or faceting). It also defines scoring profiles, suggesters, analyzers, and other attributes to configure the behavior of the index.

The following example illustrates an index schema that includes fields, a suggester, a custom analyzer, and a language analyzer. Fields, suggesters, custom analyzers, and scoring profiles (not shown) are sections in the index. A language analyzer is predefined and referenced on the field definition.

Within the field definition, attributes control how the field is used. For example, "key": true marks the field that is used to uniquely identify a document (HotelId in the example below). Other attributes like searchable, filterable, sortable, and facetable can be specified to change default behaviors. For example, they are used on the description field to turn off filtering, sorting and faceting. These features aren't needed for verbose text like a description, and turning them off saves space in the index.

Language-specific fields are also illustrated in this index. Description fields exist for English and for French translations, with the French translation using the fr.microsoft analyzer for lexical analysis.

[Create Index](https://docs.microsoft.com/en-us/rest/api/searchservice/create-index)
[Update INdex](https://docs.microsoft.com/en-us/rest/api/searchservice/update-index)
  PUT https://[servicename].search.windows.net/indexes/[index name]?api-version=[api-version]
[List Indexes](https://docs.microsoft.com/en-us/rest/api/searchservice/list-indexes)
  GET https://[service name].search.windows.net/indexes?api-version=[api-version]  
[Get Index](https://docs.microsoft.com/en-us/rest/api/searchservice/get-index)
  GET https://[service name].search.windows.net/indexes/[index name]?api-version=[api-version] 
[Delete Index](https://docs.microsoft.com/en-us/rest/api/searchservice/delete-index)
  DELETE https://[service name].search.windows.net/indexes/[index name]?api-version=[api-version]  
[Get Index Statistics](https://docs.microsoft.com/en-us/rest/api/searchservice/get-index-statistics)
  GET https://[service name].search.windows.net/indexes/[index name]/stats?api-version=[api-version] 
[Analyze Text](https://docs.microsoft.com/en-us/rest/api/searchservice/test-analyzer)
  POST https://[service name].search.windows.net/indexes/[index name]/analyze?api-version=[api-version]



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

