import { Center, Spinner } from '@chakra-ui/react';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeProductData, getProductFetchStatus, getProducts } from '@store/productSlice';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

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

  return <Center>TODO show {products.length} item(s) here</Center>;
};

export default ProductsComponent;
