require('dotenv').config()

const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  tokenCaducidad: process.env.TOKEN_CADUCIDAD || '2h',
  seedJwt: process.env.SEED_JWT || 'ChiperLive43ver',
  azureSubscriptionId:
    process.env.AZURE_SUBSCRIPTION_ID || 0000 - 0000 - 0000 - 0000,
  azureResourceGroupName: process.env.AZURE_RESOURCE_GROUP_NAME || 'default',
  azureAccountName: process.env.AZURE_ACCOUNT_NAME || 'default',
  azureClientId: process.env.AZURE_CLIENT_ID || 'default',
  azureClientSecret: process.env.AZURE_CLIENT_SECRET || 'default',
  azureStorageAccountName: process.env.AZURE_STORAGE_ACCOUNT_NAME || 'default',
}

module.exports = config
