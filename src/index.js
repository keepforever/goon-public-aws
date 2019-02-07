require('dotenv').config()
const { GraphQLServer, PubSub } = require('graphql-yoga')
const { RedisPubSub } = require('graphql-redis-subscriptions')
const { Prisma } = require('prisma-binding')
const resolvers = require('./resolvers')
const redis = require('redis')
const bluebird = require('bluebird')
// middleware import
const { myMiddleware } = require('./middleware')

bluebird.promisifyAll(redis);

const client = redis.createClient()

// it's reccomdend to use RedisPubSub in production
const pubsub = new RedisPubSub()

const db = new Prisma({
  // the auto-generated GraphQL schema of the Prisma API
  typeDefs: 'src/generated/prisma.graphql',
  // "http://prisma:4466" if node server is included in docker-compose
  endpoint: "http://localhost:4466",
  debug: true, // log all GraphQL queries & mutations sent to the Prisma API
  secret: "mysecret123", // only needed if specified in `database/prisma.yml` (value set in `.env`)
})

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  middlewares: [myMiddleware],
  context: req => ({ ...req, db, client, pubsub }),
})
// middlewear for static files.
// must install express and import with 'require' syntax
// server.express.use("/images", express.static("images"));

server.start(() => console.log(`

##################################################
##                                              ##
##  Server is running on http://localhost:4000  ##
##                                              ##
##################################################

`))

// when running the gql-server ouside the docker-compse use:
// const client = redis.createClient()
// when running gql-server inside docker-compose use:
// const client = redis.createClient('6379','redis')


// these two functions could be used as middleware, but these functions
// would be applied to every incoming request.  To be more sophistocated,
// we have written more expressive middleware in a separate file.
// if we did want to use 'logInput' and 'logResult', they would be
// added to the array passed to the middlwares.serverOptions below
// around line 59.
// const logInput = async (resolve, root, args, context, info) => {
//   console.log(`1. logInput: ${JSON.stringify(args)}`)
//   const result = await resolve(root, args, context, info)
//   console.log(`5. logInput`)
//   return result
// }
//
// const logResult = async (resolve, root, args, context, info) => {
//   console.log(`2. logResult`)
//   const result = await resolve(root, args, context, info)
//   console.log(`4. logResult: ${JSON.stringify(result)}`)
//   return result
// }


// following,
// https://github.com/prisma/graphql-yoga/tree/master/examples/subscriptions
