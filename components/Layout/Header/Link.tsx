import { Center, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { FC } from 'react';

interface Props {
  children: string;
  href: string;
}

const HeaderLink: FC<Props> = ({ children, href }) => {
  const { pathname } = useRouter();

  const isCurrentRoute = pathname === href;

  return (
    <Flex cursor="pointer" borderBottom={`4px solid ${isCurrentRoute ? 'red' : 'transparent'}`}>
      <NextLink href={href}>
        <Center>
          <Text fontWeight="bold">{children}</Text>
        </Center>
      </NextLink>
    </Flex>
  );
};

export default HeaderLink;
