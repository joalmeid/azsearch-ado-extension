
import { AzureSearch } from 'azure-search';

// var schema = {
//     name: 'myskillset', // Required for using the POST method
//     description: 'My skillset description', // Optional 
//     skills: [{ // Required array of skills
//       '@odata.type': '#Microsoft.Skills.Text.SentimentSkill',
//       inputs: [{
//         name: 'text',
//         source: '/document/content'
//       }],
//       outputs: [{
//         name: 'score',
//         targetName: 'myScore'
//       }]
//     }]
//   }

export class SkillsetApi {
    constructor(private azSearchClient: AzureSearch) { }

    
    // Create Skillset
    public CreateSkillset(schema: object) {
        return this.azSearchClient.createSkillset(schema);
    }

    // Update Skillset
    public UpdateOrCreateSkillset(schema: object) {
        return this.azSearchClient.updateOrCreateSkillset(schema);
    }
    
    // Delete Skillset
    public DeleteSkillset(schema: object) {
        return this.azSearchClient.deleteSkillset(schema);
    }

    // Get Skillset
    public GetSkillset(schema: object) {
        return this.azSearchClient.getSkillset(schema);
    }

    // List Skillset
    public ListSkillset(schema: object) {
        return this.azSearchClient.listSkillsets(schema);
    }

}