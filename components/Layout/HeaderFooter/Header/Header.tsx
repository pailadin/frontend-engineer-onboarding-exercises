import { Box } from '@chakra-ui/react';
import { checkIfLoggedIn } from '@store/userSlice';
import Image from 'next/image';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import Container from '../Container';
import ItemWrapper from '../ItemWrapper';
import Stack from '../Stack';
import LoggedIn from './HeaderLoggedIn';
import LoggedOut from './HeaderLoggedOut';
import TextLink from './TextLink';

const LayoutHeader: FC = () => {
  const isLoggedIn = useSelector(checkIfLoggedIn);

  return (
    <Container mb="2px">
      <Box>
        <Stack spacing={8}>
          <ItemWrapper display={{ base: 'none', md: 'flex' }}>
            <Image src="/workflow-logo.png" height="30px" width="128px" />
          </ItemWrapper>

          <TextLink href="/products">Products</TextLink>
        </Stack>
      </Box>

      <Box>
        <Stack spacing={4}>{isLoggedIn ? <LoggedIn /> : <LoggedOut />}</Stack>
      </Box>
    </Container>
  );
};

export default LayoutHeader;
