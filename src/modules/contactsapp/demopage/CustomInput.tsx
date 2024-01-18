import { useState } from 'react';

interface CustomInputProps {
  label: string;
  onChangeHandler: (value: string) => void;
}

// Child Component
export const CustomInput: React.FC<CustomInputProps> = ({
  label,
  onChangeHandler,
}) => {
  const [value, setValue] = useState<string>('');

  //console.log(`Child Input ${label}: ${value}`);

  return (
    <div className="flex flex-col p-2">
      <label> {label}</label>
      <input
        className="w-80"
        type="text"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          onChangeHandler(e.target.value);
        }}
      />
    </div>
  );
};
