import { Center, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Item from './Item';

interface Owner {
  id: string;
}
interface Item {
  id: string | number;
  name: string;
  image?: string;
  description: string;
  owner: Owner;
}

interface Props {
  products: Array<Item>;
  currentUserId?: string | null;
}

const ProductList: FC<Props> = ({ products, currentUserId }) => {
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
        <Item key={product.id} currentUserId={currentUserId} ownerUserId={product.owner.id} {...product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
