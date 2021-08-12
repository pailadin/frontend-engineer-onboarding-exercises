import { Center, Flex, FlexProps } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

interface Props extends FlexProps {
  href?: string;
}

const ItemWrapper: FC<Props> = ({ href, children, ...rest }) => {
  if (href) {
    return (
      <Flex {...rest}>
        <Link href={href}>
          <Center>{children}</Center>
        </Link>
      </Flex>
    );
  }

  return (
    <Flex {...rest}>
      <Center>{children}</Center>
    </Flex>
  );
};

export default ItemWrapper;
