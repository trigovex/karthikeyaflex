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
    if (hasLoaded) return;
    async function fetchCategories() {
      setIsLoading(true);
      try {
        const response = await getCategories();
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
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">Our Categories</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of designs for every occasion</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          displayCategories.map((category, index) => (
            <div key={index} className="mb-16">
              <div className="text-center mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{category.name}</h3>
                <div className="h-1 w-20 bg-indigo-600 rounded-full mx-auto"></div>
              </div>

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
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState<Card | null>(null);
  const [orderFormData, setOrderFormData] = useState<OrderFormData>({ name: '', mobile_number: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderError, setOrderError] = useState<string | null>(null);

  const categoryId = useMemo(() => category.id, [category.id]);

  useEffect(() => {
    if (categoryId !== category.id) setHasLoadedSubcategories(false);
  }, [categoryId, category.id]);

  useEffect(() => {
    if (hasLoadedSubcategories || !category.isApiCategory || !category.id) return;
    async function fetchSubCategories() {
      setIsLoading(true);
      try {
        const response = await getSubCategories(category.id);
        setSubCategories(response || []);
      } catch (error) {
        console.error("Error fetching subcategories:", error);
      } finally {
        setIsLoading(false);
        setHasLoadedSubcategories(true);
      }
    }
    fetchSubCategories();
  }, [category.id, category.isApiCategory, hasLoadedSubcategories]);

  const handleSubCategoryClick = useCallback(async (subCategoryName: string, categoryName: string) => {
    try {
      setIsLoading(true);
      const cardResponse = await getCardsBySubCategory(subCategoryName, categoryName);
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
    if (handleCategoryClick && !category.isApiCategory) handleCategoryClick(category);
  }, [category, handleCategoryClick]);

  const handleOrderClick = useCallback((card: Card, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCard(card);
    setShowOrderForm(true);
    setOrderFormData({ name: '', mobile_number: '' });
    setOrderSuccess(false);
    setOrderError(null);
  }, []);

  const handleOrderFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setOrderFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCard) return;
    setIsSubmitting(true);
    setOrderError(null);
    try {
      await sendEmail({ name: orderFormData.name, mobile_number: orderFormData.mobile_number, image_url: selectedCard.CardFile });
      setOrderSuccess(true);
      setTimeout(() => { setShowOrderForm(false); setSelectedCard(null); }, 2000);
    } catch (error) {
      setOrderError("Failed to submit your order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const closeOrderForm = () => { setShowOrderForm(false); setSelectedCard(null); };
  const closePreviewModal = () => { setShowPreviewModal(false); setSelectedCard(null); };

  return (
    <>
      {/* Non-API Category Card */}
      {!category.isApiCategory && (
        <div
          className="group relative bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
          onClick={handleCategoryCardClick}
        >
          <div className="aspect-[4/3] relative">
            <img src={category.image} alt={category.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </div>
          <div className="p-4">
            <h3 className="text-xl font-bold text-gray-800 text-center">{category.name}</h3>
          </div>
        </div>
      )}

      {/* Subcategories Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {subCategories.map((subCategory, index) => (
          <div
            key={index}
            className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-gray-100 to-white"
            style={{ animationDelay: `${index * 120}ms` }}
            onClick={() => handleSubCategoryClick(subCategory.SubCategoryName, category.name)}
          >
            <div className="relative aspect-[1/0.8] overflow-hidden">
              <img src={subCategory.SubCategoryFile || ""} alt={subCategory.SubCategoryName} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"/>
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-[-100%] w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent transform skew-x-12 group-hover:animate-shine" />
              </div>
            </div>
            <div className="p-3 text-center bg-white/80 backdrop-blur-md border-t">
              <h3 className="text-base font-bold text-gray-800 group-hover:text-indigo-600 transition-colors duration-500">{subCategory.SubCategoryName}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Cards Modal */}
      {/* Cards Modal */}
{showCardsModal && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 pb-10 overflow-y-auto backdrop-blur-sm">
    <div
      className="relative w-full max-w-6xl mx-auto p-6 bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-200"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-5 py-4 rounded-2xl bg-white/90 backdrop-blur-md shadow-md border border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900">Items in {selectedSubCategory}</h2>
        <button
          onClick={() => setShowCardsModal(false)}
          className="text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cards.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-400 text-xl italic">No items available for this category</p>
          </div>
        ) : (
          cards.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col overflow-hidden rounded-3xl bg-white/70 backdrop-blur-md shadow-lg hover:shadow-2xl transition-shadow duration-300 border border-gray-100"
            >
              {/* Image */}
              <div className="relative w-full aspect-[16/10] overflow-hidden rounded-t-3xl">
                <img
                  src={card.CardFile}
                  alt={card.CardName}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              {/* Card Title */}
              <div className="px-4 py-3 text-center bg-white/80 backdrop-blur-sm border-t border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900">{card.CardName}</h3>
              </div>

              {/* Buttons */}
              <div className="px-4 py-4 flex gap-3 bg-white/70 backdrop-blur-sm border-t border-gray-100">
                <button
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-md hover:from-purple-600 hover:to-indigo-600 transition-all duration-300"
                  onClick={() => { setSelectedCard(card); setShowPreviewModal(true); }}
                >
                  Preview
                </button>
                <button
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold shadow-md hover:from-teal-500 hover:to-green-500 transition-all duration-300"
                  onClick={(e) => handleOrderClick(card, e)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  </div>
)}


      {/* Preview Modal */}
      {showPreviewModal && selectedCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto" onClick={closePreviewModal}>
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={closePreviewModal} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md">
              <X className="w-6 h-6"/>
            </button>
            <img src={selectedCard.CardFile || ""} alt={selectedCard.CardName} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-md mx-auto"/>
            <h4 className="font-bold text-gray-800 text-lg mt-4 text-center">{selectedCard.CardName}</h4>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto p-8" onClick={(e) => e.stopPropagation()}>
            <button onClick={closeOrderForm} className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2 shadow-md">
              <X className="w-6 h-6"/>
            </button>
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Book Your Item</h3>
            <form onSubmit={handleOrderSubmit} className="space-y-6">
              <input type="text" name="name" placeholder="Full Name" value={orderFormData.name} onChange={handleOrderFormChange} required className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              <input type="tel" name="mobile_number" placeholder="Mobile Number" value={orderFormData.mobile_number} onChange={handleOrderFormChange} required pattern="[0-9]{10}" className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
              <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition-all duration-300">
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
              {orderError && <p className="text-red-500 text-center mt-2">{orderError}</p>}
              {orderSuccess && <p className="text-green-500 text-center mt-2">Order placed successfully!</p>}
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CategorySection;
