import { ApolloQueryResult, OperationVariables } from '@apollo/client';
import { Center, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Product from './ProductItem';

interface Owner {
  id: string;
}
interface Product {
  id: string;
  name: string;
  image?: string;
  description: string;
  owner: Owner;
}

interface Props {
  products: Array<Product>;
  currentUserId?: string | null;
  // Originally was passing refetch to the delete button,
  // but there are better ways to do this:
  refetch?: (variables?: Partial<OperationVariables> | undefined) => Promise<ApolloQueryResult<unknown>>;
}

const ProductList: FC<Props> = ({ products, currentUserId, refetch }) => {
  if (products.length <= 0) {
    return (
      <Center flexGrow={1}>
        <Text>No items found</Text>
      </Center>
    );
  }

  return (
    <SimpleGrid
      m={{
        base: 0,
        md: 2,
        lg: 4,
      }}
      columns={{
        base: 1,
        md: 2,
        lg: 3,
        xl: 4,
      }}
      spacing={8}
    >
      {products.map((product) => (
        <Product
          key={product.id}
          isCurrentUserOwner={currentUserId === product.owner.id}
          {...product}
          refetch={refetch}
        />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
