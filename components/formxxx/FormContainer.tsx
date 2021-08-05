// Currently used by the Login and Register modules
// TODO Ask if this component should even be here, or combine those modules, or something else:
import { Box, Button, Center } from '@chakra-ui/react';
import { Container } from '@components/formxxx';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC, ReactNode } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface Props {
  children: ReactNode;
  validationSchema: ObjectShape;
  header?: string;
  onSubmit: (data: Record<string, unknown>) => void;
  submitButtonText?: string;
}

const FormContainer: FC<Props> = ({
  children,
  validationSchema,
  header,
  onSubmit,
  submitButtonText,
  // TODO Search again about how to ""...rest"
}) => {
  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(yup.object().shape(validationSchema)),
  });

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <Center>
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(onSubmit)}>
          <Container header={header}>
            {children}

            <Box />

            <Button type="submit" colorScheme="purple" disabled={submitDisabled}>
              {submitButtonText || header || 'Submit'}
            </Button>
          </Container>
        </form>
      </FormProvider>
    </Center>
  );
};

export default FormContainer;
