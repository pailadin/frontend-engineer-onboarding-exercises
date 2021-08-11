// TODO In the future, we will need more inputs than just text
import { FormControl, FormErrorMessage, Input, Stack, Text, Textarea } from '@chakra-ui/react';
import { sentenceCase } from 'change-case';
import { FC, ReactNode } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  renderBelow?: ReactNode;
  multiline?: boolean;
}
const Item: FC<Props> = ({ name, label, placeholder, renderBelow, multiline = false, ...rest }) => {
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

  const InputComponent = multiline ? Textarea : Input;

  return (
    <FormControl isInvalid={errors[name]}>
      <Stack spacing={3}>
        <Text>{label}</Text>

        {/* TODO: Warning: Prop `id` did not match */}
        <InputComponent {...register(name)} placeholder={placeholder} disabled={isSubmitting} {...rest} />

        <FormErrorMessage>{errors[name]?.message}</FormErrorMessage>

        {renderBelow}
      </Stack>
    </FormControl>
  );
};

export default Item;
