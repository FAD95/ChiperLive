require('dotenv').config()

const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE,
  tokenCaducidad: process.env.TOKEN_CADUCIDAD || '2h',
  seedJwt: process.env.SEED_JWT || 'top-secret',
  azureTenantId: process.env.AZURE_TENANT_ID,
  azureSubscriptionId:
    process.env.AZURE_SUBSCRIPTION_ID || 0000 - 0000 - 0000 - 0000,
  azureResourceGroupName: process.env.AZURE_RESOURCE_GROUP_NAME || 'default',
  azureAccountName: process.env.AZURE_ACCOUNT_NAME || 'default',
  azureClientId: process.env.AZURE_CLIENT_ID || 'default',
  azureClientSecret: process.env.AZURE_CLIENT_SECRET || 'default',
  azureStorageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME || 'default',
  azureRegion: process.env.AZURE_REGION || '',
  azureStreamingPolicyName : process.env.AZURE_STREAMING_POLICY_NAME || 'default',
  azureApiVersion: process.env.AZURE_API_VERSION || '2018-07-01'
}

module.exports = config
