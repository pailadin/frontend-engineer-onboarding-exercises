import { Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { FaEllipsisV as IconEllipsis } from 'react-icons/fa';

interface Props {
  id: string;
}

// TODO is having a menu per button a good idea?
const ProductMenuButton: FC<Props> = ({ id }) => {
  const router = useRouter();

  const stopPropagation = (event): void => event.stopPropagation();

  const editProduct = (event): void => {
    stopPropagation(event);

    void router.push(`/product/edit/${id}`);
  };

  const deleteProduct = (event): void => {
    // TODO functionality
    stopPropagation(event);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        rounded="full"
        bgColor="gray.50"
        position="absolute"
        top={2}
        right={2}
        size="sm"
        icon={<Icon as={IconEllipsis} />}
        aria-label="Open edit/delete menu"
        onClick={stopPropagation}
      />

      <MenuList>
        <MenuItem onClick={editProduct}>Edit</MenuItem>

        <MenuItem onClick={deleteProduct}>Delete</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default ProductMenuButton;
