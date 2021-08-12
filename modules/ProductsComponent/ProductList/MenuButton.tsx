import { Box, Icon, IconButton, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import DeleteButton from '@components/DeleteButton';
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

  const onClickEdit = (event): void => {
    stopPropagation(event);

    void router.push(`/product/edit/${id}`);
  };

  const onClickDelete = (event, deleteProduct): void => {
    stopPropagation(event);

    deleteProduct();
  };

  // Note: Do not remove <Box> = https://github.com/chakra-ui/chakra-ui/issues/3440#issuecomment-851707911
  return (
    <Box>
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

        <MenuList modifiers={{ name: 'eventListeners', options: { scroll: false } }}>
          <MenuItem onClick={onClickEdit}>Edit</MenuItem>

          <DeleteButton id={id} as={MenuItem} onClick={onClickDelete}>
            Delete
          </DeleteButton>
        </MenuList>
      </Menu>
    </Box>
  );
};

export default ProductMenuButton;
