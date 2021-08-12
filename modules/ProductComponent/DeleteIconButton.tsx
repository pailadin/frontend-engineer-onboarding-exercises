import { Icon, IconButton } from '@chakra-ui/react';
import DeleteButton from '@components/DeleteButton';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaTrashAlt as IconDelete } from 'react-icons/fa';

interface Props {
  id: string;
}

const ProductDeleteIconButton: FC<Props> = ({ id }) => {
  const router = useRouter();

  const onDeleted = (): void => {
    void router.push('/products');
  };

  return (
    <DeleteButton
      id={id}
      as={IconButton}
      colorScheme="gray"
      icon={<Icon as={IconDelete} h={3} w={3} />}
      onCompleted={onDeleted}
      aria-label="Delete Button"
    />
  );
};

export default ProductDeleteIconButton;
