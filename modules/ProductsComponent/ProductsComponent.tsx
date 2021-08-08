import { Center, SimpleGrid, Spinner, Text } from '@chakra-ui/react';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeProductData, getProductFetchStatus, getProducts } from '@store/productSlice';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Product from './Product';

const ProductsComponent: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    void dispatch(getFakeProductData());
  }, [dispatch]);

  const products = useSelector(getProducts);
  const status = useSelector(getProductFetchStatus);

  if (status === 'loading') {
    return (
      <Center>
        <Spinner thickness="4px" emptyColor="gray.200" color="blue.500" size="xl" />
      </Center>
    );
  }

  // TODO Show a toast or something on error
  if (products.length <= 0) {
    return (
      <Center>
        <Text>No items found</Text>
      </Center>
    );
  }

  const someProducts = products.slice(0, 12);

  return (
    <SimpleGrid
      p={{
        base: 0,
        md: 2,
        lg: 4,
      }}
      columns={{
        base: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
      spacing={8}
    >
      {someProducts.map((product) => (
        <Product key={product.id} {...products[0]} />
      ))}
    </SimpleGrid>
  );
};

export default ProductsComponent;
