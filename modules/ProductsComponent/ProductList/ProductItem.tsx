// TODO Ask if the <Image/> from next or chakra should be used
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import Link from 'next/link';
import { FC } from 'react';
import MenuButton from './MenuButton';

interface Props {
  id: string;
  name: string;
  image?: string;
  description: string;
  currentUserId?: string | null;
  ownerUserId?: string | null;
}

const Product: FC<Props> = ({ id, name, image = DEFAULT_PRODUCT_IMAGE, description, currentUserId, ownerUserId }) => {
  const isCurrentUserOwner = currentUserId === ownerUserId;

  return (
    <Link
      href={{
        pathname: '/product/[id]',
        query: { id },
      }}
    >
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
        <Stack position="relative" display={{ base: 'none', sm: 'flex' }}>
          <Image
            src={image}
            roundedTop="lg"
            fit="cover"
            maxHeight={{
              sm: 8 * 15,
              md: 8 * 20,
              lg: 8 * 25,
            }}
          />

          {isCurrentUserOwner && <MenuButton id={id} />}
        </Stack>

        <Stack flexGrow={1} spacing={4} p={4}>
          <Text fontSize="lg" fontWeight="bold" isTruncated>
            {name}
          </Text>

          <Text whiteSpace="pre-wrap" noOfLines={{ base: 1, sm: 2, md: 3, lg: 5 }}>
            {description}
          </Text>
        </Stack>

        <Stack p={4} justifySelf="flex-end">
          <AddToCartButton />
        </Stack>
      </Flex>
    </Link>
  );
};

export default Product;
