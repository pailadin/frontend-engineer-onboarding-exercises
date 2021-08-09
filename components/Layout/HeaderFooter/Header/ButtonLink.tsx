import { Button, Text } from '@chakra-ui/react';
import { FC } from 'react';
import ItemWrapper from '../ItemWrapper';
interface Props {
  children: string;
  href: string;
  [x: string]: unknown;
}

const ButtonLink: FC<Props> = ({ children, href, ...rest }) => {
  return (
    <ItemWrapper href={href}>
      <Button variant="outline" {...rest}>
        <Text fontWeight="bold">{children}</Text>
      </Button>
    </ItemWrapper>
  );
};

export default ButtonLink;
