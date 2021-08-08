import { Box, Center, Divider, Spinner, Text } from '@chakra-ui/react';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeProductData, getProductFetchStatus, getProducts } from '@store/productSlice';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import ProductList from './ProductList';

const ITEMS_PER_PAGE = 12;

const ProductsComponent: FC = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1); // Reminder: starts at ONE

  useEffect(() => {
    void dispatch(getFakeProductData({}));
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

  const numberOfProducts = Math.max(0, products.length); // probably unnecessary check;
  const lastPage = Math.ceil(numberOfProducts / ITEMS_PER_PAGE);

  const goToPage = (page: number): number => {
    const newPage = Math.max(1, Math.min(lastPage, page));
    setCurrentPage(newPage);
    return newPage;
  };

  const productsForThisPage = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Box mt={20} mb={8}>
      <Text fontSize="3xl" fontWeight="bold">
        Products
      </Text>

      <Divider mt={4} mb={8} />

      <ProductList products={productsForThisPage} />

      <Divider mt={8} />

      <Navigation currentPage={currentPage} goToPage={goToPage} numberOfProducts={numberOfProducts} />
    </Box>
  );
};

export default ProductsComponent;
