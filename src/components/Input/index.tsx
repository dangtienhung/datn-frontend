import { UseFormRegister } from 'react-hook-form';

type NameInput = 'password' | 'account' | 'username' | 'confirmpassword' | any;

type Props = {
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
  name?: NameInput;
  typeInput?: string;
  register?: UseFormRegister<any>;
  error?: string;
};

const Input = ({ placeholder, type, prefix, name, typeInput, register, error }: Props) => {
  return (
    <div className="flex items-center gap-x-3 flex-col">
      {prefix && prefix}
      <input
        className={`p-0 ${
          type === 'auth' &&
          'border-transparent border border-b-[#d6cdbc] text-sm outline-none py-[10px] w-full'
        } 
        ${
          type === 'search' &&
          ' w-[500px] bg-[#fbfbfb] h-[32px] text-[14px] rounded-e-2xl focus:outline-none border-none'
        }`}
        autoComplete="off"
        placeholder={placeholder && placeholder}
        type={typeInput}
        {...register?.(name)}
        name={name}
      />
      {error && <span className="text-red-500 text-[13px]">{error}</span>}
    </div>
  );
};

export default Input;
