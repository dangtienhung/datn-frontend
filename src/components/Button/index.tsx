import React from 'react';

type Props = {
  type?: 'auth';
  children: React.ReactNode;
};

const Button = ({ children, type }: Props) => {
  return (
    <button
      className={`btn-shadow text-sm mt-6 ${
        type === 'auth' && 'bg-[#d8b979] '
      } text-white px-[5px] py-[10px] rounded-[30px] uppercase font-semibold`}
    >
      {children}
    </button>
  );
};

export default Button;
