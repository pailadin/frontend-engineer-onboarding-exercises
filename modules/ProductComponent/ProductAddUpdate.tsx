import { DocumentNode, useMutation, useQuery } from '@apollo/client';
import { Button, Flex, Stack, useToast } from '@chakra-ui/react';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { GET_CURRENT_USER } from '@constants/graphql/queries';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkIfLoggedIn } from '@store/userSlice';
import { useRouter } from 'next/router';
import { FC, ReactNode, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import Container from './Container';

interface Props {
  children: ReactNode;
  mutation: DocumentNode;
  dataPath: string;
  successTitleSuffix: string;
  successDescription: string;
  validationSchema: ObjectShape;
  breadcrumbs: string;
  mapFormInputToGraphQL?: () => Record<string, unknown>;
  renderLeft?: ReactNode;
  cancelUrl?: string;
}

const ProductAddUpdate: FC<Props> = ({
  children,
  mutation,
  dataPath,
  successTitleSuffix,
  successDescription,
  validationSchema,
  breadcrumbs,
  mapFormInputToGraphQL = (input: Record<string, unknown>): Record<string, unknown> => {
    return {
      name: input.name,
      description: input.description,
    };
  },
  renderLeft,
  cancelUrl,
}) => {
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, error, data } = useQuery(GET_CURRENT_USER, { skip: !isLoggedIn });
  const [mutate] = useMutation(mutation, {
    onCompleted: (data) => {
      const { id, name } = data[dataPath];

      void router.push(`/product/${id}`);

      toast({
        title: `"${name}" successfully ${successTitleSuffix}`,
        description: successDescription,
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

  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(yup.object().shape(validationSchema)),
  });

  const userId = data?.me?.id || null;
  const shouldShowError = !isLoggedIn || (!loading && (error || !userId));

  useEffect(() => {
    if (shouldShowError) {
      toast({
        title: 'Error!',
        description: 'You are not authorized to do this action',
        status: 'error',
        isClosable: true,
      });
    }
  }, [shouldShowError, toast]);

  if (shouldShowError) return <Redirect />;
  if (loading) return <Loading />;

  const onSubmit = (input: Record<string, unknown>): Promise<unknown> =>
    mutate({
      variables: {
        input: mapFormInputToGraphQL(input),
      },
    });

  const cancel = (): void => {
    if (cancelUrl) {
      void router.push(cancelUrl);
    } else {
      void router.back();
    }
  };

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <Container breadcrumbs={breadcrumbs} renderLeft={renderLeft}>
      <FormProvider {...formMethods}>
        <Flex flex={1} as={'form'} onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack p={4} spacing={6} flex={1}>
            {children}

            <Stack direction="row" spacing={4}>
              <Button type="submit" colorScheme="purple" disabled={submitDisabled}>
                Submit
              </Button>

              <Button onClick={cancel} colorScheme="gray" disabled={formMethods.formState.isSubmitting}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Flex>
      </FormProvider>
    </Container>
  );
};

export default ProductAddUpdate;
