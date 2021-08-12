import { DocumentNode, useMutation } from '@apollo/client';
import { Button, Flex, Stack, Text, useToast } from '@chakra-ui/react';
import { Input, InputTextarea } from '@components/Form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';
import Container, { BreadcrumbsProps } from './Container';
import FileUploadBox from './FileUploadBox';

interface Props extends BreadcrumbsProps {
  mutation: DocumentNode;
  dataPath: string;
  successTitleSuffix: string;
  validationSchema: ObjectShape;
  mapFormInputToGraphQL?: (input: Record<string, unknown>) => unknown;
  defaultValues?: Record<string, unknown>;
  cancelUrl?: string;
  successDescription?: string;
}

const ProductAddEdit: FC<Props> = ({
  mutation,
  dataPath,
  successTitleSuffix,
  validationSchema,
  breadcrumbs,
  mapFormInputToGraphQL = (input: Record<string, unknown>): Record<string, unknown> => ({
    name: input.name,
    description: input.description,
  }),
  defaultValues = {},
  cancelUrl = '/products',
  successDescription,
}) => {
  const router = useRouter();
  const toast = useToast();

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
    defaultValues,
  });

  const onSubmit = (input: Record<string, unknown>): Promise<unknown> =>
    mutate({
      variables: {
        input: mapFormInputToGraphQL(input),
      },
    });

  const cancel = (): void => {
    void router.back();
    // Got this idea from here https://stackoverflow.com/a/16580197:
    void router.push(cancelUrl);
  };

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <Container
      breadcrumbs={breadcrumbs}
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
            <Input name="name" label="Title" />

            <InputTextarea name="description" />

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

export default ProductAddEdit;
