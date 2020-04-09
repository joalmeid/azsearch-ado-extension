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
      case 'createUpdateDataSource': 
        console.log('createUpdateDataSource');
        await dsController.createUpdateDataSource();
        break;
      case 'deleteDataSource': 
        console.log('deleteDataSource');
        await dsController.deleteDataSource();
        break;
      case 'listDataSources': 
        console.log('listDataSources');
        await dsController.listDataSources();
        throw new Error('listDataSources not implemented.');
        break;
      case 'createUpdateIndexer': 
        console.log('createUpdateIndexer');
        await dsController.createUpdateIndexer();
        break;
      case 'listIndexers': 
        console.log('listIndexers');
        await dsController.listIndexers();
        break;
      case 'getIndexerStatus': 
        console.log('getIndexerStatus');
        await dsController.getIndexerStatus();
        break;
      case 'resetIndexer': 
        console.log('resetIndexer');
        await dsController.resetIndexer();
        break;
      case 'runIndexer': 
        console.log('runIndexer');
        await dsController.runIndexer();
        break;
      case 'deleteIndexer': 
        console.log('deleteIndexer');
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
