const { getUserId } = require('../../../utils')
const { forwardTo } = require('prisma-binding')

const user = {
  updateUser: (parent, args, ctx, info) => {
    return forwardTo("db")(parent, args, ctx, info);
  },
  deleteUser: (parent, args, ctx, info) => {
    return forwardTo("db")(parent, args, ctx, info);
  },
  createMessage: (parent, args, ctx, info) => {
    return forwardTo("db")(parent, args, ctx, info);
  },
}

module.exports = { user }
