import { Box, Center, Flex, Stack } from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { FC } from 'react';
import Link from './Link';

const INNER_PADDING_HORIZONTAL = {
  base: 2,
  sm: 4,
  md: 12,
  lg: 24,
};

const LayoutHeader: FC = () => {
  return (
    <Flex
      bgColor="white"
      boxShadow="dark-lg"
      alignItems="center"
      justifyContent="space-between"
      height={16}
      pl={INNER_PADDING_HORIZONTAL}
      pr={INNER_PADDING_HORIZONTAL}
    >
      <Stack height="100%" spacing={8} direction="row" alignItems="stretch">
        <Box p={4}>
          <Center>
            <NextImage src="/workflow-logo.png" height="30px" width="128px" />
          </Center>
        </Box>

        <Link href="/products">Products</Link>
      </Stack>

      <Stack height="100%" spacing={8} direction="row" alignItems="stretch">
        <Link href="/login">Login</Link>
        <Link href="/register">Register</Link>
      </Stack>
    </Flex>
  );
};

export default LayoutHeader;
