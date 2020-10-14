require('dotenv').config()

const config = {
  port: process.env.PORT || 8080,
  host: process.env.HOST || 'http://localhost',
}

module.exports = config
