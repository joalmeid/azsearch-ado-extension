import tl = require('azure-pipelines-task-lib/task');
import * as path from 'path';
import { TaskOptions } from './configuration';
import { PipelineTrigger } from './createdatasource';

async function Run() {
    try {
        tl.setResourcePath(path.join(__dirname, 'task.json'));

        const curTask: CreateDataSource = new CreateDataSource(new TaskOptions());
        await curTask.start();
        tl.debug(`END OF DEBUG`);
    } catch (err) {
        const errorMessage = JSON.stringify(err);
        tl.setResult(tl.TaskResult.Failed, `Error: ${err.message} Details: ${errorMessage}`);
    }
}

Run();
