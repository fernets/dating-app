const jwt = require('jsonwebtoken')
const config = require('config')
const Token = require('../models/Token')
const TokensBlackList = require('../models/TokensBlackList')

class TokenService {
  // return: accessToken, refreshToken, expiresIn
  generate(payload) {
    const accessToken = jwt.sign(payload, config.get('accessSecret'), {
      expiresIn: '1h'
    })

    const refreshToken = jwt.sign(payload, config.get('refreshSecret'))

    return {
      accessToken,
      refreshToken,
      expiresIn: 3600
    }
  }

  async save(userId, refreshToken) {
    try {
      const data = await Token.findOne({ userId })

      if (data) {
        data.refreshToken = refreshToken
        return await data.save()
      }

      const token = await Token.create({ userId, refreshToken })
      return token
    } catch (error) {
      throw new Error(error.message)
    }
  }

  validateRefreshToken(refreshToken) {
    try {
      return jwt.verify(refreshToken, config.get('refreshSecret'))
    } catch (error) {
      return null
    }
  }

  validateAccessToken(accessToken) {
    try {
      return jwt.verify(accessToken, config.get('accessSecret'))
    } catch (error) {
      return null
    }
  }

  async findToken(refreshToken) {
    try {
      return await Token.findOne({ refreshToken })
    } catch (error) {
      return null
    }
  }

  async isTokenInBlackList(accessToken, userId) {
    try {
      const blackListedToken = await TokensBlackList.findOne({ userId })
      return (
        blackListedToken != null &&
        blackListedToken.accessTokens.includes(accessToken)
      )
    } catch (error) {
      return null
    }
  }

  async addTokenToBlackList(accessToken, userId) {
    try {
      await TokensBlackList.findOneAndUpdate(
        { userId },
        { $push: { accessTokens: accessToken } },
        { upsert: true }
      )
    } catch (error) {
      return null
    }
  }

  async removeRefreshToken(userId) {
    try {
      const tokenToDelete = await Token.findOne({ userId })
      if (tokenToDelete) {
        await tokenToDelete.deleteOne()
        return null
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

module.exports = new TokenService()
