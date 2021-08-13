import { useToast } from '@chakra-ui/react';
import Redirect from '@components/Redirect';
import { PRODUCT_ADD } from '@constants/graphql/mutations';
import { CREATE as VALIDATION_SCHEMA } from '@constants/validation/product';
import { FC, useEffect } from 'react';
import ProductAddEdit from './ProductAddEdit';

interface Props {
  userId: string | null;
}

const ProductAdd: FC<Props> = ({ userId }) => {
  const toast = useToast();

  useEffect(() => {
    if (!userId) {
      toast({
        title: 'Error!',
        description: 'You are not authorized to do this action',
        status: 'error',
        isClosable: true,
      });
    }
  }, [userId, toast]);

  if (!userId) return <Redirect />;

  return (
    <ProductAddEdit
      mutation={PRODUCT_ADD}
      dataPath="createProduct"
      successTitleSuffix="created"
      successDescription="Redirecting to your new product..."
      validationSchema={VALIDATION_SCHEMA}
      breadcrumbs="Add product"
    />
  );
};

export default ProductAdd;
