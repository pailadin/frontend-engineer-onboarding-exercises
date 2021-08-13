// TODO Ask if the <Image/> from next or chakra should be used
import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Flex, Image, Stack, Text } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import Link from 'next/link';
import { FC } from 'react';
import MenuButton from './MenuButton';

interface Props {
  id: string;
  name: string;
  description: string;
  image?: string;
  isCurrentUserOwner?: boolean;
  refetch?: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<unknown>>;
}

const Product: FC<Props> = ({
  id,
  name,
  description,
  image = DEFAULT_PRODUCT_IMAGE,
  isCurrentUserOwner = false,
  refetch,
}) => (
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

        {isCurrentUserOwner && <MenuButton id={id} refetch={refetch} />}
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

export default Product;
