import Layout from '@components/Layout';
import UserId from '@components/UserId';
import Component from '@modules/ProductsComponent';
import { FC, ReactElement } from 'react';

const ProductsModule: FC = () => (
  <Layout>
    <UserId render={({ userId }): ReactElement => <Component userId={userId} />} />
  </Layout>
);

export default ProductsModule;
