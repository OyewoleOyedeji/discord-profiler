/**
 * Helper function set to simply implement `discord-oauth2`
*/

const DiscordOAuth = require('discord-oauth2')
const _oauth = new DiscordOAuth()

/**
 * 
 * @param {String} code 
 * @param {String} redirectUri 
 * @param {String} clientSecret 
 * @param {String} clientID 
 * @returns 
 * 
 * Authenticate using the provided code,
 * and environment secrets
 */
exports.authenticate = async (code, redirectUri, clientSecret, clientID) => {
  const response = await _oauth.tokenRequest({
    clientId: clientID,
    clientSecret: clientSecret,

    code: code,
    grantType: 'authorization_code',

    redirectUri: redirectUri
  })
  return response
}

/**
 * 
 * @param {String} accessToken 
 * @returns 
 * 
 * Get basic user information from access token
 */
exports.getUser = async (accessToken) => {
  const response = await _oauth.getUser(accessToken)
  return response
}

/**
 * 
 * @param {String} accessToken 
 * @returns 
 * 
 * Get user guilds information from access token
 */
exports.getGuilds = async (accessToken) => {
  const response = await _oauth.getUserGuilds(accessToken)
  return response
}

/**
 * 
 * @param {String} accessToken 
 * @returns 
 * 
 * Get user connections from access token
 */
exports.getConnections = async (accessToken) => {
  const response = await _oauth.getUserConnections(accessToken)
  return response
}

/**
 * 
 * @param {String} accessToken 
 * @param {String} clientID 
 * @param {String} clientSecret 
 * @returns 
 * 
 * Revoke current access token gotten from discord
 */
exports.revokeAccess = async (accessToken, clientID, clientSecret) => {
  /**
   * Generate the credentials needed for revoking the access token
   */
  const credentials = Buffer.from(`${clientID}:${clientSecret}`).toString("base64");  
  const response = await _oauth.revokeToken(accessToken, credentials)
  return response
}