export interface Person {
  firstName: string;
  lastName: string;
  phone: string;
}

interface ReactPageTwoProps {
  name?: string;
  age: number;
  person: Person;
  callback: (parentName: string) => void;
}

export const ReactPageTwo: React.FC<ReactPageTwoProps> = ({
  name,
  age,
  person,
  callback,
}) => {
  return (
    <>
      Child: {name == undefined ? `no value` : name} - {age} -{' '}
      {person.firstName}
      <button onClick={() => callback('Name from Child')}>
        Update Parent Name
      </button>
    </>
  );
};
