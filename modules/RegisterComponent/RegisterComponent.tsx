import { Box, Button, Center } from '@chakra-ui/react';
import { Container, Item } from '@components/form';
import { FC } from 'react';

const RegisterComponent: FC = () => (
  <Center>
    <Container header="Sign up">
      <Item label="First name" />

      <Item label="Last name" />

      <Item label="Email" placeholder="email@example.com" />

      <Item label="Password" type="password" />

      <Item label="Confirm Password" placeholder="Confirm password" type="password" />

      <Box />

      <Button colorScheme="purple">Log in</Button>
    </Container>
  </Center>
);

export default RegisterComponent;
