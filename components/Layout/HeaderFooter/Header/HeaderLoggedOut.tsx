import React, { FC } from 'react';
import ButtonLink from './ButtonLink';

const HeaderLoggedOut: FC = () => (
  <>
    <ButtonLink href="/login">Log in</ButtonLink>

    <ButtonLink href="/signup" variant="solid" colorScheme="purple">
      Sign up
    </ButtonLink>
  </>
);

export default HeaderLoggedOut;
