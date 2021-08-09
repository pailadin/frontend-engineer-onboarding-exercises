import { useMutation } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import { FormContainer, Item } from '@components/Form';
import { SIGNUP as MUTATION } from '@constants/graphql/mutations';
import { SIGNUP as VALIDATION_SCHEMA } from '@constants/validation/user';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { checkIfLoggedIn, setUserToken } from '@store/userSlice';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

const SignupComponent: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  useEffect(() => {
    if (isLoggedIn) void router.push('/products');
  }, [isLoggedIn, router]);

  const [mutate] = useMutation(MUTATION, {
    onCompleted: (data) => {
      const token = data.signUp.token;

      dispatch(setUserToken(token));

      toast({
        title: 'Registered successfully',
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
          firstname: input.firstName,
          lastname: input.lastName,
          password: input.password,
        },
      },
    });

  if (isLoggedIn) return null;

  return (
    <FormContainer validationSchema={VALIDATION_SCHEMA} header="Sign up" onSubmit={onSubmit}>
      <Item name="firstName" />

      <Item name="lastName" />

      <Item name="email" placeholder="email@example.com" />

      <Item name="password" type="password" />

      <Item name="password2" label="Confirm password" type="password" />
    </FormContainer>
  );
};

export default SignupComponent;
