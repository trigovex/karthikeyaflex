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
          onError={(e) => {
            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
          }}
        />
      </div>
    )
  );
};

export default ImagePreviewModal;
