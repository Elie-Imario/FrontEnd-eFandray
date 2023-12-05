import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/graphql`,
    options: {
      reconnect: true
    }
});

const httpLink = new HttpLink({
    uri: 'http://localhost:4000/graphql',
})

//Separé les transport par type de requete
const link = split(
    ({ query }) => {
        const definition = getMainDefinition(query)
        return definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
    },

    wsLink,
    httpLink
)

const Client = new ApolloClient({
    link,
    cache: new InMemoryCache()
})


export default Client;