import Layout from '@components/Layout';
import { SignupComponent as Component } from '@modules/LoginSignupComponent';
import { FC } from 'react';

const SignupModule: FC = () => (
  <Layout hideFooter={true}>
    <Component />
  </Layout>
);

export default SignupModule;
