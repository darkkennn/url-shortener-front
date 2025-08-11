import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-xl font-bold"
        >
          &times;
        </button>
        {title && <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>}
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;