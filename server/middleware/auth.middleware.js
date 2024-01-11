const tokenService = require('../services/token.service')

module.exports = async (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  try {
    // example: Bearer sodfkdgdgfpokdgpokdgpg
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const data = tokenService.validateAccessToken(token)

    if (!data) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    const isTokenBlacklisted = await tokenService.isTokenInBlackList(
      token,
      data._id
    )

    if (isTokenBlacklisted) {
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.user = data

    next()
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' })
  }
}
