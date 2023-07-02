type Props = {
  placeholder?: string;
};

const Input = ({ placeholder }: Props) => {
  return (
    <input
      className="p-0 border-transparent border border-b-[#d6cdbc] text-sm outline-none  w-[260px] py-[10px] "
      autoComplete="off"
      placeholder={placeholder && placeholder}
    />
  );
};

export default Input;
