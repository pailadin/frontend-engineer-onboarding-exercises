// TODO Ask if the <Image/> from next or chakra should be used
import { Box, Image, Stack, Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  title: string;
  image: string;
  description: string;
}

const Product: FC<Props> = ({ title, image, description }) => (
  <Box bgColor="white" rounded="lg" boxShadow="md">
    <Stack>
      <Image src={image} roundedTop="lg" fit="cover" maxHeight={200} />

      <Stack spacing={4} p={4}>
        <Text fontSize="lg" fontWeight="bold">
          {title}
        </Text>

        <Text>{description}</Text>
      </Stack>
    </Stack>
  </Box>
);

export default Product;
