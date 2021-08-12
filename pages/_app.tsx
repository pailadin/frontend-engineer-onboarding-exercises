import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import store, { persistor } from '@store';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const DEFAULT_GRAPHQL_URI = 'https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const headers: Record<string, string> = {};
  const token = store.getState().user.token;
  if (token) {
    headers.authorization = `Bearer ${token}`;
  }

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || DEFAULT_GRAPHQL_URI,
    cache: new InMemoryCache(),
    headers,
  });

  // https://github.com/apollographql/apollo-client/issues/2555#issuecomment-648280766:
  client.defaultOptions = {
    // https://github.com/apollographql/apollo-client/issues/2555#issuecomment-490866804:
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      errorPolicy: 'all',
    },
  };

  return (
    <ReduxProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ApolloProvider client={client}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
