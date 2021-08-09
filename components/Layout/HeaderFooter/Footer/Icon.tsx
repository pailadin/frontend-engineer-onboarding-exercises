import { Icon, Link } from '@chakra-ui/react';
import React, { FC } from 'react';
import ItemWrapper from '../ItemWrapper';

interface Props {
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  as: any;
}

const FooterIcon: FC<Props> = ({ href, as }) => {
  return (
    <ItemWrapper>
      <Link href={href} isExternal={true}>
        <Icon as={as} color="gray.400" />
      </Link>
    </ItemWrapper>
  );
};

export default FooterIcon;
