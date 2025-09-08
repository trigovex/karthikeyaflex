import React, { useState } from "react";
import { Eye, ShoppingCart } from "lucide-react";

interface Card { image: string; size?: string }
interface Category { key: string; image: string; cards: Card[] }
interface WeddingCardsSectionProps { categories: Record<string, Category> }

const WeddingCardsSection: React.FC<WeddingCardsSectionProps> = ({ categories }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [orderDetails, setOrderDetails] = useState({
    name: "",
    phone: "",
    size: "5x7",
  });

  // Handle category selection
  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // Handle "View" button inside category
  const handleViewClick = (image: string) => {
    window.open(image, "_blank");
  };

  // Handle "Order" button
  const handleOrderClick = () => {
    setShowOrderForm(true);
  };

  // Handle form change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setOrderDetails({ ...orderDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowOrderForm(false);
    setOrderSuccess(true);

    // Hide success message after 3 seconds
    setTimeout(() => {
      setOrderSuccess(false);
    }, 3000);
  };

  // Close category view
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
                <div className="flex justify-between gap-2 mt-4">
                  <button
                    onClick={() => handleViewClick(card.image)}
                    className="flex-1 bg-white hover:bg-gray-100 text-gray-800 text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <Eye className="w-3.5 h-3.5" /> View
                  </button>
                  <button
                    onClick={handleOrderClick}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-1.5 px-3 rounded-md transition-colors duration-300 flex items-center justify-center gap-1.5 shadow-md hover:shadow-lg"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" /> Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Order Form */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-bold mb-4">Order Details</h3>
            <form onSubmit={handleOrderSubmit}>
              <input type="text" name="name" placeholder="Your Name" required className="w-full p-2 mb-3 border rounded" onChange={handleInputChange} />
              <input type="tel" name="phone" placeholder="Phone Number" required className="w-full p-2 mb-3 border rounded" onChange={handleInputChange} />
              <select name="size" className="w-full p-2 mb-3 border rounded" onChange={handleInputChange}>
                <option value="5x7">5x7</option>
                <option value="5x5">5x5</option>
                <option value="9x8">9x8</option>
              </select>
              <button type="submit" className="w-full bg-indigo-600 text-white p-2 rounded">Submit Order</button>
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
