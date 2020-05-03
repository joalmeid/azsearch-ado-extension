import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';
import * az from '../common';

import { IndexerOperationTaskParameters } from './azure-devops-models';
import { azIndexerController } from './operations';

async function run(): Promise<void> {
  try {
    let taskManifestPath = path.join(__dirname, 'task.json');
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    let dsParameters = new IndexerOperationTaskParameters();
    let taskParameters = await dsParameters.getDatasourceOperationTaskParameters();

    let dsController = new azIndexerController(taskParameters);
    let operationOutput: any;

    // Authenticate on Azure REST Api
    dsController.asClient = az.setupAzure();
    await dsController.setupAzure();

    // Indexer Operation Task
    console.log(
      tl.loc('IndexerOperationLabel', taskParameters.indexerOperation)
    );
    switch (taskParameters.indexerOperation) {
      case 'CreateUpdateDataSource':
        operationOutput = await dsController.createUpdateDataSource();
        break;
      case 'DeleteDataSource':
        operationOutput = await dsController.deleteDataSource();
        break;
      case 'ListDataSources':
        operationOutput = await dsController.listDataSources();
        break;
      case 'CreateUpdateIndexer':
        operationOutput = await dsController.createUpdateIndexer();
        break;
      case 'ListIndexers':
        operationOutput = await dsController.listIndexers();
        break;
      case 'GetIndexerStatus':
        operationOutput = await dsController.getIndexerStatus();
        break;
      case 'ResetIndexer':
        operationOutput = await dsController.resetIndexer();
        break;
      case 'RunIndexer':
        operationOutput = await dsController.runIndexer();
        break;
      case 'DeleteIndexer':
        operationOutput = await dsController.deleteIndexer();
        break;
    }

    // Set output variable
    let operationOutputString: string = operationOutput
      ? JSON.stringify(operationOutput)
      : 'No Output';
    console.log(tl.loc('IndexerOptionOutput', operationOutputString));
    tl.setVariable('IndexerOptionOutput', operationOutputString);

    tl.setResult(tl.TaskResult.Succeeded, '');
  } catch (error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
