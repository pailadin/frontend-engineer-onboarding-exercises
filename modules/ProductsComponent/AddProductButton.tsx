import { Button } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { FaPlus as IconAdd } from 'react-icons/fa';

const AddProductButton: FC = () => (
  <Link href="/product/add">
    <Button leftIcon={<IconAdd />} colorScheme="purple">
      Add Product
    </Button>
  </Link>
);

export default AddProductButton;
