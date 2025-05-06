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
      <div className="container mx-auto px-4" style={{ marginTop: '12rem' }}>
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
          className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          onClick={handleCategoryCardClick}
        >
          <div className="aspect-square relative">
            <img
              src={category.image}
              alt={category.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
              {category.name}
            </h3>
          </div>
        </div>
      )}

      {/* Display subcategories in a grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {subCategories.map((subCategory, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
            onClick={() => handleSubCategoryClick(subCategory.SubCategoryName, category.name)}
          >
            <div className="aspect-square relative">
              <img
                src={subCategory.SubCategoryFile}
                alt={subCategory.SubCategoryName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            </div>
            <div className="p-3">
              <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
                {subCategory.SubCategoryName}
              </h3>
            </div>
          </div>
        ))}
      </div>
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700">Loading...</p>
          </div>
        </div>
      )}
      
      {/* Cards Modal */}
      {showCardsModal && cards && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl my-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button positioned absolutely in the corner */}
            <button 
              onClick={() => setShowCardsModal(false)} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{selectedSubCategory}</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
              </div>
              
              {cards.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No cards available for this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {cards.map((card, idx) => (
                    <div key={idx} className="bg-white rounded-lg border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                      <div className="aspect-square relative">
                        <img
                          src={card.CardFile}
                          alt={card.CardName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-800 mb-2 line-clamp-1">{card.CardName}</h4>
                        <div className="flex justify-between items-center">
                          <span className="text-indigo-600 font-medium text-lg">₹{card.CardPrice}</span>
                          <button 
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded-md text-sm font-medium transition-colors duration-200"
                            onClick={(e) => handleOrderClick(card, e)}
                          >
                            Order
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

      {/* Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-md my-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button 
              onClick={closeOrderForm} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
              disabled={isSubmitting}
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Place Your Order</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto"></div>
              </div>

              {/* Selected Card Preview */}
              <div className="mb-6 flex items-center space-x-4">
                <div className="w-24 h-24 flex-shrink-0">
                  <img 
                    src={selectedCard.CardFile} 
                    alt={selectedCard.CardName}
                    className="w-full h-full object-cover rounded-md" 
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{selectedCard.CardName}</h4>
                  <p className="text-indigo-600 font-medium">₹{selectedCard.CardPrice}</p>
                </div>
              </div>
              
              {orderSuccess ? (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center mb-4">
                  <svg className="w-6 h-6 text-green-500 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <p className="text-green-700">Your order has been placed successfully!</p>
                </div>
              ) : (
                <form onSubmit={handleOrderSubmit}>
                  {orderError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4 text-red-700 text-sm">
                      {orderError}
                    </div>
                  )}
                  
                  <div className="mb-4">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={orderFormData.name}
                      onChange={handleOrderFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your full name"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="mobile_number" className="block text-sm font-medium text-gray-700 mb-1">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      id="mobile_number"
                      name="mobile_number"
                      value={orderFormData.mobile_number}
                      onChange={handleOrderFormChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      placeholder="Enter your mobile number"
                      required
                      pattern="[0-9]{10}"
                      title="Please enter a valid 10-digit mobile number"
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md font-medium transition-colors duration-200 flex items-center justify-center"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      'Place Order'
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
