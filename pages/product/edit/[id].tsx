import Layout from '@components/Layout';
import { ProductEditComponent as Component } from '@modules/ProductComponent';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ProductEditModule: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null;

  return (
    <Layout>
      <Component id={String(id)} />
    </Layout>
  );
};

export default ProductEditModule;
