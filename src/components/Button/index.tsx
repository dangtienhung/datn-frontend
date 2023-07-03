import React from 'react';

type Props = {
  type?: 'auth';
  size: 'small' | 'medidum' | 'large';
  children: React.ReactNode;
};

const Button = ({ children, type, size }: Props) => {
  return (
    <button
      className={` text-sm  ${type === 'auth' && 'bg-[#d8b979] '} text-white  rounded-[30px] 
      ${size === 'small' && 'py-[6px] px-[15px]'}
      ${size === 'large' && 'uppercase font-semibold px-[5px] py-[10px] mt-6 btn-shadow'}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
