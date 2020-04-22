# Azure Cognitive Search Synonym Operations task

### [Overview](https://docs.microsoft.com/en-us/rest/api/searchservice/synonym-map-operations)

In Azure Cognitive Search, developers can define custom rules to expand or rewrite a search query with equivalent terms. For example, in your application, the words "whirlpool", "jacuzzi" and "hot tub" may be equivalent and you want to have a rule that automatically expands the search when only one is searched for. The resource that contains the rules is called a synonym map. Synonym maps are service level resources and maintained independently from search indexes. Once a synonym map is uploaded, you can point any searchable field to the synonym map (one per field).

> Synonym Operations:
> [Create Synonym Map](https://docs.microsoft.com/en-us/rest/api/searchservice/create-synonym-map)
>   [synonymmap name]
> [Update Synonym Map](https://docs.microsoft.com/en-us/rest/api/searchservice/update-synonym-map)
>   [synonymmap name]
> [List Synonym Maps](https://docs.microsoft.com/en-us/rest/api/searchservice/list-synonym-maps)
> [Get Synonym Map](https://docs.microsoft.com/en-us/rest/api/searchservice/get-synonym-map)
>   [synonymmap name]
> [Delete Synonym Map](https://docs.microsoft.com/en-us/rest/api/searchservice/delete-synonym-map)
>   [synonymmap name]

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

