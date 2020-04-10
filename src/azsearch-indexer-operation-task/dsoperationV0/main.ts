import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';

import { IndexerOperationTaskParameters } from './azure-devops-models'
import { azIndexerController } from './operations'

async function run(): Promise<void> {

  try {
    var taskManifestPath = path.join(__dirname, "task.json");
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    var dsParameters = new IndexerOperationTaskParameters();
    var taskParameters = await dsParameters.getDatasourceOperationTaskParameters();

    var dsController = new azIndexerController(taskParameters);
    
    // Authenticate on Azure REST Api
    await dsController.setupAzure();

    // Indexer Operation Task
    switch (taskParameters.indexerOperation){
      case 'CreateUpdateDataSource': 
        await dsController.createUpdateDataSource();
        break;
      case 'DeleteDataSource': 
        await dsController.deleteDataSource();
        break;
      case 'ListDataSources': 
        await dsController.listDataSources();
        break;
      case 'CreateUpdateIndexer': 
        await dsController.createUpdateIndexer();
        break;
      case 'ListIndexers': 
        await dsController.listIndexers();
        break;
      case 'GetIndexerStatus': 
        await dsController.getIndexerStatus();
        break;
      case 'ResetIndexer': 
        await dsController.resetIndexer();
        break;
      case 'RunIndexer': 
        await dsController.runIndexer();
        break;
      case 'DeleteIndexer':
        await dsController.deleteIndexer();
        break;
    } 

    tl.setResult(tl.TaskResult.Succeeded, "");
  }
  catch(error) {
    console.log(`FINAL ERROR: ${error}`);
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
