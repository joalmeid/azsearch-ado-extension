import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as az from '../../common';

import { IndexOperationTaskParameters } from './azure-devops-models';
import { azIndexerController } from './operations';

async function run(): Promise<void> {
  try {
    let taskManifestPath = path.join(__dirname, '../../../task.json');
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    let ixParameters = new IndexOperationTaskParameters();
    let taskParameters = await ixParameters.getDatasourceOperationTaskParameters();

    let ixController = new azIndexerController(taskParameters);
    let operationOutput: any;

    // Authenticate on Azure REST Api
    ixController.asClient = await az.setupAzure(
      taskParameters.clientId,
      taskParameters.clientSecret,
      taskParameters.tenantId,
      taskParameters.subscriptionId,
      taskParameters.resourceGroupName,
      taskParameters.azsearchName
    );

    // Indexer Operation Task
    console.log(tl.loc('IndexOperationLabel', taskParameters.indexOperation));
    switch (taskParameters.indexOperation) {
      case 'CreateUpdateIndex':
        operationOutput = await ixController.createUpdateIndex();
        break;
      case 'ListIndexes':
        operationOutput = await ixController.listIndexes();
        break;
      case 'GetIndex':
        operationOutput = await ixController.getIndex();
        break;
      case 'DeleteIndex':
        operationOutput = await ixController.deleteIndex();
        break;
      case 'GetIndexStatistics':
        operationOutput = await ixController.getIndexStatistics();
        break;
      case 'AnalyzeText':
        operationOutput = await ixController.analyzeText();
        break;
    }

    // Set output variable
    let operationOutputString: string = operationOutput
      ? JSON.stringify(operationOutput)
      : 'No Output';
    console.log(tl.loc('IndexOptionOutput', operationOutputString));
    tl.setVariable('IndexOptionOutput', operationOutputString);

    tl.setResult(tl.TaskResult.Succeeded, '');
  } catch (error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
