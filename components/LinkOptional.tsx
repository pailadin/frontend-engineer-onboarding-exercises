import Link from 'next/link';
import { FC, ReactElement } from 'react';

interface Props {
  children: ReactElement;
  href?: string | null;
}

const LinkOptional: FC<Props> = ({ children, href }) => {
  if (href) {
    return <Link href={href}>{children}</Link>;
  }

  return children;
};

export default LinkOptional;
