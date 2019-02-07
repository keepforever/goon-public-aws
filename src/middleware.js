const { getUserId, clearLog } = require("./utils");

const isAuthenticated = ctx => {
  console.log("hello isAuthenticated");
  return (userId = getUserId(ctx));
};

const myMiddleware = {
  Query: {
    meUser: async (resolve, parent, args, context, info) => {
      // You can you middleware to override arguments
      const argsWithDefault = {
        myAddedKey: "myAddedValue",
        ...args
      };
      const result = await resolve(parent, argsWithDefault, context, info);
      // Or change the returned values of resolvers
      return result;
    },
    users: async (resolve, parent, args, context, info) => {
      const myEnhancedArgs = {
        myKey: 'myValue',
        ...args,
      }
      const result = await resolve(parent, myEnhancedArgs, context, info);

      clearLog("users middleware", result)

      return result;
    },
  },
  Mutation: {
    createConnection: async (resolve, parent, args, ctx, info) => {
      // get userId by decoding token in context
      const userId = isAuthenticated(ctx);
      // add userId to arguments object
      const argsWithUserId = {
        userId,
        ...args
      };
      // send everything to createPartnership resolver
      const Partnership = await resolve(parent, argsWithUserId, ctx, info);

      clearLog('createPartnership middleware result.id', Partnership.id)
      // append newly created Partnership to the User's
      // userPartners array.
      const updatedUser = await await ctx.db.mutation.updateUser({
        data: {
          // id = Partnership's id
          userPartners: { connect: { id: Partnership.id } }
        },
        where: {
          // User's Id to which you want to attach Partnership
          id: userId
        }},
        `{
          id
          userPartners{
            partner{
              id
              name
            }
          }
        }`);

      clearLog("updatedUser", updatedUser);
      // return the necessary type as specified in the schema (or
      // in the generated schema by way of import)
      return Partnership;
    }
  }
};

module.exports = {
  myMiddleware
};
