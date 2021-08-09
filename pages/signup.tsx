import Layout from '@components/Layout';
import Component from '@modules/SignupComponent';
import { FC } from 'react';

const SignupModule: FC = () => (
  <Layout hideFooter={true}>
    <Component />
  </Layout>
);

export default SignupModule;
