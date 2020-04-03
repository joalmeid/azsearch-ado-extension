import * as tl from 'azure-pipelines-task-lib/task';
import * as path from 'path';
import * as fs from 'fs';

import { CreateDatasourceTaskParameters } from './azure-devops-models'
import { AzureSearchController } from './operations'

async function run(): Promise<void> {

  try {
    var taskManifestPath = path.join(__dirname, "task.json");
    tl.debug(`Setting resource path to ${taskManifestPath}`);
    tl.setResourcePath(taskManifestPath);

    var dsParameters = new CreateDatasourceTaskParameters();
    var taskParameters = await dsParameters.getCreateDatasourceTaskParameters();

    var dsController = new AzureSearchController(taskParameters);
    await dsController.setupAzure();
    await dsController.createUpdateDataSource();

    tl.setResult(tl.TaskResult.Succeeded, "");
  }
  catch(error) {
    tl.setResult(tl.TaskResult.Failed, error);
  }
}

run();
