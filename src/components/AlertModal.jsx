import React from 'react';

const AlertModal = ({ isOpen, onClose, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-10 backdrop-brightness-25">
      <div className="bg-white dark:bg_primary-dark rounded-lg shadow-lg p-6 max-w-md mx-auto text-center">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-4">
          ⚠ Budget Alert
        </h2>
        <p className="text-gray-800 dark:text-gray-200 mb-6">
          {message}
        </p>
        <button
          onClick={onClose}
          className="px-5 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded"
        >
          Got it
        </button>
      </div>
    </div>
  );
};

export default AlertModal;
