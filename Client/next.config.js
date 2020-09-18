require('dotenv').config()

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }
    return config
  },
  env: {
    SERVER: process.env.SERVER,
  },
}
