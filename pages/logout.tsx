import Redirect from '@components/Redirect';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import { FC } from 'react';

const Logout: FC = () => {
  const dispatch = useDispatch();

  return <Redirect url="/login" extraActions={(): void => void dispatch(clearUser())} />;
};

export default Logout;
