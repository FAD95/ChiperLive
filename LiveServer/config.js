require('dotenv').config()

const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  tokenCaducidad: process.env.TOKEN_CADUCIDAD || '2h',
  seedJwt: process.env.SEED_JWT || 'ChiperLive43ver',
}

module.exports = config
