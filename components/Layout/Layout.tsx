import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Footer, Header } from './HeaderFooter';

const MIN_WIDTH = {
  md: '80vw',
  base: '100vw',
};

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <Flex height="100vh" direction="column">
      <Header />

      <Flex bgColor="gray.50" flexGrow={1} placeContent="center" minWidth={MIN_WIDTH}>
        {children}
      </Flex>

      <Footer />
    </Flex>
  );
};

export default Layout;
