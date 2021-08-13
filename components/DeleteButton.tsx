import {
  Box,
  BoxProps,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { PRODUCT_DELETE } from '@constants/graphql/mutations';
import { GET_PRODUCTS } from '@constants/graphql/queries';
import { useMutation } from '@utils/api';
import { FC } from 'react';

interface Props extends Omit<BoxProps, 'onClick'> {
  id: string;
  setLoading?: (loading: boolean) => void;
  onCompleted?: (...args: unknown[]) => unknown;
  onError?: (...args: unknown[]) => unknown;
  onClick?: (event: unknown, deleteProduct: () => void) => unknown;
  // TODO Probably is a correct way I can pass an "as" to <Button>
  // and have props that are not in <Button> not cause TS to complain:
  [x: string]: unknown;
}

const DeleteButton: FC<Props> = ({
  id,
  as = Button,
  onCompleted = (): null => null,
  onError = (): null => null,
  onClick: onClickProp,
  ...rest
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [mutate, { loading }] = useMutation(PRODUCT_DELETE, {
    refetchQueries: [GET_PRODUCTS, 'products'],
    onCompleted: (data) => {
      onClose();
      onCompleted(data);

      toast({
        title: 'Product deleted',
        status: 'success',
        isClosable: true,
      });
    },
    onError: (e) => {
      onError(onError);

      toast({
        title: 'Error!',
        description: e.message || String(e),
        status: 'error',
        isClosable: true,
      });
    },
  });

  const deleteProduct = (): void => void mutate({ variables: { input: { id } } });

  const onClickOpenButton = (event): void => {
    event.stopPropagation();

    onOpen();
  };

  const onClickConfirmDelete = (event): void => {
    if (onClickProp) {
      onClickProp(event, deleteProduct);
    } else {
      deleteProduct();
    }
  };

  return (
    <>
      <Box as={as} {...rest} onClick={onClickOpenButton} />

      <Modal isOpen={isOpen} onClose={onClose} closeOnEsc={!loading} closeOnOverlayClick={!loading}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Delete product</ModalHeader>
          <ModalCloseButton disabled={loading} />

          <ModalBody>
            <Text>Are you sure you want to delete this product? You can't undo this action afterwards.</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="gray" mr={3} onClick={onClose} autoFocus disabled={loading}>
              Close
            </Button>

            <Button colorScheme="red" onClick={onClickConfirmDelete} disabled={loading}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DeleteButton;
