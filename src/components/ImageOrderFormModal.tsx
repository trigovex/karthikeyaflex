import React from 'react';
import { X } from 'lucide-react';

const ImageOrderFormModal = ({ showImageOrderForm, setShowImageOrderForm, formData, setFormData, handleSubmitOrder, selectedImageData, qualityOptions, categories }) => {
  return (
    showImageOrderForm && selectedImageData && (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto border border-white/10 backdrop-blur-sm">
          <div className="p-8">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-3xl font-bold text-white tracking-tight">Place Order</h3>
              <button
                onClick={() => setShowImageOrderForm(false)}
                className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-8 rounded-xl overflow-hidden shadow-xl ring-4 ring-white/20">
              <img
                src={selectedImageData.url}
                alt={selectedImageData.title}
                className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5YTNhZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBhdmFpbGFibGU8L3RleHQ+Cjwvc3ZnPg==';
                }}
              />
            </div>
            <form onSubmit={handleSubmitOrder} className="space-y-6">
              <div className="space-y-1">
                <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter your name"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Mobile Number</label>
                <input
                  type="tel"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  placeholder="Enter mobile number"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Category Type</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white shadow-inner transition-all duration-300 hover:bg-white/15"
                  value={formData.categoryType}
                  onChange={(e) => setFormData({ ...formData, categoryType: e.target.value })}
                >
                  <option value="" className="text-gray-800">Select category</option>
                  {categories.map((cat) => (
                    <option key={cat.title} value={cat.title} className="text-gray-800">
                      {cat.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Quality</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white shadow-inner transition-all duration-300 hover:bg-white/15"
                  value={formData.quality}
                  onChange={(e) => setFormData({ ...formData, quality: e.target.value })}
                >
                  <option value="" className="text-gray-800">Select quality</option>
                  {qualityOptions.map((option) => (
                    <option key={option.value} value={option.value} className="text-gray-800">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Quantity</label>
                <input
                  type="number"
                  min="1"
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white placeholder-white/40 shadow-inner transition-all duration-300 hover:bg-white/15"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-white text-blue-600 font-semibold py-3.5 px-4 rounded-xl hover:bg-white/90 transition-all duration-300 mt-8 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 focus:ring-4 focus:ring-white/30"
              >
                Submit Order
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  );
};

export default ImageOrderFormModal;
