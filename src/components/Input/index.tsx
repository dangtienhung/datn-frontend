type Props = {
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
  inputType?: 'text' | 'email' | 'password' | 'number';
};

const Input = ({ placeholder, type, prefix, inputType }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      {prefix && prefix}
      <input
        type={inputType}
        className={`p-0 mb-1 !outline-none ${
          type === 'auth' &&
          'border-transparent border border-b-[#d6cdbc] text-sm outline-none   py-[10px] w-full'
        } 
        ${
          type === 'search' &&
          ' w-[500px] bg-[#fbfbfb] h-[32px] text-[14px] rounded-e-2xl focus:outline-none border-none'
        }`}
        autoComplete="off"
        placeholder={placeholder && placeholder}
      />
    </div>
  );
};

export default Input;
