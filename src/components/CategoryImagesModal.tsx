import React from 'react';
import { X, Eye, ShoppingCart } from 'lucide-react';

const CategoryImagesModal = ({ selectedCategory, setSelectedCategory, categories, handleViewImage, handleOrderButtonClick }) => {
  return (
    selectedCategory && (
      <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
        <div className="min-h-screen px-4 py-8">
          <div className="relative max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedCategory} Designs</h3>
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative aspect-w-3 aspect-h-4 rounded-lg overflow-hidden bg-gray-100"
                >
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                    crossOrigin="anonymous"
                    onError={(e) => {
                      e.currentTarget.src = '/placeholder-image.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                    <div className="p-3 w-full">
                      <h4 className="text-white text-sm font-medium truncate mb-2">{category.title}</h4>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewImage(category.image)}
                          className="flex-1 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          View
                        </button>
                        <button
                          onClick={handleOrderButtonClick}
                          className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                        >
                          <ShoppingCart className="w-3.5 h-3.5" />
                          Order
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CategoryImagesModal;
