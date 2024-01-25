/* eslint-disable prettier/prettier */

interface InputProps {
    label?: string;
    fieldname?: string;
    onChange: (value: string, fieldname: string) => void;
}


export const CustomInput: React.FC<InputProps> = ({label,onChange, fieldname}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange(value,fieldname || ''); 
    };

    return (
        <div>
            <label className="m-2 display: inline-block" id={label}>{label}</label>
            <input onChange={handleChange}
                type="text"
                className="m-2 block rounded"
                id={fieldname}
                placeholder=" " />
        </div >
    )
}
