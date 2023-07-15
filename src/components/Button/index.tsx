import React from 'react';

type Props = {
  type?: 'auth' | 'checkout' | 'keep-buying';
  size: 'small' | 'medium' | 'large';
  shape?: 'square' | 'round' | 'circle';
  style?: string;
  children: React.ReactNode;
};

const Button = ({ children, type, size, shape, style }: Props) => {
  return (
    <button
      className={`bg-[#d8b979] text-sm  uppercase 
      ${type === 'auth' || type === 'checkout' || !type ? 'text-white' : ''}
      ${type === 'checkout' && 'bg-[#ee4d2d]'}
      ${type === 'keep-buying' && 'border border-[#d8b979] bg-[#ffffff] text-[#d8b979]'}
      ${size === 'small' && 'py-[6px] px-[15px] '}
      ${size === 'large' && 'w-full font-semibold px-[5px] py-[10px] mt-6 btn-shadow '}
      ${size === 'medium' && 'py-2 px-[18px]'}
      ${shape === 'square' && 'rounded-none'}
      ${shape === 'round' && 'rounded'}
      ${shape === 'circle' && 'rounded-[30px]'}
      ${style && style}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
