import React from 'react';

const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 mt-0 flex justify-center items-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full space-y-4">
        <h2 className="text-lg font-semibold text-center ">{title}</h2>
        <p className="mt-2 text-start text-gray-500">{message}</p>
        <div className="mt-4 flex justify-end">
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
    
  );
};

export default ConfirmationModal;
