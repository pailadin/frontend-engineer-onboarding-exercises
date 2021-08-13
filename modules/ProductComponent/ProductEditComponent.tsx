import { useToast } from '@chakra-ui/react';
import Loading from '@components/Loading';
import Redirect from '@components/Redirect';
import { PRODUCT_EDIT } from '@constants/graphql/mutations';
import { GET_PRODUCTS } from '@constants/graphql/queries';
import { EDIT as VALIDATION_SCHEMA } from '@constants/validation/product';
import { useQuery } from '@utils/api';
import { FC, useEffect } from 'react';
import ProductAddEdit from './ProductAddEdit';

interface Props {
  productId: string;
  userId: string | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ProductEdit: FC<Props> = ({ productId, userId }) => {
  const toast = useToast();

  const { loading, inCache, error, data } = useQuery(GET_PRODUCTS, {
    skip: !userId,
    variables: {
      filter: {
        id: {
          eq: productId,
        },
      },
    },
  });

  const product = data?.products?.edges?.[0]?.node;
  const ownerUserId = product?.owner?.id;
  const isCurrentUserOwner = userId === ownerUserId;

  const shouldShowError = !userId || (!loading && (error || !userId || !isCurrentUserOwner));

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
  if (loading && !inCache) return <Loading />;

  return (
    <ProductAddEdit
      mutation={PRODUCT_EDIT}
      dataPath="updateProduct"
      successTitleSuffix="updated"
      validationSchema={VALIDATION_SCHEMA}
      breadcrumbs="Edit product"
      defaultValues={product}
      mapFormInputToGraphQL={(input): Record<string, unknown> => ({
        id: product.id,
        body: {
          name: input.name || product.name,
          description: input.description || product.description,
        },
      })}
    />
  );
};

export default ProductEdit;
