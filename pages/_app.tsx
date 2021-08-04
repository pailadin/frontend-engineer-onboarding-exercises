import { ChakraProvider } from '@chakra-ui/react';
import store from '@store';
import { AppProps } from 'next/app';
import { FC } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ReduxProvider store={store}>
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  </ReduxProvider>
);

export default App;
