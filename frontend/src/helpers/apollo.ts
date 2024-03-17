import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: process.env.VERCEL_ENV === "production" ? "https://ksportsbackend.azurewebsites.net/graphql" : "http://localhost:3000/graphql",
  cache: new InMemoryCache(),
});

export default client;
