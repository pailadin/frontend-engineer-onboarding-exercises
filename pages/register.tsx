import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

const OldSignupPage: FC = () => {
  const router = useRouter();

  useEffect(() => {
    void router.push('/signup');
  }, [router]);

  return null;
};

export default OldSignupPage;
