import React from 'react';

export function InputA({ 
  className = '', 
  type = 'text', 
  ...props 
}) {
  return (
    <input
      type={type}
      className={`
        w-full 
        px-3 
        py-2 
        border 
        rounded-md 
        focus:outline-none 
        focus:ring-2 
        focus:ring-blue-500 
        focus:border-transparent
        ${className}
      `}
      {...props}
    />
  );
}

export default InputA