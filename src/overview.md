# Azure Search Extension

This extension allows you to include Azure Search operations within your DevOps practices - specifically, in your CICD pipelines. Currently the extension includes all main operations around the main Azure Search concepts like **Data Source**, **Index** and **Indexer**.
It doesn't matter if you're more experienced with Azure Pipelines with the **YAML pipelines** or **Classic Editor**.

![Azure Search Extension Tasks](https://user-images.githubusercontent.com/4800035/78353255-ab290c80-75a1-11ea-9472-e6161ea278c3.png)

### Highlights ###
> :boom: This extension is ***cross platform***. You can run it from **Windows**, **Linux** or **macOS** self-hosted agents.
> :muscle: This extension allows you to include Azure Search operations in your DevOps practices. It covers operations on **Data Sources**, **Indexes** and **Indexers**.
> :rocket: Allows you to include data prep and ingest it into your solution environments


The Azure Search Extension include the following contributions:

1. Data Source Operations Task

![Data Source Operations Task](https://user-images.githubusercontent.com/4800035/78352157-d3b00700-759f-11ea-86c8-5b8884362141.png)

2. Index Operations Task

![Index Operations Task](https://user-images.githubusercontent.com/4800035/78352156-d3177080-759f-11ea-83d9-5df548b4487d.png)

2. Indexer Operations Task

![Indexer Operations Task](https://user-images.githubusercontent.com/4800035/78352156-d3177080-759f-11ea-83d9-5df548b4487d.png)


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

### Data Source Operations ###

```yaml
# Data Source Operations Task
# Execute datasource operation in your pipeline
- task: DataSourceOperations@0
  inputs:
    #ConnectedServiceName: The Azure subscription where the Azure Search resource is provisioned. # Required. 
    #ResourceGroupName: The Resource Group name. # Required. 
    #DatasourceName: Datasource name. # Required.
```
