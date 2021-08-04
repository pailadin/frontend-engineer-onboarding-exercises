import { FormControl, FormErrorMessage, FormLabel, Input, Stack } from '@chakra-ui/react';
import { sentenceCase } from 'change-case';
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  renderBelow?: ReactNode;
}
const FormItem: FC<Props> = ({ name, label, type, placeholder, renderBelow }) => {
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

  return (
    <FormControl isInvalid={errors[name]}>
      <Stack spacing={3}>
        <FormLabel htmlFor={name}>{label}</FormLabel>

        <Input type={type} placeholder={placeholder} disabled={isSubmitting} {...register(name)} />

        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>

        {renderBelow}
      </Stack>
    </FormControl>
  );
};

export default FormItem;
