const express = require('express')
const router = express.Router()
const path = require('path')

/**
 * Load the environment configuration file
 */
process.env.NODE_CONFIG_DIR = path.resolve('../', 'config')

/**
 * Module dependencies
 */
const helpers = require('../controllers/oauth')
const extras = require('../controllers/extras')
const config = require('config')

/**
 * Module environment variables
 */
const clientID = config.get('discord.clientID')
const clientSecret = config.get('discord.clientSecret')
const _redirectUri = config.get('discord.redirectUri')

// Current Nodejs environment
const env = process.env.NODE_ENV

let accessToken

/**
 * This should be accessible when your authenticate on 
 * the Discord OAuth2 page ...
 */

/* GET /api/callback */
router.get('/callback', (req, res) => {

  // Create the base URI for this route
  let baseUri
  if (env === 'dev') {
    baseUri = `http://${req.hostname}:${config.get('port')}/api`
  } else {
    baseUri = `http://${req.hostname}/api`
  }

  /**
   * Concetenate and form the redirect URI
   */
  let redirectUri
  if (env === 'dev') {
    redirectUri = `${baseUri}${_redirectUri}`
  } else {
    redirectUri = `${baseUri}${_redirectUri}`
  }

  /**
   * This calls 2 functions
   * 1. The `../helpers/oauth.js` `authenticate` which handles the code exchange
   * 2. The `../helpers/extras.js` `profiler` which grabs allowed user profile
   *    information ...
   */
  helpers.authenticate(req.query.code, redirectUri, clientSecret, clientID).then((data) => {
    accessToken = data.access_token
    /**
     * TODO: 
     * Work on the frontend to redirect with JWT Token through headers/cookies
     */
    extras.profiler(accessToken, clientID, clientSecret).then(() => { res.send(`Generated the JWT Token on ${Date()}`) })
  }).catch((err) => {
    if (env === 'dev') {
      res.status(400).json({
        trace: err.response,
      })
    } else {
      res.status(400).json({
        description: "Sorry an error occurred"
      })
    }
  })
})

/**
 * The routes below are only accesible during development
 */

/* Get /api/user */
router.get('/user', (req, res) => {
  if (env === "dev") {
    helpers.getUser(accessToken).then((data) => res.json(data)).catch((err) => {
      res.status(401).json({
        trace: err.response,
        description: "Can't find the access token"
      })
    })
  } else {
    res.status(401).send(res.statusMessage)
  }
})

/* Get /api/guilds */
router.get('/guilds', (req, res) => {
  if (env === "dev") {
    helpers.getGuilds(accessToken).then((data) => res.json(data)).catch((err) => {
      res.status(401).json({
        trace: err.response,
        description: "Can't find the access token"
      })
    })
  } else {
    res.status(401).send(res.statusMessage)
  }
})

/* Get /api/connnections */
router.get('/connections', (req, res) => {
  if (env === "dev") {
    helpers.getConnections(accessToken).then((data) => res.json(data)).catch((err) => {
      res.status(401).json({
        trace: err.response,
        description: "Can't find the access token"
      })
    })
  } else {
    res.status(401).send(res.statusMessage)
  }
})

/* Get /api/revoke */
router.get('/revoke', (req, res) => {
  if (env === "dev") {
    helpers.revokeAccess(accessToken, clientID, clientSecret).then((data) => res.json(data)).catch((err) => {
      res.status(401).json({
        trace: err.response,
        description: "Can't find the access token"
      })
    })
  } else {
    res.status(401).send(res.statusMessage)
  }
})

module.exports = router
