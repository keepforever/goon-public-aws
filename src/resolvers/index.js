// Mutations
const { auth } = require('./Mutation/auth');
const { user } = require('./Mutation/user');
// Queries
const { generalQuery } = require('./Query/general');
const { userQuery } = require('./Query/user');

// const { Subscription } = require('./Subscription')

module.exports = {
  // Subscription,
  Query: {
    ...userQuery,
    ...generalQuery,
  },
  Mutation: {
    ...auth,
    ...user,
  },
}
