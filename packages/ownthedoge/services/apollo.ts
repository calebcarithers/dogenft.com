import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "https://api.zora.co/graphql",
    cache: new InMemoryCache(),
});

export default apolloClient;