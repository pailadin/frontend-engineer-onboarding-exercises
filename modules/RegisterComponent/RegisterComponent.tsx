import { Center } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/Form';
import { REGISTER as VALIDATION_SCHEMA } from '@constants/validation/user';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeUserData } from '@store/userSlice';
import { FC } from 'react';

const RegisterComponent: FC = () => {
  const dispatch = useDispatch();

  const onSubmit = async (data: unknown): Promise<unknown> => {
    try {
      return await dispatch(getFakeUserData(data));
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  };

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
