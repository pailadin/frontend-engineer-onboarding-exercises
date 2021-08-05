import { Center, Flex, Icon, Link } from '@chakra-ui/react';
import React, { FC } from 'react';

interface Props {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: any;
}

const FooterIcon: FC<Props> = ({ href, as }) => {
  return (
    <Flex>
      <Center>
        <Link href={href} isExternal={true}>
          <Icon as={as} color="gray.400" />
        </Link>
      </Center>
    </Flex>
  );
};

export default FooterIcon;
