const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { getUserId, clearLog } = require('../../../../utils')

function createToken(userId) {
  return jwt.sign({ userId, expiresIn: "7d" }, process.env.APP_SECRET)
}

async function userSignup (parent, args, ctx, info) {
    const password = await bcrypt.hash(args.password, 5)

    const user = await ctx.db.mutation.createUser({
      data: { ...args, password },
    })

    return {
      token: createToken(user.id),
      user,
    }
};

module.exports = {
  userSignup,
}
