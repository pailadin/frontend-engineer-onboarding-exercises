import { Flex } from '@chakra-ui/react';
import { FC } from 'react';
import { FaLongArrowAltLeft as ArrowLeftIcon, FaLongArrowAltRight as ArrowRightIcon } from 'react-icons/fa';
import Arrow from './Arrow';

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
      <Arrow
        text="Previous"
        icon={ArrowLeftIcon}
        onClick={(): number => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
        showIconFirst={true}
      />

      <Arrow
        text="Next"
        icon={ArrowRightIcon}
        disabled={currentPage >= lastPage}
        onClick={(): number => goToPage(currentPage + 1)}
      />
    </Flex>
  );
};

export default ProductsNavigation;
