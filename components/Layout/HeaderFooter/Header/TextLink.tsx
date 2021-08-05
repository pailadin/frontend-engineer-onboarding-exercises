import { Center, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  children: string;
  href: string;
  rest?: unknown;
}

const TextLink: FC<Props> = ({ children, href, ...rest }) => {
  const { pathname } = useRouter();

  const isCurrentRoute = pathname === href;

  return (
    <Flex
      cursor="pointer"
      borderBottomWidth="3px"
      borderBottomStyle="solid"
      borderBottomColor={isCurrentRoute ? 'purple.600' : 'transparent'}
    >
      <NextLink href={href}>
        <Center>
          <Text fontWeight={isCurrentRoute ? 'bold' : 'normal'} {...rest}>
            {children}
          </Text>
        </Center>
      </NextLink>
    </Flex>
  );
};

export default TextLink;
