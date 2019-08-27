const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  client_id: '1041590858311-m20k80j8364bsta2gbiohhdqjc6hj7u5.apps.googleusercontent.com',
  client_secret: process.env.CLIENT_SECRET,
  redirect_uris: [
    'http://localhost:3000/oauth2callback'
  ]
}
