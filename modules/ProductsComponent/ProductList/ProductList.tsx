import { Center, SimpleGrid, Text } from '@chakra-ui/react';
import { FC } from 'react';
import Item from './Item';

interface Item {
  id: number;
  name: string;
  image?: string;
  description: string;
}

interface Props {
  products: Array<Item>;
}

const ProductList: FC<Props> = ({ products }) => {
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
        <Item key={product.id} {...product} />
      ))}
    </SimpleGrid>
  );
};

export default ProductList;
