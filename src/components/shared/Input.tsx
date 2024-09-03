import React from 'react';
import { UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  type: 'text' | 'password' | 'email' | 'search';
  placeholder?: string;
  value?: string;
  name?: Path<T>;
  register?: UseFormRegister<T>;
  error?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = <T extends FieldValues>({
  type,
  placeholder,
  value,
  name,
  register,
  error,
  onChange,
}: InputProps<T>) => {
  const variantClasses: { [key in InputProps<T>['type']]: string } = {
    text: 'border-gray-300 text-gray-700 bg-transparent outline-none',
    password:
      'border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500',
    email:
      'border-gray-300 text-gray-700 focus:border-blue-500 focus:ring-blue-500',
    search:
      'border-gray-300 text-gray-700 bg-white rounded-md shadow-sm px-3 py-2 focus:border-blue-500 focus:ring-0 outline-none mt-4',
  };

  return (
    <div className='mb-4 relative flex items-center h-full'>
      {error && (
        <p className='absolute top-6 left-0 text-red-500 text-sm'>{error}</p>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        className={`${variantClasses[type]} ${
          error ? 'border-red-500' : ''
        } rounded-md`}
        {...(name && register ? register(name) : {})}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
