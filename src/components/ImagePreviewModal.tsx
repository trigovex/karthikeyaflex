import React from 'react';
import { X } from 'lucide-react';

const ImagePreviewModal = ({ selectedImage, setSelectedImage }) => {
  return (
    selectedImage && (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        onClick={() => setSelectedImage(null)}
      >
        <button
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          onClick={() => setSelectedImage(null)}
        >
          <X className="w-8 h-8" />
        </button>
        <img
          src={selectedImage}
          alt="Preview"
          className="max-w-[90%] max-h-[90vh] object-contain"
          onClick={(e) => e.stopPropagation()}
          loading="lazy"
          crossOrigin="anonymous"
          onError={(e) => {
            e.currentTarget.src = '/placeholder-image.jpg';
          }}
        />
      </div>
    )
  );
};

export default ImagePreviewModal;
