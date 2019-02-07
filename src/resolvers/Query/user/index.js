const { forwardTo } = require('prisma-binding')
const { getUserId, clearLog } = require('../../../utils')

const userQuery = {
  meUser(parent, args, ctx, info) {
    const id = getUserId(ctx)
    clearLog('meUser test middleware', args.myAddedKey)
    return ctx.db.query.user({ where: { id } }, info)
  },
  messages(parent, args, ctx, info) {
    return forwardTo("db")(parent, args, ctx, info);
  },
}

module.exports = { userQuery }
