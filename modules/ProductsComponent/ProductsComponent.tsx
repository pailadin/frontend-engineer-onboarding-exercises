import { useQuery } from '@apollo/client';
import { Center, Divider, Flex, Text } from '@chakra-ui/react';
import Loading from '@components/Loading';
import { GET_PRODUCTS, GET_PRODUCTS_AND_USER } from '@constants/graphql/queries';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { getFakeProductData, getProductFetchStatus, getProducts } from '@store/productSlice';
import { checkIfLoggedIn } from '@store/userSlice';
import { FC, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Navigation from './Navigation';
import ProductList from './ProductList';

const ITEMS_PER_PAGE = 12;
// Originally missed we had an GraphQL API, ended up making a thing in pages/api.
// Letting myself toggle it on when it might be useful for debugging for now.
// TODO Remove when no longer useful:
const USE_FAKE_API_INSTEAD_OF_GRAPHQL =
  String(process.env.NEXT_PUBLIC_USE_FAKE_API_INSTEAD_OF_GRAPHQL_IN_PRODUCTS).toUpperCase() === 'TRUE';

const ProductsComponent: FC = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading: loadingFlagFromGraphQL, error, data } = useQuery(isLoggedIn ? GET_PRODUCTS_AND_USER : GET_PRODUCTS);
  const status = useSelector(getProductFetchStatus);
  const loadingFlagFromRedux = status === 'loading';
  const productsFromRedux = useSelector(getProducts);

  const loading = USE_FAKE_API_INSTEAD_OF_GRAPHQL ? loadingFlagFromRedux : loadingFlagFromGraphQL;

  const [currentPage, setCurrentPage] = useState(1); // Reminder: starts at ONE

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (USE_FAKE_API_INSTEAD_OF_GRAPHQL) {
      void dispatch(getFakeProductData({}));
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  const products = USE_FAKE_API_INSTEAD_OF_GRAPHQL ? productsFromRedux : data.products.edges.map((edge) => edge.node);
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

  const numberOfProducts = Math.max(0, products.length); // probably unnecessary check;
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
        <Text fontSize="3xl" fontWeight="bold">
          Products
        </Text>

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
