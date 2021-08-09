import { Center, Flex } from '@chakra-ui/react';
import NextLink from 'next/link';
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
        <NextLink href={href}>
          <Center>{children}</Center>
        </NextLink>
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
