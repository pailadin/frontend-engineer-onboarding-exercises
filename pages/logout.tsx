import Redirect from '@components/Redirect';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import { FC } from 'react';

const Logout: FC = () => {
  const dispatch = useDispatch();

  const logout = async (): Promise<unknown> => {
    dispatch(clearUser());

    return;
  };

  return <Redirect url="/login" extraActions={logout} />;
};

export default Logout;
