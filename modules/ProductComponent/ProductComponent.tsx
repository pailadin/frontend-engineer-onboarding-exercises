import { useQuery } from '@apollo/client';
import { Flex, HStack, Icon, IconButton, Image, Text, useToast } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import { GET_PRODUCTS } from '@constants/graphql/queries';
import Link from 'next/link';
import { FC, useEffect } from 'react';
import { FaEdit as IconEdit, FaTrashAlt as IconDelete } from 'react-icons/fa';
import Container from './Container';

interface Props {
  id: string | number;
}

const Product: FC<Props> = ({ id }) => {
  const toast = useToast();

  const { loading, error, data } = useQuery(GET_PRODUCTS, {
    variables: {
      filter: {
        id: {
          eq: id,
        },
      },
    },
  });

  const product = data?.products?.edges?.[0]?.node;
  const shouldShowError = !loading && (error || !product);

  useEffect(() => {
    if (shouldShowError) {
      // Toasting this here instead of using "onError" cuz
      // a search not returning a result doesn't actually error:
      toast({
        title: 'Error!',
        description: 'Product not found',
        status: 'error',
        isClosable: true,
      });
    }
  }, [shouldShowError, toast]);

  if (shouldShowError) return <Redirect />;
  if (loading) return <Loading />;

  return (
    <Container
      bgColor="inherit"
      breadcrumbs={product.name}
      renderLeft={
        <>
          <Image
            src={product.image}
            fallbackSrc={DEFAULT_PRODUCT_IMAGE}
            rounded="xl"
            objectFit="contain"
            height="auto"
          />

          <AddToCartButton mt={6} />
        </>
      }
    >
      <Flex justifyContent="space-between">
        <Text fontSize="3xl" fontWeight="bold" isTruncated>
          {product.name}
        </Text>

        <HStack spacing={2}>
          <Link href={`/product/edit/${id}`}>
            <IconButton colorScheme="gray" icon={<Icon as={IconEdit} h={3} w={3} />} aria-label="Edit Button" />
          </Link>

          <IconButton colorScheme="gray" icon={<Icon as={IconDelete} h={3} w={3} />} aria-label="Delete Button" />
        </HStack>
      </Flex>

      <Flex mt={4}>
        <Text>{product.description}</Text>
      </Flex>
    </Container>
  );
};

export default Product;
