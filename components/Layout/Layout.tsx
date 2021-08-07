import { Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { Footer, Header } from './HeaderFooter';

const MIN_WIDTH = {
  md: '80vw',
  base: '100vw',
};

interface Props {
  children: ReactNode;
  hideFooter?: boolean;
  [x: string]: unknown;
}

const Layout: FC<Props> = ({ children, hideFooter = false, ...rest }) => (
  <Flex height="100vh" direction="column">
    <Header />

    <Flex bgColor="gray.50" flexGrow={1} placeContent="center" minWidth={MIN_WIDTH} {...rest}>
      {children}
    </Flex>

    {!hideFooter && <Footer />}
  </Flex>
);

export default Layout;
