[![Build Status](https://dev.azure.com/joalmeid/azsearch-ado-extension/_apis/build/status/azsearch-ado-extension-CICD?branchName=master)](https://dev.azure.com/joalmeid/azsearch-ado-extension/_build/latest?definitionId=165&branchName=master)

![Azure Cognitive Search Extension Banner](https://user-images.githubusercontent.com/4800035/78379034-b3953d80-75c9-11ea-940d-3b64ac3d4c60.png "Azure Cognitive Search Extension Banner")
# Azure Cognitive Search Extension for Azure Pipelines

This extension allows you to include [**Azure Cognitive Search**](https://docs.microsoft.com/en-us/azure/search/) operations within your DevOps practices - specifically, in your CICD pipelines. Currently the extension includes all main operations around the main Azure Search concepts like **Data Source**, **Index** and **Indexer**.
It doesn't matter if you're more experienced with Azure Pipelines with the **YAML pipelines** or **Classic Editor**.

![Azure Search Extension Tasks](https://todo-image.uri/image.png)

### Highlights ###
> :boom: This extension is ***cross platform***. You can run it from **Windows**, **Linux** or **macOS** self-hosted agents.
>
> :muscle: This extension allows you to include Azure Search operations in your DevOps practices. It covers operations on **Data Sources**, **Indexes** and **Indexers**.
>
> :rocket: Allows you to include data prep and ingest it into your solution environments

The Azure Search Extension include the following contributions:

1. Data Source Operations Task

![Data Source Operations Task](https://todo-image.uri/image.png)

2. Index Operations Task

![Index Operations Task](https://todo-image.uri/image.png)

2. Indexer Operations Task

![Indexer Operations Task](https://todo-image.uri/image.png)

## Release status

This task extension is publicly available for [free](https://marketplace.visualstudio.com/items?itemName=joalmeid.azsearch-ado-extension). You may add this extension to your DevOps organization directly from the Visual Studio Marketplace.

## Prerequisites

- Node (>= 11.14 )
- NPM (>= 6.10)
- typescript compiler (`npm i -g typescript`)

## Local Development

- Run `npm install`
- Run `npm run build`.
- Leverage VSCode launch settings and test locally. A reference launch configuration follows:
  
  ```json
   "configurations": [
      {
        "type": "node",
          "request": "launch",
          "name": "Launch Task",
          "program": "${workspaceFolder}/create-ds-task/createdsV1/main.js",
          "cwd": "${workspaceRoot}/create-ds-task/createdsV1",
          "runtimeExecutable": null,
          "runtimeArgs": [ "--nolazy" ],
          "env": {
            "INPUT_connectedServiceName":"debug",
            "INPUT_subscriptionId":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "INPUT_tenantId":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "INPUT_serviceprincipalid":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "INPUT_serviceprincipalkey":"xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
            "INPUT_scheme":"ServicePrincipal",
            "INPUT_scopeLevel":"Subsciption",
            "INPUT_resourceGroupName":"XXXX-rg",
            "INPUT_DatasourceName":"YYYY",
            "INPUT_AzureSearchName":"ZZZZ",
          },
          "sourceMaps": true,
          "outFiles": [],
          "stopOnEntry": false
      },
    ]
  ```

## Tests

### All platforms:

Run `npm run test`

### Debug Traces

If you wish to enable detailed traces, also set `TASK_TEST_TRACE=1` before running test.

On Windows (Powershell), you can do this using `$env:TASK_TEST_TRACE=1`.

### Testing in your own DevOps Organization

Sometimes unit testing alone isn't sufficient and you may want to test your changes in a real Azure DevOps organization. To do so, however, you will need to change some values in the manifest files so that you can run `npm run package` to create a VSIX package that you can install privately into your own organization. Follow these steps:

#### Prerequisites for Development/Contribution

- Signup for [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/).
- Once you have created a new organization, you will need a Visual Studio Marketplace publisher account to install the extension into your newly-created organization. Click [here](https://marketplace.visualstudio.com/manage/createpublisher) to create a new publisher account.
- Now that you have created your publisher account, you are now ready to make necessary changes to the manifest files to create a private package that you can publish using your new publisher account to your own organization.
- To manage your new publisher account, you can visit `https://marketplace.visualstudio.com/manage/publishers/{your_publisher_account_name}`.

#### Updating the manifest files

- In the `vss-extension.json` file, modify the value of the `name` property to something unique.
  - Tip: Maybe give it a suffix or a prefix that clearly identifies it as your private build.
- **IMPORTANT:** Change the value of the following properties:
  - Set `galleryFlags` to `Private` instead of `Public`.
  - Set `publisher` to `**your**` publisher account name.
- Change the task `id` property to a unique value. This is done in the `task.json` file You can get a new, unique value from https://www.guidgen.com.
- Change the value of the `name` property to something unique in this file as well.
  - This is the name you will see in the Azure Pipelines build when you add it as a task.
- **IMPORTANT:** Change the value of the `author` property to be `**your**` publisher account name.

#### Generate a private package

- From the root of the project directory, run `npm run package`. This will bump the version number and produce a new package with the `.vsix` file extension.
- Go to your publisher account page, `https://marketplace.visualstudio.com/manage/publishers/{your_publisher_account_name}` (be sure to replace `{your_publisher_account_name}` with the actual value), and click on **New Extension** > **Azure DevOps** and drag/drop the VSIX file you generated in the previous step.
- Follow the on-screen instructions (if any). Now you are ready to share the private build with your organization.

#### Share the private build with your organization

- Once the package upload is complete, you can click on the options icon (the `...` button) and click on **Share/Unshare**.
- Click on **+ Organization** to add your newly-created DevOps organization.

#### Installing the private build

- Finally, you can now head over to your organization and install the extension that has been shared with it.
- Go to the root of your organization, `https://dev.azure.com`, and click on the **Organization Settings** button in the bottom-left corner.
- Then click on **Extensions** and then click on the **Shared** tab. You should see your private extension.
- Click on the install button and follow the instructions to complete installing it.

Once installed, return to your organization and create a new Azure Pipelines build and you should now see the newly installed private build of the task extension.

#### Uploading new versions of the private build

- To continue testing your private build of the task extension, you can simply run `npm run package` in the root of this project, and then upload a new build to your publisher account.
- Once uploaded, any Azure Pipelines build agents using it will automatically pick up the new version in a few minutes.

#### Completing your testing

- Once your testing is complete, you must revert the changes you made to the `vss-extension.json` and `task.json` as part of generating your private build. However, any other changes you made to those files, that is relevant to any Pull Request you decide to submit can remain intact.

## Package

> Learn more [here](https://docs.microsoft.com/en-us/azure/devops/extend/develop/add-build-task?view=azure-devops#step-4-package-your-extension).

- Ensure you have `tfx` cli installed by running `tfx version`. If it is not installed, then run `npm i -g tfx-cli`.
- Run `npm run package` from the root directory.