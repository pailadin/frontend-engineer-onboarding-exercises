import Layout from '@components/Layout';
import UserId from '@components/UserId';
import { ProductEditComponent as Component } from '@modules/ProductComponent';
import { useRouter } from 'next/router';
import { FC, ReactElement } from 'react';

const ProductEditModule: FC = () => {
  const router = useRouter();
  const { id: productId } = router.query;

  if (!productId) return null;

  return (
    <Layout>
      <UserId render={({ userId }): ReactElement => <Component userId={userId} productId={String(productId)} />} />
    </Layout>
  );
};

export default ProductEditModule;
