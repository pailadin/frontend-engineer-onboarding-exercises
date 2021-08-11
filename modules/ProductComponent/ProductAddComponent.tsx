import { useQuery } from '@apollo/client';
import { useToast } from '@chakra-ui/react';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { PRODUCT_ADD } from '@constants/graphql/mutations';
import { GET_CURRENT_USER } from '@constants/graphql/queries';
import { CREATE as VALIDATION_SCHEMA } from '@constants/validation/product';
import { checkIfLoggedIn } from '@store/userSlice';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProductAddEdit from './ProductAddEdit';

const ProductAdd: FC = () => {
  const toast = useToast();
  const isLoggedIn = useSelector(checkIfLoggedIn);

  const { loading, error, data } = useQuery(GET_CURRENT_USER, { skip: !isLoggedIn });

  const userId = data?.me?.id || null;
  const shouldShowError = !isLoggedIn || (!loading && (error || !userId));

  useEffect(() => {
    if (shouldShowError) {
      toast({
        title: 'Error!',
        description: 'You are not authorized to do this action',
        status: 'error',
        isClosable: true,
      });
    }
  }, [shouldShowError, toast]);

  if (shouldShowError) return <Redirect />;
  if (loading) return <Loading />;

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
