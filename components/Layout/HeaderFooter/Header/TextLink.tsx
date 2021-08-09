import { Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { FC } from 'react';
import ItemWrapper from '../ItemWrapper';

interface Props {
  children: string;
  href: string;
  rest?: unknown;
}

const TextLink: FC<Props> = ({ children, href, ...rest }) => {
  const { pathname } = useRouter();

  const isCurrentRoute = pathname === href;

  return (
    <ItemWrapper
      cursor="pointer"
      borderBottomWidth="3px"
      borderBottomStyle="solid"
      borderBottomColor={isCurrentRoute ? 'purple.600' : 'transparent'}
      href={href}
    >
      <Text fontWeight={isCurrentRoute ? 'bold' : 'normal'} {...rest}>
        {children}
      </Text>
    </ItemWrapper>
  );
};

export default TextLink;
