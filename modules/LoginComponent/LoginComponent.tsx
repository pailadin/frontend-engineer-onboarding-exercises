import { useToast } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/Form';
import { LOGIN as VALIDATION_SCHEMA } from '@constants/validation/user';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeUserData } from '@store/userSlice';
import { FC } from 'react';
import ForgotPassword from './ForgotPassword';

const LoginComponent: FC = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const onSubmit = async (data: unknown): Promise<unknown> => {
    try {
      const response = await dispatch(getFakeUserData(data));

      // TODO This doesn't feel correct
      if ('error' in response) {
        throw response.error;
      }

      toast({
        title: 'Logged in',
        description: 'Pls check Redux store',
        status: 'success',
        isClosable: true,
      });

      return response;
    } catch (e) {
      toast({
        title: 'Error!',
        description: e.message || String(e),
        status: 'error',
        isClosable: true,
      });
    }
  };

  return (
    <FormContainer validationSchema={VALIDATION_SCHEMA} header="Log in" onSubmit={onSubmit}>
      <Item name="email" placeholder="email@example.com" />

      <Item name="password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />
    </FormContainer>
  );
};

export default LoginComponent;
