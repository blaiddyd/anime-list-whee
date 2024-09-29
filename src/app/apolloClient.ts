import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://graphql.anilist.co",
    headers: {
      'content-type': "application/json",
      Accept: "application/json",
    },
  }),
  cache: new InMemoryCache(),
});

export default client;
