import { Box, Center } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FC } from 'react';
import Container from '../Container';
import Stack from '../Stack';
import ButtonLink from './ButtonLink';
import TextLink from './TextLink';

const LayoutHeader: FC = () => {
  return (
    <Container mb="2px">
      <Stack spacing={8}>
        <Box p={4}>
          <Center>
            <Image src="/workflow-logo.png" height="30px" width="128px" />
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
    </Container>
  );
};

export default LayoutHeader;
