type Props = {
  placeholder?: string;
  type?: 'auth' | 'search';
};

const Input = ({ placeholder, type }: Props) => {
  return (
    <input
      className={`
      ${
        type === 'auth' && 'p-0 border-transparent border border-b-[#d6cdbc]   w-[260px] py-[10px]'
      } 
      ${type === 'search' && 'w-full'}
      outline-none text-sm 
      `}
      autoComplete="off"
      placeholder={placeholder && placeholder}
    />
  );
};

export default Input;
