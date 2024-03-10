import { GraphQLObjectType, GraphQLSchema, GraphQLString } from "graphql";
const { PrismaClient } = require("@prisma/client");
const { graphqlHTTP } = require("express-graphql"); // Correct import

const app = require("express")();

const prisma = new PrismaClient();

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "lol",
    fields: () => ({
      message: {
        type: GraphQLString,
        resolve: () => "hello",
      },
    }),
  }),
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);

app.listen(3000);
