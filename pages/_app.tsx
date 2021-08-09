import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { ChakraProvider } from '@chakra-ui/react';
import store from '@store';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const DEFAULT_GRAPHQL_URI = 'https://frontend-engineer-onboarding-api-thxaa.ondigitalocean.app/graphql';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  const client = new ApolloClient({
    uri: process.env.GRAPHQL_URI || DEFAULT_GRAPHQL_URI,
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <ReduxProvider store={store}>
        <ChakraProvider>
          <Component {...pageProps} />
        </ChakraProvider>
      </ReduxProvider>
    </ApolloProvider>
  );
};

export default App;
