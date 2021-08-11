import { useQuery } from '@apollo/client';
import { Flex, HStack, Icon, IconButton, Image, Text, useToast } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import Loading from '@components/Loading';
import ProductContainer from '@components/ProductContainer';
import Redirect from '@components/Redirect';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import { GET_PRODUCTS as QUERY } from '@constants/graphql/queries';
import { FC, useEffect } from 'react';
import { FaEdit as IconEdit, FaTrashAlt as IconDelete } from 'react-icons/fa';

interface Props {
  id: string | number;
}

const Product: FC<Props> = ({ id }) => {
  const toast = useToast();

  const { loading, error, data } = useQuery(QUERY, {
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
    <ProductContainer
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
          <IconButton colorScheme="gray" icon={<Icon as={IconEdit} h={3} w={3} />} aria-label="Edit Button" />

          <IconButton colorScheme="gray" icon={<Icon as={IconDelete} h={3} w={3} />} aria-label="Delete Button" />
        </HStack>
      </Flex>

      <Flex mt={4}>
        <Text>{product.description}</Text>
      </Flex>
    </ProductContainer>
  );
};

export default Product;
