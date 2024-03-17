import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.NODE_ENV === "production" ? "https://ksportsbackend.azurewebsites.net/graphql" : "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
