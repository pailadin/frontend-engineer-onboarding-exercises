import { Center } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/form';
import { LOGIN as VALIDATION_SCHEMA } from '@constants/validation/user';
import { FC } from 'react';
import ForgotPassword from './ForgotPassword';

const LoginComponent: FC = () => {
  // eslint-disable-next-line no-console
  const onSubmit = (data: unknown): void => console.log(data);

  return (
    <Center>
      <FormContainer validationSchema={VALIDATION_SCHEMA} header="Log in" onSubmit={onSubmit}>
        <Item name="email" placeholder="email@example.com" />

        <Item name="password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />
      </FormContainer>
    </Center>
  );
};

export default LoginComponent;
