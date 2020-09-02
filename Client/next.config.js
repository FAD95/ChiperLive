require('dotenv').config()

module.exports = {
  webpack: (config) => {
    config.node = {
      fs: 'empty',
    }
    return config
  },
  env: {
    AWS_REGION: process.env.AWS_REGION,
    AWS_ACEESS_KEY_ID: process.env.AWS_ACEESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  },
}
