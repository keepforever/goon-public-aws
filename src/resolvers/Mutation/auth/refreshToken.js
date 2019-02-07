const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, createToken } = require('../../../utils')

async function refreshToken (parent, args, ctx, info) {
    const userId = getUserId(ctx)

    return {
      token: createToken(userId),
      userId,
    }
};

module.exports = {
  refreshToken,
}
