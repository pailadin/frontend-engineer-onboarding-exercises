import Layout from '@components/Layout';
import UserId from '@components/UserId';
import { ProductAddComponent as Component } from '@modules/ProductComponent';
import { FC, ReactElement } from 'react';

const ProductAddModule: FC = () => (
  <Layout>
    <UserId render={({ userId }): ReactElement => <Component userId={userId} />} />
  </Layout>
);

export default ProductAddModule;
