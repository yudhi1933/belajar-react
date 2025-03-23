import React from 'react';

function Card({ children, className = '', ...props }) {
  return (
    <div 
      className={`rounded-lg border bg-white shadow-sm ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '', ...props }) {
  return (
    <div 
      className={`flex flex-col space-y-1.5 p-4 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({ children, className = '', ...props }) {
  return (
    <h3 
      className={`text-xl font-semibold ${className}`} 
      {...props}
    >
      {children}
    </h3>
  );
}

export function CardContent({ children, className = '', ...props }) {
  return (
    <div 
      className={`p-4 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export function CardFooter({ children, className = '', ...props }) {
  return (
    <div 
      className={`flex items-center p-4 ${className}`} 
      {...props}
    >
      {children}
    </div>
  );
}

export default Card;

