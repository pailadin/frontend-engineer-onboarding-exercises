import { Input, Stack, Text } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

interface Props {
  label: string;
  type?: string;
  placeholder?: string;
  renderBelow?: ReactNode;
}

const FormItem: FC<Props> = ({ label, type, placeholder, renderBelow }) => (
  <Stack spacing={3}>
    <Text>{label}</Text>

    <Input type={type} placeholder={placeholder} />

    {renderBelow}
  </Stack>
);

export default FormItem;
