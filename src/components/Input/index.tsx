type Props = {
  placeholder?: string;
  prefix?: React.ReactNode;
  type?: string;
};

const Input = ({ placeholder, type, prefix }: Props) => {
  return (
    <>
      {prefix && prefix}
      <input
        className={`p-0 border-transparent border border-b-[#d6cdbc] text-sm outline-none  w-[260px] py-[10px] 
        ${
          type === 'search' &&
          'w-[500px] bg-[#fbfbfb] h-[32px] text-[14px] rounded-e-2xl focus:outline-none border-none'
        }`}
        autoComplete="off"
        placeholder={placeholder && placeholder}
      />
    </>
  );
};

export default Input;
