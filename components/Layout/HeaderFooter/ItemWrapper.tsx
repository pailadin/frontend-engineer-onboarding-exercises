import { Center, Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { FC, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  href?: string;
  [x: string]: unknown;
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
