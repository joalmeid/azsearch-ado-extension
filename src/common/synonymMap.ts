export interface SynonymMap {
  encryptionKey?: EncryptionKey;
  etag?: string; /* The ETag of the synonym map. */
  name: string; /* The name of the synonym map. */
  synonyms: string[]; /* An array of synonym rules in the specified synonym map format. */
}

export interface EncryptionKey {
  keyVaultKeyName: string; /* Name of the Azure Key Vault key used for encryption */
  keyVaultKeyVersion: string; /* Version of the Azure Key Vault key */
  keyVaultUri: string; /* URI of Azure Key Vault, also referred to as DNS name, that provides the key. An example URI might be https://my-keyvault-name.vault.azure.net */
  accessCredentials?: AzureActiveDirectoryApplicationCredentials; /* Optional Azure Active Directory credentials used for accessing your Azure Key Vault. Not required if using managed identity instead. */
}

export interface AzureActiveDirectoryApplicationCredentials {
  applicationId: string; /* AAD Application ID that was granted access permissions to your specified Azure Key Vault */
  applicationSecret?: string; /* Authentication key of the specified AAD application */
}