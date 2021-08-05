import { FormControl, FormErrorMessage, Input, Stack, Text } from '@chakra-ui/react';
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
const Item: FC<Props> = ({ name, label, type, placeholder, renderBelow }) => {
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
        <Text>{label}</Text>

        {/* TODO: Warning: Prop `id` did not match */}
        <Input {...register(name)} type={type} placeholder={placeholder} disabled={isSubmitting} />

        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>

        {renderBelow}
      </Stack>
    </FormControl>
  );
};

export default Item;
