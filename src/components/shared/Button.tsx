import React from 'react';

interface ButtonProps {
  type: 'submit' | 'button' | 'reset';
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  variant?: 'default' | 'add' | 'addOpen' | 'cancel' | 'remove' | 'save';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type,
  onClick,
  disabled,
  className,
  variant = 'default',
  children,
  icon,
}) => {
  const variantStyles = {
    default: 'text-black',
    add: 'text-grey flex items-center cursor-pointer',
    addOpen:
      'bg-[#DC4C3E] text-white hover:bg-[#C43D2F] px-5 py-2 rounded cursor-pointer',
    cancel:
      'bg-[#F5F5F5] text-gray-600 border border-transparent bg-transparent p-1 rounded cursor-pointer px-5 py-2',
    remove:
      'bg-[#F5F5F5] text-gray-600 border border-transparent bg-transparent p-1 rounded cursor-pointer px-5 py-2',
    save: 'bg-[#DC4C3E] text-white hover:bg-[#C43D2F] px-5 py-2 rounded cursor-pointer',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded ${variantStyles[variant]} ${className}`}
    >
      {icon && <span className='mr-2'>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
