import { useQuery } from '@apollo/client';
import { Flex, Image, Stack, Text, useToast } from '@chakra-ui/react';
import AddToCartButton from '@components/AddToCartButton';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { DEFAULT_PRODUCT_IMAGE } from '@constants/etc';
import { GET_PRODUCTS as QUERY } from '@constants/graphql/queries';
import { FC, useEffect } from 'react';

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
    <Flex
      width="100%"
      mt={{
        base: 0,
        sm: 8,
        md: 16,
        lg: 24,
      }}
    >
      <Flex flexGrow={1}>
        <Flex flexDirection="column">
          <Image
            src={product.image}
            fallbackSrc={DEFAULT_PRODUCT_IMAGE}
            rounded="xl"
            objectFit="contain"
            width={{
              base: 0,
              sm: 8 * 20,
              md: 8 * 40,
              lg: 8 * 50,
              xl: 8 * 60,
            }}
            height="auto"
          />

          <AddToCartButton mt={6} />
        </Flex>

        <Flex>
          <Stack flexGrow={1} spacing={4} pl={4}>
            <Text fontSize="3xl" fontWeight="bold" isTruncated>
              {product.name}
            </Text>

            <Text>{product.description}</Text>
          </Stack>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Product;
