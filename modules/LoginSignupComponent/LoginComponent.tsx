import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { Input } from '@components/Form';
import { LOGIN as MUTATION } from '@constants/graphql/mutations';
import { LOGIN as VALIDATION_SCHEMA } from '@constants/validation/user';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { checkIfLoggedIn, setUserToken } from '@store/userSlice';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ForgotPassword from './ForgotPassword';
import FormContainer from './FormContainer';

const LoginComponent: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  useEffect(() => {
    if (isLoggedIn) void router.push('/products');
  }, [isLoggedIn, router]);

  const [mutate] = useMutation(MUTATION, {
    onCompleted: (data) => {
      const token = data.authenticate.token;

      dispatch(setUserToken(token));
      void router.push('/products');

      toast({
        title: 'Logged in!',
        description: 'Redirecting to products page...',
        status: 'success',
        isClosable: true,
      });
    },
    onError: (e) => {
      toast({
        title: 'Error!',
        description: e.message || String(e),
        status: 'error',
        isClosable: true,
      });
    },
  });

  const onSubmit = (input: Record<string, unknown>): Promise<unknown> =>
    mutate({
      variables: {
        input: {
          emailAddress: input.email,
          password: input.password,
        },
      },
    });

  if (isLoggedIn) return null;

  return (
    <FormContainer validationSchema={VALIDATION_SCHEMA} header="Log in" onSubmit={onSubmit}>
      <Input name="email" placeholder="email@example.com" />

      <Input name="password" placeholder="********" type="password" renderBelow={<ForgotPassword />} />
    </FormContainer>
  );
};

export default LoginComponent;
