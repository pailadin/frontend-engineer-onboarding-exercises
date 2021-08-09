import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import store from '@store';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const DEFAULT_GRAPHQL_URI = 'https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const authorization = store.getState().user.token || '';

  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_URI || DEFAULT_GRAPHQL_URI,
    cache: new InMemoryCache(),
    headers: { authorization },
  });

  return (
    <ReduxProvider store={store}>
      <ApolloProvider client={client}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ApolloProvider>
    </ReduxProvider>
  );
};

export default App;
