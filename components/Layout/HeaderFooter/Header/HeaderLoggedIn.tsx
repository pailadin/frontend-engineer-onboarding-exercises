import { Circle, Icon, Image } from '@chakra-ui/react';
import React, { FC } from 'react';
import { FaRegBell as IconNotification } from 'react-icons/fa';
import ItemWrapper from '../ItemWrapper';
import ButtonLink from './ButtonLink';

const HeaderLoggedIn: FC = () => (
  <>
    <ItemWrapper>
      <Icon as={IconNotification} w={6} h={6} />
    </ItemWrapper>

    <ItemWrapper>
      <Circle>
        <Image src="/default-profile-image.jpg" rounded="full" maxHeight={12} border="2px solid black" />
      </Circle>
    </ItemWrapper>

    <ButtonLink href="/logout">Logout</ButtonLink>
  </>
);

export default HeaderLoggedIn;
