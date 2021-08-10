import { useQuery } from '@apollo/client';
import { Center, Text, useToast } from '@chakra-ui/react';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
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

  if (shouldShowError) {
    return <Redirect />;
  }

  return (
    <Loading loading={loading}>
      <Center>
        <Text>Product {id}</Text>
      </Center>
    </Loading>
  );
};

export default Product;
