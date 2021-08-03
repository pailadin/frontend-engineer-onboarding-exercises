import { Box, Button, Center } from '@chakra-ui/react';
import { Container, Item } from '@components/form';
import { FC } from 'react';
import ForgotPassword from './ForgotPassword';

const LoginComponent: FC = () => (
  <Center>
    <Container w="40vw" header="Log in">
      <Item label="Email" placeholder="email@example.com" />

      <Item label="Password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />

      <Box />

      <Button colorScheme="purple">Log in</Button>
    </Container>
  </Center>
);

export default LoginComponent;
