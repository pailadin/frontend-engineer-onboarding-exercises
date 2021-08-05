import { Button, Center, Flex, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FC } from 'react';

interface Props {
  children: string;
  href: string;
  [x: string]: unknown;
}

const ButtonLink: FC<Props> = ({ children, href, ...rest }) => {
  return (
    <Flex>
      <NextLink href={href}>
        <Center>
          <Button variant="outline" {...rest}>
            <Text fontWeight="bold">{children}</Text>
          </Button>
        </Center>
      </NextLink>
    </Flex>
  );
};

export default ButtonLink;
