import { Button, HStack, Icon, Text } from '@chakra-ui/react';
import { FC } from 'react';
import { FaShoppingCart as IconCart } from 'react-icons/fa';

interface Props {
  [x: string]: unknown;
}

const TEXT_COLOR = 'purple.500';
const BG_COLOR = 'purple.50';

// Icon is a child so we can use "currentColor" (https://github.com/chakra-ui/chakra-ui/issues/363)
const AddToCartButton: FC<Props> = (props) => {
  return (
    <Button
      bgColor={BG_COLOR}
      color={TEXT_COLOR}
      _hover={{
        border: `4px solid ${BG_COLOR}`,
        bgColor: TEXT_COLOR,
        color: BG_COLOR,
      }}
      {...props}
    >
      <HStack>
        <Icon as={IconCart} w={3} h={3} color="currentColor" />

        <Text fontWeight="bold">Add to cart</Text>
      </HStack>
    </Button>
  );
};

export default AddToCartButton;
