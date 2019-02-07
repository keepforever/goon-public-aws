const { forwardTo } = require('prisma-binding')
const { clearLog } = require('../../../utils')

const generalQuery = {
  // users: forwardTo("db"),
  users: (parent, args, ctx, info) => {
    clearLog('Query/general/index.js', args.myKey)
    return forwardTo("db")(parent, args, ctx, info);
  },
}

module.exports = { generalQuery }
