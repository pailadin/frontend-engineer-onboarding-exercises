import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Footer, Header } from './HeaderFooter';

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout: FC<Props> = ({ children, hideFooter = false }) => {
  const MAX_WIDTH = {
    base: '100vw',
    md: '80vw',
  };

  return (
    <Flex height="100vh" direction="column">
      <Header />

      <Flex bgColor="gray.50" flexGrow={1} placeContent="center" width="100vw" id="middle-outer">
        <Flex flexGrow={1} placeContent="center" maxWidth={MAX_WIDTH} id="middle-inner">
          {children}
        </Flex>
      </Flex>

      {!hideFooter && <Footer />}
    </Flex>
  );
};

export default Layout;
