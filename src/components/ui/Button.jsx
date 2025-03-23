import React from 'react';

function Button({ 
  children, 
  variant = 'default', 
  size = 'default', 
  className = '', 
  ...props 
}) {
  const variantClasses = {
    default: 'bg-blue-500 text-white hover:bg-blue-600',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-100',
    destructive: 'bg-red-500 text-white hover:bg-red-600'
  };

  const sizeClasses = {
    default: 'px-4 py-2 text-base',
    sm: 'px-3 py-1 text-sm',
    icon: 'p-2 w-10 h-10 flex items-center justify-center'
  };

  return (
    <button
      className={`
        rounded-md 
        transition-colors 
        focus:outline-none 
        focus:ring-2 
        focus:ring-offset-2 
        disabled:opacity-50
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
function ButtonA() {
  return (
    <h1>Button A</h1>
  )
}
export default Button;
export {ButtonA}