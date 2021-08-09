// TODO Ask if the <Image/> from next or chakra should be used
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import { FC } from 'react';

interface Props {
  name: string;
  image?: string;
  description: string;
}

const Product: FC<Props> = ({ name, image = '/default-product-image.jpg', description }) => {
  return (
    <Flex
      direction="column"
      height={{
        base: 8 * 25,
        sm: 8 * 40,
        md: 8 * 50,
        lg: 8 * 60,
      }}
      bgColor="white"
      rounded="lg"
      boxShadow="md"
      cursor="pointer"
    >
      <Stack>
        <Image
          src={image}
          roundedTop="lg"
          fit="cover"
          maxHeight={{
            base: 0,
            sm: 8 * 15,
            md: 8 * 20,
            lg: 8 * 25,
          }}
        />
      </Stack>

      <Stack flexGrow={1} spacing={4} p={4}>
        <Text fontSize="lg" fontWeight="bold" isTruncated>
          {name}
        </Text>

        <Text noOfLines={{ base: 1, sm: 2, md: 4, lg: 6 }}>{description}</Text>
      </Stack>

      <Stack p={4} justifySelf="flex-end">
        <AddToCartButton />
      </Stack>
    </Flex>
  );
};

export default Product;
