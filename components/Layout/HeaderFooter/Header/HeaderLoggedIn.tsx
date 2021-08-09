import { Center, Circle, Flex, Icon, Image } from '@chakra-ui/react';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import React, { FC } from 'react';
import { FaRegBell as IconNotification } from 'react-icons/fa';
import ButtonLink from './ButtonLink';

const HeaderLoggedIn: FC = () => {
  const dispatch = useDispatch();
  const logout = (): void => void dispatch(clearUser());

  return (
    <>
      <Flex>
        <Center>
          <Icon as={IconNotification} boxSize="1.5em" />
        </Center>
      </Flex>

      <Flex>
        <Center>
          <Circle>
            <Image src="/default-profile-image.jpg" rounded="full" maxHeight={12} border="black solid 2px" />
          </Circle>
        </Center>
      </Flex>

      <ButtonLink href="/products" onClick={logout}>
        Logout
      </ButtonLink>
    </>
  );
};

export default HeaderLoggedIn;
