import { Center, Flex, FlexProps } from '@chakra-ui/react';
import Link from '@components/LinkOptional';
import { FC } from 'react';

interface Props extends FlexProps {
  href?: string;
}

const ItemWrapper: FC<Props> = ({ href, children, ...rest }) => (
  <Flex {...rest}>
    <Link href={href}>
      <Center>{children}</Center>
    </Link>
  </Flex>
);

export default ItemWrapper;
