# Azure Cognitive Search Indexer Operations task

### [Overview](https://docs.microsoft.com/en-us/rest/api/searchservice/indexer-operations)

In Azure Cognitive Search, an index is stored in the cloud and populated using JSON documents that you upload to the service. All the documents that you upload comprise the corpus of your search data. Documents contain fields, some of which are tokenized into search terms as they are uploaded. The /docs URL segment in the Azure Cognitive Search API represents the collection of documents in an index. All operations performed on the collection such as uploading, merging, deleting, or querying documents take place in the context of a single index, so the URLs for these operations will always start with /indexes/[index name]/docs for a given index name.

> Skillset Operations:
> [Create Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/create-skillset)
> [Delete Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/delete-skillset)
> [Get Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/get-skillset)
> [List Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/list-skillset)
> [Update Skillset](https://docs.microsoft.com/en-us/rest/api/searchservice/update-skillset)

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

