import { useMutation } from '@apollo/client';
import {
  Button,
  Icon,
  IconButton,
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
import { useRouter } from 'next/router';
import { FC } from 'react';
import { FaTrashAlt as IconDelete } from 'react-icons/fa';

interface Props {
  id: string | number;
}

const ProductDeleteButtonModal: FC<Props> = ({ id }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const router = useRouter();
  const toast = useToast();

  const [mutate, { loading }] = useMutation(PRODUCT_DELETE, {
    onCompleted: () => {
      onClose();
      void router.push('/products');

      toast({
        title: 'Product deleted',
        status: 'success',
        isClosable: true,
      });
    },
    onError: (e) => {
      toast({
        title: 'Error!',
        description: e.message || String(e),
        status: 'error',
        isClosable: true,
      });
    },
  });

  const deleteProduct = (): void => void mutate({ variables: { input: { id } } });

  return (
    <>
      <IconButton
        colorScheme="gray"
        icon={<Icon as={IconDelete} h={3} w={3} />}
        aria-label="Delete Button"
        onClick={onOpen}
      />

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

            <Button colorScheme="red" disabled={loading} onClick={deleteProduct}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductDeleteButtonModal;
