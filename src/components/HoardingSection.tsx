import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react';

const HoardingSection = () => {
  const [selectedHoarding, setSelectedHoarding] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    mobileNumber: '',
    flexSize: '',
  });
  const [showThankYou, setShowThankYou] = useState(false);
  

  const openModal = (hoarding) => {
    setSelectedHoarding(hoarding);
  };

  const closeModal = () => {
    setSelectedHoarding(null);
    setShowOrderForm(false);
  };

  const openOrderForm = () => {
    setShowOrderForm(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form Data:', formData);
    setShowThankYou(true);
    setTimeout(() => {
      setShowThankYou(false);
      closeModal();
    }, 500);
  };

  const hoardings: Array<{ size: string; available: boolean; description: string; flexImages: string[]; image?: string }> = [];

  const handleConfirmationClose = () => {
    setShowThankYou(false);
  };

  return (
    <section className="py-16" style={{ marginTop: "-60px" }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Hoardings</h2>
          <p className="text-gray-700 max-w-2xl mx-auto">
            Explore our various types of hoarding cards available in different sizes.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hoardings.map((hoarding, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
            >
              {hoarding.image && (
                <img
                  src={hoarding.image}
                  alt={`${hoarding.size} Hoarding`}
                  className="w-full h-48 object-cover rounded-t-xl"
                />
              )}
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {hoarding.size}
                  </h3>
                  <span
                    className={`text-xs font-bold px-3 py-1 rounded-full ${
                      hoarding.available ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                    }`}
                  >
                    {hoarding.available ? 'Available' : 'Not Available'}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{hoarding.description}</p>
                <div className="flex space-x-4">
                  <button
                    className="flex-1 text-white px-4 py-2 rounded hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transform transition-transform duration-300 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                    onClick={() => openModal(hoarding)}
                    disabled={!hoarding.available}
                  >
                    View
                  </button>
                  <button
                    className="flex-1 text-white px-4 py-2 rounded hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-opacity-50 transform transition-transform duration-300 bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600"
                    onClick={() => openModal(hoarding)}
                    disabled={!hoarding.available}

                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedHoarding && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 z-50">
          <div className="w-full h-full p-4 overflow-auto relative">
            <button
              className="fixed top-4 right-4 text-white text-xl hover:text-gray-300"
              onClick={closeModal}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            {!showOrderForm ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {selectedHoarding.flexImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Flex Image ${index + 1}`}
                      className="w-full h-auto rounded-lg shadow-md"
                    />
                    <button
                      className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
                      onClick={openOrderForm}
                    >
                      Order
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-6 max-w-md mx-auto relative">
                <button
                  className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Hello Customer</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label className="block text-gray-700">Email ID</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Mobile Number</label>
                    <input
                      type="tel"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700">Flex Size</label>
                    <select
                      name="flexSize"
                      value={formData.flexSize}
                      onChange={handleChange}
                      className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    >
                      <option value="">Select Size</option>
                      <option value="8x4 feet">8x4 feet</option>
                      <option value="12x6 feet">12x6 feet</option>
                      <option value="15x8 feet">15x8 feet</option>
                      <option value="25×12 feet">25×12 feet</option>
                      <option value="30×15 feet">30×15 feet</option>
                      <option value="40×20 feet">40×20 feett</option>
                      <option value="60×30 feet">60×30 feet</option>
                      <option value="80×40 feet">80×40 feet</option>
                      {/* Add more sizes as needed */}
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    Submit Order
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
      {showThankYou && (
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
      )}
    </section>
  );
};

export default HoardingSection;
