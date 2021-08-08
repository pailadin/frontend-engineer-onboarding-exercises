import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Footer, Header } from './HeaderFooter';

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
}

const Layout: FC<Props> = ({ children, hideFooter = false }) => {
  const WIDTH = {
    base: '100vw',
    md: '80vw',
  };

  return (
    <Flex height="100vh" direction="column">
      <Header />

      <Flex bgColor="gray.50" flexGrow={1} placeContent="center" width="100vw">
        <Flex placeContent="center" width={WIDTH}>
          {children}
        </Flex>
      </Flex>

      {!hideFooter && <Footer />}
    </Flex>
  );
};

export default Layout;
