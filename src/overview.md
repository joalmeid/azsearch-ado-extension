![Azure Cognitive Search Extension Banner](https://user-images.githubusercontent.com/4800035/78379034-b3953d80-75c9-11ea-940d-3b64ac3d4c60.png "Azure Cognitive Search Extension Banner")
# Azure Cognitive Search Extension for Azure Pipelines

This extension allows you to include [**Azure Cognitive Search**](https://docs.microsoft.com/en-us/azure/search/) operations within your DevOps practices - specifically, in your CICD pipelines. Currently the extension includes all main operations around the main Azure Search concepts like **Data Source**, **Index** and **Indexer**.
It doesn't matter if you're more experienced with Azure Pipelines with the **YAML pipelines** or **Classic Editor**.

![Azure Search Extension Tasks](https://user-images.githubusercontent.com/4800035/80922841-8928d280-8d77-11ea-844a-743f206f76f8.png)


### Highlights ###
> This extension is ***cross platform***. You can run it from **Windows**, **Linux** or **macOS** self-hosted agents.
>
> This extension allows you to include Azure Search operations in your DevOps practices. It covers operations on **Data Sources**, **Indexes** and **Indexers**.
>
> Allows you to include data prep and ingest it into your solution environments


The Azure Search Extension include the following contributions:

**1. Indexer Operations Task**

![Indexer Operations Task](https://user-images.githubusercontent.com/4800035/80950487-de9fc680-8ded-11ea-9378-4f11525ebf33.png)

**2. Index Operations Task**
![Index Operations Task](https://user-images.githubusercontent.com/4800035/80923145-947cfd80-8d79-11ea-9755-4c579932bd3a.png)

**3. Synonym Map Operations Task**

![Synonym Map Operations Task](https://user-images.githubusercontent.com/4800035/80923147-95ae2a80-8d79-11ea-8363-25319b243209.png)

**4. Skillset Operations Task**

![Skillset Operations Task](https://user-images.githubusercontent.com/4800035/80923146-95ae2a80-8d79-11ea-8611-ae7e354034bb.png)

**5. Document Operations Task**

![Document Operations Task](https://user-images.githubusercontent.com/4800035/80923148-95ae2a80-8d79-11ea-98cb-ffa3bb047a30.png)


### Prerequisites ###
- You must have an active Azure subscription. Create a new subscription at https://azure.com.
- You must also have an active Azure DevOps account and an organization. Create a new account at https://dev.azure.com.
- Install this extension to your organization. To do this, you must be an admin of the organization. 
  - Once installed, you may have to have your admin make the extension available to you or your project.
- You must have at least one [Azure Search](https://docs.microsoft.com/en-us/azure/search/) resource.
  
### Quick steps to get started ###

To use the Azure Search extension, let's start by:
- Create a Datasource in your Azure Search resource;
- Create an Index in your Azure Search resource;
- Create an Indexer in your Azure Search resource;

### Azure Search Extension Tasks ###

#### Indexer Operations Task ####

```yaml
# Indexer Operations Task
# Create or Update a datasource in your pipeline
- task: AzureSearchIndexerOperation@1
  displayName: 'Indexer Operation: CreateUpdateDataSource'
  inputs:
    azureSubscription: $(azureServiceConnection)
    ResourceGroupName: 'dev-myProj-rg'
    AzureCognitiveSearch: 'dev-proj-as'
    JsonPayloadLocation: inlineJson
    InlineJsonPayload: |
      {
        "description": "Sample Tx Data",
        "type": "azureblob",
        "credentials": { "connectionString": "$(StorageConnectionString)" },
        "container": { "name": "txdata" }
      }
    DatasourceName: 'tx-ds'
```
