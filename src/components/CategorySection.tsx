import React, { useEffect, useState } from 'react';
import { getCategories, getSubCategories, getCardsBySubCategory } from '../helpers/api_routes';
import { X } from 'lucide-react';
const CategorySection = ({ categories, handleCategoryClick }) => {
const [Category, setCategory] = useState(null);

  useEffect(() => {
    async function fetchCategory() {
      const response = await getCategories();
    
      console.log("data", response);
      setCategory(response);
    }
    fetchCategory();
  }, []);
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4" style={{ marginTop: '12rem' }}>
        {Category && (
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{Category[0].CategoryName}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of designs for every occasion
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
        {Category && Category.map((category, index) => (
           <Cards key={index} category={category} handleCategoryClick={handleCategoryClick} />
        ))}
        </div>
      </div>
    </section>
  );
};


function Cards(category, index, handleCategoryClick) {
  const [SubCategory, setSubCategory] = useState(null);
  const [Records, setRecords] = useState(null);
  const [showRecordsModal, setShowRecordsModal] = useState(false);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchSubCategory() {
      console.log("category", category.category);
      const response = await getSubCategories(category.category.Id);

      console.log("sub data", response);
      setSubCategory(response);
    }
    fetchSubCategory();
  }, [category.title]);


  const handleSubCategoryClick = async (sub_category, category_) => {
    try {
      setIsLoading(true);
      const cardResponse = await getCardsBySubCategory(sub_category, category_);
      console.log("card data", cardResponse);
      setRecords(cardResponse);
      setSelectedSubCategory(sub_category);
      setShowRecordsModal(true);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {SubCategory && SubCategory.map((sub_category, index) => (
        <div
          key={index}
          className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
          onClick={() => handleSubCategoryClick(sub_category?.SubCategoryName, category?.category?.CategoryName)}
        >
          <div className="aspect-square relative">
            <img
              src={sub_category?.SubCategoryFile}
              alt={sub_category?.SubCategoryName}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </div>
          <div className="p-3">
            <h3 className="text-sm font-semibold text-gray-800 text-center line-clamp-2">
              {sub_category?.SubCategoryName}
            </h3>
          </div>
        </div>
      ))}
      
      {isLoading && (
        <div className="fixed inset-0 bg-black/30 z-50 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg shadow-lg flex items-center space-x-3">
            <div className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-gray-700">Loading cards...</p>
          </div>
        </div>
      )}
      
      {/* Records Modal */}
      {showRecordsModal && Records && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div 
            className="relative bg-white rounded-xl shadow-2xl w-full max-w-5xl my-8 mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button positioned absolutely in the corner */}
            <button 
              onClick={() => setShowRecordsModal(false)} 
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 shadow-md z-10"
            >
              <X className="w-6 h-6" />
            </button>
            
            <div className="p-6 md:p-8">
              <div className="mb-8">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{selectedSubCategory}</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full"></div>
              </div>
              
              {Records.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No cards available for this category</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {Records.map((card, idx) => (
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
                            onClick={(e) => {
                              e.stopPropagation();
                              // Here you can implement order functionality
                              console.log("Order clicked for card:", card);
                            }}
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
    </>
  );
}

export default CategorySection;
