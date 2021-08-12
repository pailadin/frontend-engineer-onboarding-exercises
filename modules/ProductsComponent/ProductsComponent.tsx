import { useQuery } from '@apollo/client';
import { Center, Divider, Flex, Text } from '@chakra-ui/react';
import Loading from '@components/Loading';
import { GET_PRODUCTS, GET_PRODUCTS_AND_USER } from '@constants/graphql/queries';
import { checkIfLoggedIn } from '@store/userSlice';
import { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import AddProductButton from './AddProductButton';
import Navigation from './Navigation';
import ProductList from './ProductList';

const ITEMS_PER_PAGE = 12;

const ProductsComponent: FC = () => {
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, error, data } = useQuery(isLoggedIn ? GET_PRODUCTS_AND_USER : GET_PRODUCTS, {
    fetchPolicy: 'cache-and-network',
  });

  const [currentPage, setCurrentPage] = useState(1); // Reminder: starts at ONE

  if (loading) {
    return <Loading />;
  }

  const products = data.products.edges.map((edge) => edge.node);
  const userId = (isLoggedIn && data?.me?.id) || null;

  /* eslint-enable @typescript-eslint/no-unnecessary-condition */

  // TODO Handle error properly
  if (error) {
    return (
      <Center>
        <Text>An error occurred</Text>
      </Center>
    );
  }

  const numberOfProducts = Math.max(0, data.products.pageInfo.totalCount); // probably unnecessary check;
  const lastPage = Math.ceil(numberOfProducts / ITEMS_PER_PAGE);

  const goToPage = (page: number): number => {
    const newPage = Math.max(1, Math.min(lastPage, page));
    setCurrentPage(newPage);
    return newPage;
  };

  const productsForThisPage = products.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <Flex mt={20} mb={8} w="100%" direction="column">
      <Flex width="100%" direction="column">
        <Flex justifyContent="space-between">
          <Text fontSize="3xl" fontWeight="bold">
            Products
          </Text>

          {isLoggedIn && <AddProductButton />}
        </Flex>

        <Divider mt={4} mb={8} />
      </Flex>

      <Flex flexGrow={1} w="100%" direction="column" alignSelf="center">
        <ProductList products={productsForThisPage} currentUserId={userId} />
      </Flex>

      <Flex width="100%" direction="column">
        <Divider mt={8} />
        <Navigation currentPage={currentPage} goToPage={goToPage} numberOfProducts={numberOfProducts} />
      </Flex>
    </Flex>
  );
};

export default ProductsComponent;
