import Layout from '@components/Layout';
import Component from '@modules/LoginComponent';
import { FC } from 'react';

const LoginModule: FC = () => (
  <Layout hideFooter={true}>
    <Component />
  </Layout>
);

export default LoginModule;
