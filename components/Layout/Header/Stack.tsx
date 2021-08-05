import { Stack as ChakraStack } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  spacing?: number;
}

const HeaderStack: FC<Props> = ({ children, spacing }) => {
  return (
    <ChakraStack height="100%" spacing={spacing} direction="row" alignItems="stretch">
      {children}
    </ChakraStack>
  );
};

export default HeaderStack;
