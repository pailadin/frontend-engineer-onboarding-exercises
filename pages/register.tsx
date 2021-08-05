import Layout from '@components/Layout';
import Component from '@modules/RegisterComponent';
import { FC } from 'react';

const RegisterModule: FC = () => (
  <Layout hideFooter={true}>
    <Component />
  </Layout>
);

export default RegisterModule;
