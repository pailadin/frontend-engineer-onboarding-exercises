import { Center, Flex, Text } from '@chakra-ui/react';
import { FC } from 'react';

const ACTIVE_COLOR = 'purple.600';

interface Props {
  page: number;
  currentPage: number;
  goToPage: (page: number) => number;
}

const NavigationNumber: FC<Props> = ({ page, currentPage, goToPage }) => {
  const isCurrentPage = page === currentPage;

  const onClick = (): number => goToPage(page);

  return (
    <Flex
      cursor="pointer"
      borderTopWidth="3px"
      borderTopStyle="solid"
      borderTopColor={isCurrentPage ? ACTIVE_COLOR : 'transparent'}
      onClick={onClick}
      userSelect="none"
      pl={4}
      pr={4}
    >
      <Center>
        <Text color={isCurrentPage ? ACTIVE_COLOR : 'black'} fontWeight={isCurrentPage ? 'bold' : 'normal'}>
          {page}
        </Text>
      </Center>
    </Flex>
  );
};

export default NavigationNumber;
