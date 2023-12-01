import { ApolloClient, InMemoryCache } from "@apollo/client";

const Client = new ApolloClient({
    uri: "http://localhost:5173/",
    cache: new InMemoryCache()
})

export default Client;