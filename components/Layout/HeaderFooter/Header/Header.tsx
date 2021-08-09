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
      <Stack spacing={8}>
        <Box p={4}>
          <ItemWrapper>
            <Image src="/workflow-logo.png" height="30px" width="128px" />
          </ItemWrapper>
        </Box>

        <TextLink href="/products">Products</TextLink>
      </Stack>

      <Stack spacing={4}>{isLoggedIn ? <LoggedIn /> : <LoggedOut />}</Stack>
    </Container>
  );
};

export default LayoutHeader;
