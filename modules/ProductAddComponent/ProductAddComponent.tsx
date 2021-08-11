import { useMutation, useQuery } from '@apollo/client';
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import FileUploadBox from '@components/FileUploadBox';
import { Item } from '@components/Form';
import Loading from '@components/Loading';
import ProductContainer from '@components/ProductContainer';
import Redirect from '@components/Redirect';
import { PRODUCT_ADD } from '@constants/graphql/mutations';
import { GET_CURRENT_USER } from '@constants/graphql/queries';
import { CREATE as VALIDATION_SCHEMA } from '@constants/validation/product';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkIfLoggedIn } from '@store/userSlice';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import * as yup from 'yup';

const ProductAdd: FC = () => {
  const router = useRouter();
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, error, data } = useQuery(GET_CURRENT_USER, { skip: !isLoggedIn });
  const [mutate] = useMutation(PRODUCT_ADD, {
    onCompleted: (data) => {
      const { id, name } = data.createProduct;

      void router.push(`/product/${id}`);

      toast({
        title: `"${name}" successfully created`,
        description: 'Redirecting to your new product...',
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
    resolver: yupResolver(yup.object().shape(VALIDATION_SCHEMA)),
  });

  const userId = data?.me?.id || null;
  const shouldShowError = !isLoggedIn || (!loading && (error || !userId));

  useEffect(() => {
    if (shouldShowError) {
      toast({
        title: 'Error!',
        description: 'User not found',
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
        input: {
          name: input.name,
          description: input.description,
        },
      },
    });

  const cancel = (): void => void router.push('/products');

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <ProductContainer
      breadcrumbs={'Add product'}
      renderLeft={
        <Flex p={4} flex={1} direction="column">
          <Text mb={4}>Photo</Text>

          <FileUploadBox />
        </Flex>
      }
    >
      <FormProvider {...formMethods}>
        <Flex flex={1} as={'form'} onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Stack p={4} spacing={6} flex={1}>
            <Item name="name" label="Title" />

            <Item name="description" multiline={true} />

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
    </ProductContainer>
  );
};

export default ProductAdd;
