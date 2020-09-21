require('dotenv').config()

const config = {
  dbUrl: process.env.DB_URL,
  port: process.env.PORT || 5000,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE,
  tokenCaducidad: process.env.TOKEN_CADUCIDAD || '2h',
  seedJwt: process.env.SEED_JWT || 'top-secret',
}

module.exports = config
