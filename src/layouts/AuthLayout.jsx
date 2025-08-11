import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;