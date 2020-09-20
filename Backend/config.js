const config = {
  dbUrl:
    process.env.DB_URL ||
    'mongodb+srv://dsanchez:Dsanchez56@diegokenwood-vmax7.mongodb.net/test?retryWrites=true&w=majority',
  port: process.env.PORT || 6666,
  host: process.env.HOST || 'http://localhost',
  publicRoute: process.env.PUBLIC_ROUTE || '/app',
  filesRoute: process.env.FILES_ROUTE,
  tokenCaducidad: process.env.TOKEN_CADUCIDAD || '2h',
  seedJwt: process.env.SEED_JWT || 'ChiperLive43ver',
}

module.exports = config
