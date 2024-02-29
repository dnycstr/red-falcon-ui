import { useState, createContext, useContext } from 'react';

interface SecurityModel {
  accessToken: string;
}

const TestContext = createContext({} as SecurityModel);

export const ContextDemo = () => {
  const [accessToken, setName] = useState('Some Ecrypted Key');

  return (
    <>
      <TestContext.Provider value={{ accessToken: accessToken }}>
        <div>Context Demo</div>
        <ComponentOne />
      </TestContext.Provider>
    </>
  );
};

const ComponentOne = () => {
  return (
    <>
      <div>One </div>
      <ComponentTwo />
    </>
  );
};

const ComponentTwo = () => {
  const context = useContext(TestContext);

  return (
    <>
      <div>Two : {context.accessToken}</div>
    </>
  );
};
