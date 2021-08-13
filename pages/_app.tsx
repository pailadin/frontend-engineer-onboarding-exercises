import { ApolloClient, ApolloProvider, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import reduxStore, { persistor as reduxPersistor } from '@store';
import { CachePersistor, LocalStorageWrapper } from 'apollo3-cache-persist';
import { AppProps } from 'next/app';
import { FC, useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

const DEFAULT_GRAPHQL_URI = 'https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const [apolloClient, setApolloClient] = useState<ApolloClient<NormalizedCacheObject>>();
  const [apolloPersistor, setApolloPersistor] = useState<CachePersistor<NormalizedCacheObject>>();

  const token = reduxStore.getState().user.token;

  const clearApolloPersistor = async (): Promise<boolean> => {
    if (apolloPersistor) {
      await apolloPersistor.purge();

      if (apolloClient) {
        await apolloClient.clearStore();
      }

      return true;
    }

    return false;
  };

  useEffect(() => {
    const init = async ({ token }): Promise<unknown> => {
      await clearApolloPersistor();

      const headers: Record<string, string> = {};
      if (token) {
        headers.authorization = `Bearer ${token}`;
      }

      const cache = new InMemoryCache();
      const newPersistor = new CachePersistor({
        cache,
        storage: new LocalStorageWrapper(window.localStorage),
        debug: true,
        trigger: 'write',
      });
      await newPersistor.restore();

      setApolloPersistor(newPersistor);

      setApolloClient(
        new ApolloClient({
          uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || DEFAULT_GRAPHQL_URI,
          cache,
          defaultOptions: {
            // https://github.com/apollographql/apollo-client/issues/2555#issuecomment-490866804:
            watchQuery: {
              fetchPolicy: 'cache-and-network',
              errorPolicy: 'all',
            },
            query: {
              errorPolicy: 'all',
            },
          },
          headers,
        })
      );

      return;
    };

    // eslint-disable-next-line no-console
    init({ token }).catch(console.error);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  if (!apolloClient) return null;

  return (
    <ReduxProvider store={reduxStore}>
      <PersistGate loading={null} persistor={reduxPersistor}>
        <ApolloProvider client={apolloClient}>
          <ChakraProvider>
            <Component {...pageProps} />
          </ChakraProvider>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  );
};

export default App;
