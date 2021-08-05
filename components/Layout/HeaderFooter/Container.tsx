import { Flex } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  [x: string]: unknown;
}

const INNER_PADDING_HORIZONTAL = {
  base: 2,
  sm: 4,
  md: 12,
  lg: 24,
};

const HeaderFooterContainer: FC<Props> = ({ children, ...rest }) => {
  return (
    <Flex
      bgColor="white"
      boxShadow="lg"
      alignItems="center"
      justifyContent="space-between"
      minHeight={14}
      pl={INNER_PADDING_HORIZONTAL}
      pr={INNER_PADDING_HORIZONTAL}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default HeaderFooterContainer;
