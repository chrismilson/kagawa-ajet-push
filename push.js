const { OAuth2Client } = require('google-auth-library')
const http = require('http')
const url = require('url')
const open = require('open')
const destroyer = require('server-destroy')
const axios = require('axios')

// Download your OAuth2 configuration from the Google
const keys = require('./oauth2.keys')
const { Custom } = require('./Notification')

/**
 * Start by acquiring a pre-authenticated oAuth2 client.
 */
async function main () {
  var notification = await Custom()

  notification.confirm()
    .then(async json => {
      if (!json) return

      const oAuth2Client = await getAuthenticatedClient()
      axios.post('https://kagawa-ajet.herokuapp.com/push/notify', {
      // axios.post('http://localhost:5000/push/notify', {
        serverMessage: 'Posting new Notification',
        auth: oAuth2Client.credentials.id_token,
        payload: JSON.stringify(json)
      })
        .then(res => console.log(res.data.message))
        .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
}

/**
 * Create a new OAuth2Client, and go through the OAuth2 content
 * workflow.  Return the full client to the callback.
 */
function getAuthenticatedClient () {
  return new Promise((resolve, reject) => {
    // create an oAuth client to authorize the API call.  Secrets are kept in a `keys.json` file,
    // which should be downloaded from the Google Developers Console.
    const oAuth2Client = new OAuth2Client(
      keys.client_id,
      keys.client_secret,
      keys.redirect_uris[0]
    )

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: 'https://www.googleapis.com/auth/userinfo.profile'
    })

    // Open an http server to accept the oauth callback. In this simple example, the
    // only request to our webserver is to /oauth2callback?code=<code>
    const server = http
      .createServer(async (req, res) => {
        try {
          if (req.url.indexOf('/oauth2callback') > -1) {
            // acquire the code from the querystring, and close the web server.
            const qs = new url.URL(req.url, 'http://localhost:3000')
              .searchParams
            const code = qs.get('code')
            res.end('Authentication successful! Please return to the console.')
            server.destroy()

            // Now that we have the code, use that to acquire tokens.
            const r = await oAuth2Client.getToken(code)
            // Make sure to set the credentials on the OAuth2 client.
            oAuth2Client.setCredentials(r.tokens)
            resolve(oAuth2Client)
          }
        } catch (e) {
          reject(e)
        }
      })
      .listen(3000, () => {
        // open the browser to the authorize url to start the workflow
        open(authorizeUrl, { wait: false }).then(cp => cp.unref())
      })
    destroyer(server)
  })
}

main().catch(console.error)
