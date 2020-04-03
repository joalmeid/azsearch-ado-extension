import tl = require('azure-pipelines-task-lib/task');
import { WebApi, getPersonalAccessTokenHandler } from 'azure-devops-node-api/WebApi';
import { BuildApi } from './document-api';
import { ReleaseApi } from './index-api';
import { BuildApi } from './indexer-api';
import { BuildApi } from './indexer-api';
import { ReleaseApi } from './azsearch/index-api';
export * from './synonyms-api';

export class AzureSearchApi {

    /**
    * Create AzureSearchApi Api
    * @param azSearchEndpointUri Azure DevOps Api uri
    * @param authKey authorization key
    */
    constructor(
        private azSearchEndpointUri: string,
        private authKey: string
    ) { }

    public async getBuildApi(): Promise<BuildApi> {
        let connection = this.createConnection(this.adoApiUri, this.accessToken);
        return new BuildApi(await connection.getBuildApi());
    }

    public async getReleaseApi(): Promise<ReleaseApi> {
        let connection = this.createConnection(this.adoApiUri, this.accessToken);
        return new ReleaseApi(await connection.getReleaseApi());
    }

    private createConnection(adoApiUri: string, accessToken: string): WebApi {
        let creds = getPersonalAccessTokenHandler(accessToken);
        let connection = new WebApi(adoApiUri, creds);

        tl.debug(`\tConnecting to Azure DevOps REST endpoint: ${adoApiUri}`);

        return connection;
    }

}


