import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import { PropsWithChildren } from 'react';

const client = new ApolloClient({
    uri: 'https://kaoxiwucun.us-east-a.ibm.stepzen.net/api/nasal-maltese/__graphql',
    headers: {
        Authorization:
        'apikey kaoxiwucun::local.net+1000::fe42b04e9ef8988ddec5079bef567826815b1a6323afbed9617d48932882a22d',
    },
    cache: new InMemoryCache(),
});

const ApolloClientProvider = ({ children }: PropsWithChildren) => {
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;