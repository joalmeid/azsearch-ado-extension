import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';

import { SynonymMapOperationTaskParameters } from './azure-devops-models'
import { azSynonymMapController } from './operations'

async function run(): Promise<void> {

  try {
    let taskManifestPath = path.join(__dirname, "task.json");
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    let synmParameters = new SynonymMapOperationTaskParameters();
    let taskParameters = await synmParameters.getSynonymMapOperationTaskParameters();

    let synmController = new azSynonymMapController(taskParameters);
    let operationOutput: any;

    // Authenticate on Azure REST Api
    await synmController.setupAzure();

    // Synonym Map Operation Task
    console.log(tl.loc("AzureSearchOperationExec", taskParameters.synonymMapOperation));
    switch (taskParameters.synonymMapOperation){
      case 'CreateUpdateSynonymMap': 
        operationOutput = await synmController.createUpdateSynonymMap();
        break;
      case 'ListSynonymMap': 
        operationOutput = await synmController.listSynonymMap();
        break;
      case 'GetSynonymMap': 
        operationOutput = await synmController.getSynonymMap();
        break;
      case 'DeleteSynonymMap': 
        operationOutput = await synmController.deleteSynonymMap();
        break;
    } 

    // Set output variable
    let operationOutputString: string = operationOutput ? JSON.stringify(operationOutput) : 'No Output';
    console.log(tl.loc('SynonymMapOptionOutput', operationOutputString));
    tl.setVariable('SynonymMapOptionOutput', operationOutputString);
    
    tl.setResult(tl.TaskResult.Succeeded, "");
  }
  catch(error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
