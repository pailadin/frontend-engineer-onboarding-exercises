import { Box, Center, Flex } from '@chakra-ui/react';
import NextImage from 'next/image';
import React, { FC } from 'react';
import ButtonLink from './ButtonLink';
import Stack from './Stack';
import TextLink from './TextLink';

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
      // TODO boxShadow not working?
      boxShadow="dark-lg"
      alignItems="center"
      justifyContent="space-between"
      height={16}
      pl={INNER_PADDING_HORIZONTAL}
      pr={INNER_PADDING_HORIZONTAL}
    >
      <Stack spacing={8}>
        <Box p={4}>
          <Center>
            <NextImage src="/workflow-logo.png" height="30px" width="128px" />
          </Center>
        </Box>

        <TextLink href="/products">Products</TextLink>
      </Stack>

      <Stack spacing={4}>
        <ButtonLink href="/login">Log in</ButtonLink>

        <ButtonLink href="/register" variant="solid" colorScheme="purple">
          Sign up
        </ButtonLink>
      </Stack>
    </Flex>
  );
};

export default LayoutHeader;
