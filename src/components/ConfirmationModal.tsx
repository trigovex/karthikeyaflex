import React from 'react';
import { CheckCircle } from 'lucide-react';

const ConfirmationModal = ({ showConfirmation, handleConfirmationClose }) => {
  return (
    showConfirmation && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h3>
          <p className="text-gray-600 mb-6">
            Your order has been successfully placed. We'll contact you shortly to confirm the details.
          </p>
          <button
            onClick={handleConfirmationClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors duration-300"
          >
            Close
          </button>
        </div>
      </div>
    )
  );
};

export default ConfirmationModal;
