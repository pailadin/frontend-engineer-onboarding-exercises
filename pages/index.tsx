import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const Home: FC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push('/login');
  }, [router]);

  return null;
};

export default Home;
