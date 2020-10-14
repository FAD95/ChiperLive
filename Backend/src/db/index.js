const db = require('mongoose')

db.Promise = global.Promise

async function connect(url) {
  try {
    await db.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'chiperlive',
    })
    console.log('[db] Conectada con exito')
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  connect,
}
