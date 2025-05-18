import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getCategories, getSubCategories, getCardsBySubCategory, sendEmail } from '../helpers/api_routes';
import { X } from 'lucide-react';
 

interface Category {
  Id: string;
  CategoryName: string;
  CategoryFile: string;
}

interface PropCategory {
  title: string;
  image: string;
}

interface SubCategory {
  Id: string;
  SubCategoryName: string;
  SubCategoryFile: string;
}

interface Card {
  CardName: string;
  CardFile: string;
  CardPrice: string;
}

interface OrderFormData {
  name: string;
  mobile_number: string;
}

interface CategorySectionProps {
  categories?: PropCategory[];
  handleCategoryClick?: (category: any) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ categories: propCategories, handleCategoryClick }) => {
  const [apiCategories, setApiCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    // Only fetch categories once
    if (hasLoaded) return;
    
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const response = await getCategories();
        console.log("getCategories", response);
        setApiCategories(response || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
        setHasLoaded(true);
      }
    }
    fetchCategories();
  }, [hasLoaded]);

  // Use API categories if available, otherwise use prop categories
  const displayCategories = useMemo(() => {
    return apiCategories.length > 0 
      ? apiCategories.map(cat => ({ 
          id: cat.Id,
          name: cat.CategoryName, 
          image: cat.CategoryFile,
          isApiCategory: true
        }))
      : propCategories?.map(cat => ({ 
          id: '',
          name: cat.title, 
          image: cat.image,
          isApiCategory: false
        })) || [];
  }, [apiCategories, propCategories]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4" style={{ marginTop: '4rem' }}>
        {/* Main title for the section */}
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of designs for every occasion
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          /* Map through each category */
          displayCategories.map((category, index) => (
            <div key={index} className="mb-16">
              {/* Category title */}
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto"></div>
              </div>

              {/* Category cards container */}
              <CategoryCards 
                key={`${category.id}-${category.name}`}
                category={category} 
                handleCategoryClick={handleCategoryClick} 
              />
            </div>
          ))
        )}
      </div>
    </section>
  );
};

interface CategoryCardsProps {
  category: {
    id: string;
    name: string;
    image: string;
    isApiCategory: boolean;
  };
  handleCategoryClick?: (category: any) => void;
}

function CategoryCards({ category, handleCategoryClick }: CategoryCardsProps) {
  const [subCategories, setSubCategories] = useState<SubCategory[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [showCardsModal, setShowCardsModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoadedSubcategories, setHasLoadedSubcategories] = useState(false);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [orderFormData, setOrderFormData] = useState<OrderFormData>({
    name: '',
    mobile_number: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  // Memoize the category ID to prevent unnecessary re-renders
  const categoryId = useMemo(() => category.id, [category.id]);
  
  useEffect(() => {
    // Reset the loaded flag when category changes
    if (categoryId !== category.id) {
      setHasLoadedSubcategories(false);
    }
  }, [categoryId, category.id]);

  useEffect(() => {
    // Skip if we've already loaded subcategories for this category or if it's not an API category
    if (hasLoadedSubcategories || !category.isApiCategory || !category.id) {
      return;
    }
    
    async function fetchSubCategories() {
      setIsLoading(true);
      try {
        const response = await getSubCategories(category.id);
        console.log("sub data for category:", category.name, response);
        setSubCategories(response || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setIsLoading(false);
        setHasLoadedSubcategories(true);
      }
    }
    
    fetchSubCategories();
  }, [category.id, category.isApiCategory, category.name, hasLoadedSubcategories]);

  const handleSubCategoryClick = useCallback(async (subCategoryName: string, categoryName: string) => {
    try {
      setIsLoading(true);
      const cardResponse = await getCardsBySubCategory(subCategoryName, categoryName);
      console.log("card data", cardResponse);
      setCards(cardResponse || []);
      setSelectedSubCategory(subCategoryName);
      setShowCardsModal(true);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCategoryCardClick = useCallback(() => {
    if (handleCategoryClick && !category.isApiCategory) {
      handleCategoryClick(category);
    }
  }, [category, handleCategoryClick]);

  const handleOrderClick = useCallback((card: Card, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(card);
    setShowOrderForm(true);
    // Reset form data and states
    setOrderFormData({ name: '', mobile_number: '' });
    setOrderSuccess(false);
    setOrderError(null);
  }, []);

  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedCard) return;
    
    setIsSubmitting(true);
    setOrderError(null);
    
    try {
      // Send order data to the API
      const response = await sendEmail({
        name: orderFormData.name,
        mobile_number: orderFormData.mobile_number,
        image_url: selectedCard.CardFile
      });
      
      console.log("Order submitted successfully:", response.data);
      setOrderSuccess(true);
      
      // Close the form after 2 seconds
      setTimeout(() => {
        setShowOrderForm(false);
        setSelectedCard(null);
      }, 2000);
      
    } catch (error) {
      console.error("Error submitting order:", error);
      setOrderError("Failed to submit your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeOrderForm = () => {
    setShowOrderForm(false);
    setSelectedCard(null);
  };

return (
    <>
      {/* If it's a prop category, show the category card */}
      {!category.isApiCategory && (
        <div 
          className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          onClick={handleCategoryCardClick}
        >
          <div className="aspect-[4/3] relative">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 text-center">
              {category.name}
            </h3>
          </div>
        </div>
      )}

      {/* Display subcategories in a grid with enhanced animations */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {subCategories.map((subCategory, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl animate-fadeIn"
            style={{ animationDelay: `${index * 100}ms` }}
            onClick={() => handleSubCategoryClick(subCategory.SubCategoryName, category.name)}
          >
            <div className="aspect-[1/0.8] relative">
              <img
                src={subCategory.SubCategoryFile}
                alt={subCategory.SubCategoryName}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent to-transparent group-hover:from-black/50 transition-all duration-300" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-white/90 px-4 py-2 rounded-full text-sm font-semibold transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  View Details
                </span>
              </div>
            </div>
            <div className="p-3 text-center bg-white">
              <h3 className="text-lg font-semibold text-gray-800">
                {subCategory.SubCategoryName}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {/* Enhanced Loading Animation */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
          <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-2xl flex flex-col items-center space-y-4">
            <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-800 font-semibold text-lg animate-pulse">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Redesigned Cards Modal with Enhanced UI */}
      {showCardsModal && cards && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center overflow-y-auto animate-fadeIn">
          <div 
            className="relative bg-gray-50 w-full min-h-screen animate-slideUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Enhanced Header with Back Button */}
            <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-md shadow-md mb-[240px] md:mb-0">
              <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center">
                  <button 
                    onClick={() => setShowCardsModal(false)} 
                    className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded-lg transition-colors duration-300"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="font-medium">Back</span>
                  </button>
                  <h3 className="text-2xl font-bold text-gray-800 ml-6">{selectedSubCategory}</h3>
                </div>
              </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 py-8">
              {cards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-xl">No items available for this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {cards.map((card, idx) => (
                    <div 
                      key={idx} 
                      className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                    >
                      <div className="aspect-[16/10] relative">
                        <img
                          src={card.CardFile}
                          alt={card.CardName}
                          className="w-full h-full object-contain bg-gray-50"
                        />
                        {category.name === "Hoardings" && (
                          <div className="absolute top-4 right-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                              card?.isAvailable ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
                            }`}>
                              {card?.isAvailable ? 'Available' : `Available from ${card?.AvailableDate}`}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <h4 className="text-xl font-bold text-gray-800 mb-2">{card.CardName}</h4>
                        {category.name === "Hoardings" && (
                          <div className="mb-4">
                            <p className="text-sm text-gray-600">Area: {card?.CardDetails?.Area}</p>
                            <p className="text-sm text-gray-600">Location: {card?.CardDetails?.Location}</p>
                          </div>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            {/* <span className="text-sm text-gray-500">Price</span> */}
                            {/* <span className="text-2xl font-bold text-indigo-600">₹{card.CardPrice}</span> */}
                          </div>
                          <button 
                            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-medium transform transition-all duration-300 hover:bg-indigo-700 hover:scale-105 active:scale-95 flex items-center space-x-2"
                            onClick={(e) => handleOrderClick(card, e)}
                          >
                            <span>Book Now</span>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md my-8 mx-auto transform transition-all duration-500 animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={closeOrderForm} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md z-10 transition-all duration-300 hover:rotate-90"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-8">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-gray-800 mb-2">Book Your Space</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto"></div>
              </div>

              <div className="mb-8 bg-gray-50 rounded-xl p-4">
                <div className="flex items-start space-x-4">
                  <div className="w-32 h-32 flex-shrink-0">
                    <img 
                      src={selectedCard.CardFile} 
                      alt={selectedCard.CardName}
                      className="w-full h-full object-cover rounded-lg shadow-md" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800 text-lg mb-1">{selectedCard.CardName}</h4>
                    <p className="text-indigo-600 font-medium text-2xl mb-2">₹{selectedCard.CardPrice}</p>
                    {category.name === "Hoardings" && (
                      <div className="text-sm text-gray-600">
                        <p>Area: {selectedCard?.CardDetails?.Area}</p>
                        <p>Location: {selectedCard?.CardDetails?.Location}</p>
                        <p className={selectedCard?.isAvailable ? 'text-green-600' : 'text-orange-600'}>
                          {selectedCard?.isAvailable ? 'Available Now' : `Available from ${selectedCard?.AvailableDate}`}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {orderSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-fadeIn">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h4 className="text-xl font-bold text-green-800 mb-2">Booking Successful!</h4>
                  <p className="text-green-600">We'll contact you shortly with further details.</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit} className="space-y-6">
                  {orderError && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-700 text-sm animate-shake">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{orderError}</span>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={orderFormData.name}
                      onChange={handleOrderFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile_number"
                      name="mobile_number"
                      value={orderFormData.mobile_number}
                      onChange={handleOrderFormChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                      placeholder="Enter your mobile number"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center space-x-2"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <span>Confirm Booking</span>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategorySection;
