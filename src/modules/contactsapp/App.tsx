import React from 'react';

//import { ReactPageOne } from './demopage/ReactPageOne';
import { CreateContact } from './demopage/CreateContact';

// import { Outlet } from 'react-router-dom';

// import { Layout } from './pages/Layout/Layout';

const App: React.FC = () => {
  return (
    <>
      <CreateContact />
      {/* <Layout>
        <Outlet />
      </Layout> */}
    </>
  );
};

export default App;
