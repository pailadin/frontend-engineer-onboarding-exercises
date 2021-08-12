import { Flex, FlexProps } from '@chakra-ui/react';
import React, { FC } from 'react';

const PADDING_HORIZONTAL = {
  base: 2,
  sm: 4,
  md: 12,
  lg: 24,
};

const HeaderFooterContainer: FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex
      bgColor="white"
      boxShadow="lg"
      alignItems="center"
      justifyContent="space-between"
      minHeight={14}
      pl={PADDING_HORIZONTAL}
      pr={PADDING_HORIZONTAL}
      {...rest}
    >
      {children}
    </Flex>
  );
};

export default HeaderFooterContainer;
