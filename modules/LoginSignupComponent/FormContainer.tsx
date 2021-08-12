import { Box, Button, Divider, Flex, FlexProps, Grid, Stack, Text, useTheme } from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { FC } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface Props extends Omit<FlexProps, 'onSubmit'> {
  validationSchema: ObjectShape;
  header?: string;
  onSubmit: (data: Record<string, unknown>) => void;
  submitButtonText?: string;
}

const FormContainer: FC<Props> = ({ children, validationSchema, header, onSubmit, submitButtonText, ...rest }) => {
  const theme = useTheme();

  const FORM_MIN_WIDTH = {
    base: '100vw',
    md: theme.breakpoints.md,
  };
  const FORM_PADDING = {
    base: 2,
    sm: 4,
    md: 8,
  };

  const formMethods = useForm({
    mode: 'all',
    resolver: yupResolver(yup.object().shape(validationSchema)),
  });

  const submitDisabled =
    formMethods.formState.isSubmitting || !formMethods.formState.isDirty || !formMethods.formState.isValid;

  return (
    <Flex flex={1} direction="column" justifyContent="center" {...rest}>
      <Flex justifyContent="center">
        <FormProvider {...formMethods}>
          <Box as="form" bgColor="white" minWidth={FORM_MIN_WIDTH} onSubmit={formMethods.handleSubmit(onSubmit)}>
            {header && (
              <>
                <Grid p={FORM_PADDING} placeContent="center">
                  <Text fontSize="3xl" fontWeight="bold">
                    {header}
                  </Text>
                </Grid>

                <Divider />
              </>
            )}

            <Grid p={FORM_PADDING}>
              <Stack spacing={6}>{children}</Stack>

              <Button mt={12} type="submit" colorScheme="purple" disabled={submitDisabled}>
                {submitButtonText || header || 'Submit'}
              </Button>
            </Grid>
          </Box>
        </FormProvider>
      </Flex>
    </Flex>
  );
};

export default FormContainer;
