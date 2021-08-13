import Layout from '@components/Layout';
import UserId from '@components/UserId';
import Component from '@modules/ProductComponent';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';

const ProductModule: FC = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  if (!productId) return null; // This happens first render?

  return (
    <Layout>
      <UserId render={({ userId }): ReactElement => <Component userId={userId} productId={String(productId)} />} />
    </Layout>
  );
};

export default ProductModule;
