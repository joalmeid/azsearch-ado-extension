# Azure Cognitive Search Indexer Operations task

### [Overview](https://docs.microsoft.com/en-us/rest/api/searchservice/indexer-operations)

In Azure Cognitive Search, an index is stored in the cloud and populated using JSON documents that you upload to the service. All the documents that you upload comprise the corpus of your search data. Documents contain fields, some of which are tokenized into search terms as they are uploaded. The /docs URL segment in the Azure Cognitive Search API represents the collection of documents in an index. All operations performed on the collection such as uploading, merging, deleting, or querying documents take place in the context of a single index, so the URLs for these operations will always start with /indexes/[index name]/docs for a given index name.

> Document Operations:
> [Add, Update or Delete Documents (Azure Cognitive Search REST API)](https://docs.microsoft.com/en-us/rest/api/searchservice/addupdate-or-delete-documents)
> Once you have created an index, you can start adding, updating or removing documents that match the configured schema into the index. This step populates the index that you previously defined on the service.
> [Search Documents (Azure Cognitive Search REST API)](https://docs.microsoft.com/en-us/rest/api/searchservice/search-documents)
> You can use either Lucene query syntax or a simple syntax to formulate full-text search queries in your application code. You can also use an OData syntax in a $filter to get scoped search.
> [Count Documents (Azure Cognitive Search REST API)](https://docs.microsoft.com/en-us/rest/api/searchservice/count-documents)

Note implemented:
> [Suggestions (Azure Cognitive Search REST API)](https://docs.microsoft.com/en-us/rest/api/searchservice/suggestions)
> Suggestions are type-ahead, autocomplete queries that are displayed as the user enters a search term. For example, while typing "mountain bikes", a list of potential queries that include "mountain bikes" drop-down below the search box. Suggestions are a document operation because potential queries are built from the fields in your documents.
> [Lookup Document (Azure Cognitive Search REST API)](https://docs.microsoft.com/en-us/rest/api/searchservice/lookup-document)
> You can retrieve a document by its ID, which can be useful when you know exactly which document should be returned in the search results list.

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

