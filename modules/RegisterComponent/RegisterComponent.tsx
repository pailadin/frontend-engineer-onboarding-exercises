import { Center } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/formxxx';
import { REGISTER as VALIDATION_SCHEMA } from '@constants/validation/user';
import { FC } from 'react';

const RegisterComponent: FC = () => {
  // eslint-disable-next-line no-console
  const onSubmit = (data: unknown): void => console.log(data);

  return (
    <Center>
      <FormContainer validationSchema={VALIDATION_SCHEMA} header="Sign up" onSubmit={onSubmit}>
        <Item name="firstName" />

        <Item name="lastName" />

        <Item name="email" placeholder="email@example.com" />

        <Item name="password" type="password" />

        <Item name="password2" label="Confirm password" type="password" />
      </FormContainer>
    </Center>
  );
};

export default RegisterComponent;
