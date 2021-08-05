import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ForgotPassword: FC = () => (
  <Flex justify="flex-end">
    <Text fontSize="sm" fontWeight="bold" color="purple.400">
      Forgot password
    </Text>
  </Flex>
);

export default ForgotPassword;
