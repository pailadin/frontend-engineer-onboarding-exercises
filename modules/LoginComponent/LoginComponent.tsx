import { Box, Button, Center } from '@chakra-ui/react';
import { Container, Item } from '@components/form';
import { LOGIN as LOGIN_VALIDATION } from '@constants/validation/user';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import ForgotPassword from './ForgotPassword';

const LoginComponent: FC = () => {
  const schema = yup.object().shape(LOGIN_VALIDATION);
  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues: { email: 'danielaranas@' },
  });

  // eslint-disable-next-line no-console
  const onSubmit = (data: unknown): void => console.log(data);

  return (
    <Center>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Container header="Log in">
            <Item name="email" placeholder="email@example.com" />

            <Item name="password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />

            <Box />

            <Button type="submit" colorScheme="purple">
              Log in
            </Button>
          </Container>
        </form>
      </FormProvider>
    </Center>
  );
};

export default LoginComponent;
