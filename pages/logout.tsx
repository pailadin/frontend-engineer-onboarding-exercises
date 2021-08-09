import { Center, Text } from '@chakra-ui/react';
import Layout from '@components/Layout';
import { useAppDispatch as useDispatch } from '@store/hooks';
import { clearUser } from '@store/userSlice';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const Logout: FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    dispatch(clearUser());
    void router.push('/products');
  });

  return (
    <Layout hideFooter={true}>
      <Center>
        <Text>Logging out...</Text>
      </Center>
    </Layout>
  );
};

export default Logout;
