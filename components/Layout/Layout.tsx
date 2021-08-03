import { Box, Flex } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => (
  <Flex h="100vh" direction="column">
    <Box bgColor="red" p={4}>
      header
    </Box>

    <Flex bgColor="gray.50" flexGrow={1} placeContent="center">
      {children}
    </Flex>

    <Box bgColor="red" p={2}>
      footer
    </Box>
  </Flex>
);

export default Layout;
