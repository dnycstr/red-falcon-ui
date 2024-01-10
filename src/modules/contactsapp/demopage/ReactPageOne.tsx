import { useEffect, useState } from 'react';

import { Person, ReactPageTwo } from './ReactPageTwo';

export const ReactPageOne: React.FC = () => {
  //const [state, setState] = useState(0);
  const [parentName, setParentName] = useState('');

  const setToJohn = () => {
    setParentName('John');
  };

  const setToPeter = () => {
    setParentName('Peter');
  };

  // Called only once
  useEffect(() => {
    console.log('Set the first name');
    setToPeter();
    setToJohn();
  }, []);

  useEffect(() => {
    console.log('the firstname has changed');
  }, [parentName]);

  const newPerson: Person = {
    firstName: 'John',
    lastName: 'Doe',
    phone: '012354',
  };

  return (
    <>
      <div>Parent: {parentName}</div>
      <div>
        Child Render:
        <ReactPageTwo
          person={newPerson}
          age={2}
          callback={(value) => setParentName(value)}
        />
      </div>
    </>
  );
};
