import { useField, FieldHookConfig } from 'formik';
import tw from 'tailwind-styled-components';

interface BaseInputProps {
  hasError: boolean;
}

const BaseInput = tw.input<BaseInputProps>`
block w-full rounded-md shadow-sm  bg-white sm:text-sm
${(props) =>
  !props.hasError &&
  !props.value &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  !props.hasError &&
  !!props.value &&
  'border-green-300 focus:border-green-500 focus:ring-green-500 bg-green-100'} 
${(props) =>
  props.hasError &&
  !props.value &&
  'border-gray-300 focus:border-primary-500 focus:ring-primary-500'} 
${(props) =>
  props.hasError &&
  !!props.value &&
  'border-red-300 focus:border-red-500 focus:ring-red-500 bg-red-100'} 
`;

type Props = {
  label?: string;
  readonly?: boolean;
} & FieldHookConfig<string>;

export const Input: React.FC<Props> = ({ label, readonly, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div className="w-full">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <div className="mt-1">
        <BaseInput
          {...field}
          readOnly={readonly}
          type="text"
          hasError={!!meta.error}
        />
        {meta.error ? <div className="text-red-500">{meta.error}</div> : null}
      </div>
    </div>
  );
};
