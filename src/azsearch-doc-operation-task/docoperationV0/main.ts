import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as az from '../../common';

import { DocumentOperationTaskParameters } from './azure-devops-models';
import { azDocumentController } from './operations';

async function run(): Promise<void> {
  try {
    let taskManifestPath = path.join(__dirname, '../../../task.json');
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    let docParameters = new DocumentOperationTaskParameters();
    let taskParameters = await docParameters.getDocumentOperationTaskParameters();

    let docController = new azDocumentController(taskParameters);
    let operationOutput: any;

    // Authenticate on Azure REST Api
    docController.asClient = await az.setupAzure(
      taskParameters.clientId,
      taskParameters.clientSecret,
      taskParameters.tenantId,
      taskParameters.subscriptionId,
      taskParameters.resourceGroupName,
      taskParameters.azsearchName
    );

    // Document Operation Task
    console.log(
      tl.loc(
        'AzureSearchDocumentOperationExec',
        taskParameters.indexerOperation
      )
    );
    switch (taskParameters.indexerOperation) {
      case 'AddUpdateDeleteDocument':
        operationOutput = await docController.addUpdateDeleteDocument();
        break;
      case 'SearchDocument':
        operationOutput = await docController.searchDocument();
        break;
      case 'CountDocuments':
        operationOutput = await docController.countDocuments();
        break;
    }

    // Set output variable
    let operationOutputString: string = operationOutput
      ? JSON.stringify(operationOutput)
      : 'No Output';
    console.log(tl.loc('DocumentOptionOutput', operationOutputString));
    tl.setVariable('DocumentOptionOutput', operationOutputString);

    tl.setResult(tl.TaskResult.Succeeded, '');
  } catch (error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
