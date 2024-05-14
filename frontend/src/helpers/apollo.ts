import { ApolloClient, InMemoryCache } from "@apollo/client";
import { backendHost } from "./general";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "production" ? `${backendHost}graphql` : "http://localhost:8080/graphql",
  cache: new InMemoryCache(),
});

export default client;
