import React from 'react';

interface MessageProps {
  type: 'loading' | 'error' | 'noTodos';
  text: string;
}

const Message: React.FC<MessageProps> = ({ type, text }) => {
  const typeStyles = {
    loading: 'text-xl',
    error: 'text-xl',
    noTodos: 'text-xl',
  };

  return (
    <div
      className={`flex items-center justify-center h-full p-6 text-center text-xl ${typeStyles[type]} text-gray-600`}
    >
      {text}
    </div>
  );
};

export default Message;
