import { useField, FieldHookConfig } from 'formik';
import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label?: string;
} & FieldHookConfig<string>;

export const DateInput: React.FC<Props> = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  const [dateInputValue, setDateInputValue] = useState(
    field.value ? new Date(field.value) : null
  );

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <DatePicker
          selected={dateInputValue}
          onChange={(date) => {
            setDateInputValue(date ? new Date(date) : null);
            helpers.setValue(
              date
                ? new Date(
                    date.getTime() - date.getTimezoneOffset() * 60000
                  ).toISOString()
                : ''
            );
          }}
          className={
            !!meta.error && dateInputValue
              ? 'block w-full rounded-md border-red-300 shadow-sm focus:border-red-500 focus:ring-red-500 sm:text-sm bg-red-100'
              : !meta.error && dateInputValue
              ? 'block w-full rounded-md border-green-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm bg-green-100'
              : 'block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm'
          }
        />

        {meta.error ? <div className="text-red-500">{meta.error}</div> : null}
      </div>
    </div>
  );
};
