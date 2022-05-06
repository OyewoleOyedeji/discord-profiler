const express = require('express')
const router = express.Router()

// Current Nodejs environment
const env = process.env.NODE_ENV

/* GET / */
router.get('/', (req, res) => {
  if (env === "dev") {
    // Returns base API information
    res.json({
      message: 'Dev API Server',
      description: 'Welcome to the API server the available routes are listed below ...',
      date: Date(),
      routes: [
        {
          '/api': {
            '/callback': 'Discord OAuth2 redirect handler',
            '/user': 'Demo to get basic user information',
            '/guilds': 'Demo to get user guilds information',
            '/connections': 'Demo to get user social connections',
            '/revoke': 'Demo to revoke use of current access token'
          }
        }
      ]
    })
  } else {
    res.status(401).send(res.statusMessage)
  }
})

module.exports = router
