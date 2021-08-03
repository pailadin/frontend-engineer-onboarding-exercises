import { Input, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
}

const FormItem: FC<Props> = ({ label, type, placeholder }) => (
  <Stack spacing={3}>
    <Text>{label}</Text>
    <Input size="md" type={type} placeholder={placeholder} />
  </Stack>
);

export default FormItem;
