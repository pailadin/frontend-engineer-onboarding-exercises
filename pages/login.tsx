import Layout from '@components/Layout';
import { LoginComponent as Component } from '@modules/LoginSignupComponent';
import { FC } from 'react';

const LoginModule: FC = () => (
  <Layout hideFooter={true}>
    <Component />
  </Layout>
);

export default LoginModule;
