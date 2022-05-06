/**
 * Module dependencies
 */
const helpers = require('./oauth')
const jwt = require('jsonwebtoken')
const path = require('path')
const _ = require('lodash')

/**
 * Load environment variables from configuration folder
 */
process.env.NODE_CONFIG_DIR = path.resolve('../', 'config')
const config = require('config')

/**
 * 
 * @param {String} accessToken 
 * @param {String} clientID 
 * @param {String} clientSecret 
 * @returns
 * 
 * Get everything possible about a user from Discord's server
 */
exports.profiler = async (accessToken, clientID, clientSecret) => {
    // Initial profiler state
    let profileBlob = []

    try {
        /**
         * Call `./oauth.js` for `discord-oauth2` implementation
         */
        const userInformation = await helpers.getUser(accessToken)
        const userGuilds = await helpers.getGuilds(accessToken)
        const userConnections = await helpers.getConnections(accessToken)
        const accessRevoked = await helpers.revokeAccess(accessToken, clientID, clientSecret)

        const message = "Access Token has been revoked successfully"

        // Update the `profileBlob` object
        profileBlob.push({ userInformation: userInformation }, { userGuilds: userGuilds }, { userConnections: userConnections }, message)

        /**
         * Turn the `profileBlob` object into a JWT token,
         * then hash the JWT token with the `secretKey` environment variable
         */
        jwt.sign({ profileBlob }, config.get('secretKey'), { expiresIn: "1h" }, (error, token) => {
            if (error) {
                /**
                 * TODO:
                 * 1. Add a service logger to detect possible errors
                 */
                console.log(error)
            } else {
                /**
                 * TODO:
                 * 1. Pass JWT token into frontend through resource headers/cookies
                 * 2. Compress the headers which will be passed into the frontend
                 */
                console.log(token)
            }
        })
    } catch (error) {
        /**
         * TODO:
         * 1. Add a service logger to detect possible errors
         */
        console.error(error);
    }

    return profileBlob
}