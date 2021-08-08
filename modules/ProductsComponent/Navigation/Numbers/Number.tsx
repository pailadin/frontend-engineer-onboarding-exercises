import { Text } from '@chakra-ui/react';
import { FC } from 'react';

interface Props {
  page: number;
  currentPage: number;
}

const NavigationNumber: FC<Props> = ({ page, currentPage }) => {
  return (
    <Text pl={2} pr={2} fontWeight={currentPage === page ? 'bold' : 'normal'}>
      {page}
    </Text>
  );
};

export default NavigationNumber;
