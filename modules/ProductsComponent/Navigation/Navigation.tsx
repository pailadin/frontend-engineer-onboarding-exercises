import { Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const DEFAULT_ITEMS_PER_PAGE = 12;

interface Props {
  currentPage: number;
  goToPage: (page: number) => number;
  numberOfProducts: number;
  itemsPerPage?: number;
}

const ProductsNavigation: FC<Props> = ({
  currentPage,
  goToPage,
  numberOfProducts,
  itemsPerPage = DEFAULT_ITEMS_PER_PAGE,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const lastPage = Math.ceil(numberOfProducts / itemsPerPage);

  return (
    <Flex justifyContent="space-between">
      <Text onClick={(): number => goToPage(currentPage - 1)}>Prev</Text>
      <Text onClick={(): number => goToPage(currentPage + 1)}>Next</Text>
    </Flex>
  );
};

export default ProductsNavigation;
