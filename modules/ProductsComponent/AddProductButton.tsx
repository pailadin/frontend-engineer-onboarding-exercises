import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaPlus as IconAdd } from 'react-icons/fa';

const AddProductButton: FC = () => {
  const router = useRouter();

  const onClick = (): void => {
    void router.push({
      pathname: 'product/add',
    });
  };

  return (
    <Button onClick={onClick} leftIcon={<IconAdd />} colorScheme="purple">
      Add Product
    </Button>
  );
};

export default AddProductButton;
