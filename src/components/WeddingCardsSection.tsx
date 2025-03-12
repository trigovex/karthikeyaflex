import React, { useState } from "react";
import wedding1 from "../Images/Wed-1.jpg";
import wedding2 from "../Images/Wed-2.jpg";

const categories = {
  Hindu: {
    image: "https://static.vecteezy.com/system/resources/previews/035/918/050/large_2x/ai-generated-beautiful-lord-ganesh-ai-generated-free-photo.jpg",
    cards: [
      { image: wedding1, size: "5x7" },
      { image: wedding2, size: "6x8" },
    ],
  },
  Muslim: {
    image: "https://static.vecteezy.com/system/resources/previews/036/717/796/large_2x/ai-generated-a-islamic-masjid-on-a-blue-background-free-photo.jpg",
    cards: [
      { image: "https://aarambhonline.com/wp-content/uploads/2024/11/SPSL02_1.jpg", size: "5x7" },
    ],
  },
  Christian: {
    image: "https://www.christiantechjobs.io/_next/image?url=https%3A%2F%2Ftgzvwoczsnauenygpsth.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fblog-images%2Fchristian-tech-trends-2024.png%3Ft%3D2024-03-06T15%253A30%253A55.865Z&w=2048&q=75",
    cards: [
      { image: "https://aarambhonline.com/wp-content/uploads/2024/11/SPSL02_1.jpg", size: "6x8" },
    ],
  },
};

const WeddingCardsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    size: "5x7",
    comments: "",
  });

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle "View" button inside category
  const handleViewClick = (image: string) => {
    setSelectedImage(image);
  };

  // Handle "Order" button
  const handleOrderClick = () => {
    setShowOrderForm(true);
  };

  // Handle form change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOrderForm(false);
    setOrderSuccess(true);
  };

  // Close full-screen category view
  const closeCategoryView = () => {
    setSelectedCategory(null);
    setShowOrderForm(false);
    setOrderSuccess(false);
  };

  return (
    <div className="bg-gray-100 py-10 px-4">
      <div className="text-left mb-12">
        <h2 className="text-4xl text-center font-bold text-gray-800">Wedding Cards</h2>
      </div>

      {/* Category Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.keys(categories).map((category) => (
          <div key={category} className="cursor-pointer bg-white rounded-lg shadow-md overflow-hidden">
            <img
              src={categories[category].image}
              alt={category}
              className="w-full h-56 object-cover"
            />
            <div className="p-4 flex justify-between items-center">
              <p className="font-bold text-lg">{category} Wedding Cards</p>
              <button
                onClick={() => handleCategoryClick(category)}
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Category Full-Screen View */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-white flex flex-col items-center p-4 overflow-auto">
          <div className="w-full flex justify-between items-center px-4">
            <h2 className="text-3xl font-bold">{selectedCategory} Wedding Cards</h2>
            <span
              onClick={closeCategoryView}
              className="text-red-600 text-xl cursor-pointer"
            >
              ✖
            </span>
          </div>

          {/* Cards Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-4">
            {categories[selectedCategory].cards.map((card, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg shadow-md">
                <img
                  src={card.image}
                  alt={`Card ${index + 1}`}
                  className="w-full h-auto rounded-lg cursor-pointer"
                  onClick={() => handleViewClick(card.image)}
                />
                <div className="flex justify-between mt-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                    onClick={() => handleViewClick(card.image)}
                  >
                    View
                  </button>
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                    onClick={handleOrderClick}
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Image Preview */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center">
          <div className="relative">
            <img src={selectedImage} alt="Preview" className="max-w-full max-h-[80vh] rounded-lg" />
            <span
              onClick={() => setSelectedImage(null)}
              className="absolute top-2 right-2 text-red-600 text-3xl cursor-pointer"
            >
              ✖
            </span>
          </div>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <form onSubmit={handleOrderSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                required
                className="w-full p-2 mb-3 border rounded"
                onChange={handleInputChange}
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className="w-full p-2 mb-3 border rounded"
                onChange={handleInputChange}
              />
              <select name="size" className="w-full p-2 mb-3 border rounded" onChange={handleInputChange}>
                <option value="5x7">5x7</option>
                <option value="6x7">6x7</option>
                <option value="6x8">6x8</option>
              </select>
              <textarea
                name="comments"
                placeholder="Other comments"
                className="w-full p-2 mb-3 border rounded"
                onChange={handleInputChange}
              />
              <button type="submit" className="w-full bg-green-500 text-white p-2 rounded">
                Submit Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Success Message */}
      {orderSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-bold">Order Placed Successfully!</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeddingCardsSection;
