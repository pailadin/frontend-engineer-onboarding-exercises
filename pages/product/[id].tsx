import Layout from '@components/Layout';
import Component from '@modules/ProductComponent';
import { useRouter } from 'next/router';
import { FC } from 'react';

const ProductModule: FC = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id) return null; // This happens first render?

  return (
    <Layout>
      <Component id={String(id)} />
    </Layout>
  );
};

export default ProductModule;
