import React from 'react';

const Loader = ({ text = 'Memuat...' }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 mb-4"></div>
      <p className="text-white text-lg">{text}</p>
    </div>
  );
};

export default Loader;