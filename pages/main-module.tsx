import Layout from '@components/Layout';
import ModuleComponent from '@modules/ModuleComponent';
import { FC } from 'react';

const MainModule: FC = () => (
  <Layout>
    <div>
      Example for pages - modules directory relationship. <ModuleComponent />
    </div>
  </Layout>
);

export default MainModule;
