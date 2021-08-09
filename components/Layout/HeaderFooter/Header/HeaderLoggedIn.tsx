import { Circle, Icon, Image } from '@chakra-ui/react';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import React, { FC } from 'react';
import { FaRegBell as IconNotification } from 'react-icons/fa';
import ItemWrapper from '../ItemWrapper';
import ButtonLink from './ButtonLink';

const HeaderLoggedIn: FC = () => {
  const dispatch = useDispatch();
  const logout = (): void => void dispatch(clearUser());

  return (
    <>
      <ItemWrapper>
        <Icon as={IconNotification} w={6} h={6} />
      </ItemWrapper>

      <ItemWrapper>
        <Circle>
          <Image src="/default-profile-image.jpg" rounded="full" maxHeight={12} border="2px solid black" />
        </Circle>
      </ItemWrapper>

      <ButtonLink href="/products" onClick={logout}>
        Logout
      </ButtonLink>
    </>
  );
};

export default HeaderLoggedIn;
