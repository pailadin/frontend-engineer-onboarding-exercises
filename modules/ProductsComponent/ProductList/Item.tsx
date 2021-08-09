// TODO Ask if the <Image/> from next or chakra should be used
import { Box, Image, Stack, Text } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import { FC } from 'react';

interface Props {
  name: string;
  image?: string;
  description: string;
}

const Product: FC<Props> = ({ name, image = '/default-product-image.jpg', description }) => (
  <Box bgColor="white" rounded="lg" boxShadow="md">
    <Stack>
      <Image src={image} roundedTop="lg" fit="cover" maxHeight={8 * 25} />
    </Stack>

    <Stack spacing={4} p={4}>
      <Text fontSize="lg" fontWeight="bold">
        {name}
      </Text>

      <Text>{description}</Text>
    </Stack>

    <Stack p={4}>
      <AddToCartButton />
    </Stack>
  </Box>
);

export default Product;
