import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect } from 'react';

interface Props {
  url?: string;
  children?: ReactElement | null;
  method?: string;
  extraActions?: () => unknown;
}

const Redirect: FC<Props> = ({ url = '/products', children = null, method = 'push', extraActions }) => {
  const router = useRouter();

  useEffect(() => {
    if (extraActions) {
      extraActions();
    }

    void router[method](url);
  });

  return children;
};

export default Redirect;
