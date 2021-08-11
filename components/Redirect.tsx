import { useRouter } from 'next/router';
import { FC, ReactElement, useEffect } from 'react';

interface Props {
  url?: string;
  children?: ReactElement | null;
  method?: string;
  extraActions?: () => unknown;
  dontActuallyRedirect?: boolean; // sometimes useful while debugging
}

const Redirect: FC<Props> = ({
  url = '/products',
  children = null,
  method = 'push',
  extraActions,
  dontActuallyRedirect = false,
}) => {
  const router = useRouter();

  useEffect(() => {
    if (extraActions) {
      extraActions();
    }

    if (!dontActuallyRedirect) {
      void router[method](url);
    }
  });

  return children;
};

export default Redirect;
