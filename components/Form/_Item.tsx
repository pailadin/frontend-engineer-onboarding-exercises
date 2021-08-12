// TODO In the future, we will need more inputs than just text
import { FormControl, FormErrorMessage, Stack, Text } from '@chakra-ui/react';
import { sentenceCase } from 'change-case';
import { ComponentType, FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

export interface ItemProps {
  Component: ComponentType;
  name: string;
  label?: string;
  placeholder?: string;
  renderBelow?: ReactNode;
}

const FormItem: FC<ItemProps> = ({ Component, name, label, placeholder, renderBelow = false, ...rest }) => {
  const {
    register,
    formState: { errors, isSubmitting },
  } = useFormContext();

  if (label === undefined) {
    label = sentenceCase(name);
  }

  if (placeholder === undefined) {
    placeholder = `Enter ${String(label).toLowerCase()}`;
  }

  // TODO Probably wrong, but stops Typescript from warning me:
  const componentProps = {
    placeholder,
    disabled: isSubmitting,
  };

  return (
    <FormControl isInvalid={errors[name]}>
      <Stack spacing={3}>
        <Text>{label}</Text>

        <Component {...register(name)} {...componentProps} {...rest} />

        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>

        {renderBelow}
      </Stack>
    </FormControl>
  );
};

export default FormItem;
