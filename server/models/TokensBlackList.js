const { Schema, model } = require('mongoose')

const schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    accessTokens: [{ type: String, required: true, default: [] }]
  },
  {
    timestamps: true
  }
)

module.exports = model('TokensBlackList', schema)
