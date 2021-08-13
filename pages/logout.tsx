import { useApolloClient } from '@apollo/client';
import Redirect from '@components/Redirect';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import { FC } from 'react';

const Logout: FC = () => {
  const client = useApolloClient();
  const dispatch = useDispatch();

  const logout = (): void => {
    void dispatch(clearUser());
    void client.resetStore();
  };

  return <Redirect url="/login" extraActions={logout} />;
};

export default Logout;
