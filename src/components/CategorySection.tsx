import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { getCategories, getSubCategories, getCardsBySubCategory, sendEmail } from '../helpers/api_routes';
import { X, Eye } from 'lucide-react';

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
  CardPrice?: string;
  isAvailable?: boolean;
  AvailableDate?: string;
  CardDetails?: {
    Area?: string;
    AvailableDate?: string;
  };
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
          <h2 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent animate-text-shimmer">
            Our Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of designs for every occasion</p>
        </div>

        {isLoading ? (
          <div className="flex justify-center my-8">
            <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : (
          displayCategories.map((category, index) => (
            <div key={index} className="mb-16">
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
      setCards((cardResponse || []).reverse()); // newest on top
      setSelectedSubCategory(subCategoryName);
      setShowCardsModal(true);
    } catch (error) {
      console.error("Error fetching cards:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

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

  return (
    <>
      {/* Only show category name when subcategories exist */}
      {subCategories.length > 0 && (
        <h3 className="text-2xl font-extrabold text-black 
        text-center mb-8 animate-fadeIn drop-shadow-sm">
{category.name}
</h3>

      )}

      {/* Subcategories Grid */}
      {subCategories.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
          {subCategories.map((subCategory, index) => (
            <div
              key={index}
              className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-gradient-to-br from-gray-100 to-white"
              onClick={() => handleSubCategoryClick(subCategory.SubCategoryName, category.name)}
            >
              <div className="relative aspect-[1/0.8] overflow-hidden">
                <img src={subCategory.SubCategoryFile || ""} alt={subCategory.SubCategoryName} className="w-full h-full object-cover"/>
              </div>
              <div className="p-3 text-center bg-white/80 backdrop-blur-md border-t">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-indigo-600">{subCategory.SubCategoryName}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Cards Modal */}
      {showCardsModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 pb-10 overflow-y-auto backdrop-blur-sm">
          {/* Modal container -- removed white background so only cards are white */}
          <div className="relative w-full max-w-6xl mx-auto p-6 rounded-3xl shadow-2xl bg-transparent" onClick={(e) => e.stopPropagation()}>
            {/* Header - scrolls with page */}
            <div className="flex items-center justify-between mb-6 px-6 py-4 rounded-2xl bg-white shadow-md border border-gray-200">
  <h2 className="text-xl font-bold text-gray-800">
    Items in {selectedSubCategory}
  </h2>
  <button
    onClick={() => setShowCardsModal(false)}
    className="text-gray-600 hover:text-red-500 transition-colors duration-300"
  >
    <X className="w-6 h-6" />
  </button>
</div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cards.map((card, idx) => (
                <div key={idx} className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-lg border">
                  {/* Image + availability badge for Hoardings */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <img src={card.CardFile} alt={card.CardName} className="w-full h-full object-cover"/>
                    {category.name === "Hoardings" && (
                      <div className="absolute top-3 right-3">
                        <span className={`px-3 py-1 text-xs font-medium rounded-full shadow-md ${card?.isAvailable ? "bg-emerald-500 text-white" : "bg-red-500 text-white"}`}>
                          {card?.isAvailable ? 'Available' : `From ${card?.AvailableDate || card?.CardDetails?.AvailableDate || 'TBD'}`}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <div className="px-4 py-2 text-center">
                    <h3 className="text-base font-semibold text-gray-800">{card.CardName}</h3>
                  </div>

                  {/* Hoardings extra info under title */}
                  {category.name === "Hoardings" && (
                    <div className="px-4 pb-2 text-sm text-gray-600 space-y-1">
                      <p>📍 Area: {card?.CardDetails?.Area || 'N/A'}</p>
                      <p>📅 Available: {card?.CardDetails?.AvailableDate || card?.AvailableDate || 'TBD'}</p>
                    </div>
                  )}

                  {/* Buttons */}
                  <div className="px-4 py-3 flex gap-3 justify-center">
                    <button
                      className="flex items-center justify-center gap-2 px-4 py-2 text-sm rounded-lg bg-indigo-500 text-white hover:bg-indigo-600"
                      onClick={() => { setSelectedCard(card); setShowPreviewModal(true); }}
                    >
                      <Eye className="w-4 h-4"/> Preview
                    </button>
                    <button
                      className="px-4 py-2 text-sm rounded-lg bg-green-500 text-white hover:bg-green-600"
                      onClick={(e) => handleOrderClick(card, e)}
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {showPreviewModal && selectedCard && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={() => setShowPreviewModal(false)}>
          <img src={selectedCard.CardFile} alt={selectedCard.CardName} className="max-w-full max-h-[90vh] object-contain rounded-lg"/>
          <button onClick={() => setShowPreviewModal(false)} className="absolute top-6 right-6 text-white hover:text-red-400">
            <X className="w-6 h-6"/>
          </button>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md mx-auto p-6" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setShowOrderForm(false)} className="absolute right-4 top-4 text-gray-400 hover:text-red-500">
              <X className="w-6 h-6"/>
            </button>

            {/* Full Width Image */}
            <div className="mb-6">
              <img src={selectedCard.CardFile} alt={selectedCard.CardName} className="w-full max-h-64 object-contain rounded-xl shadow"/>
              <h3 className="text-lg font-bold text-center mt-3">{selectedCard.CardName}</h3>
            </div>

            {/* Form */}
            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <input type="text" name="name" placeholder="Full Name" value={orderFormData.name} onChange={handleOrderFormChange} required className="w-full px-4 py-3 border rounded-lg"/>
              <input type="tel" name="mobile_number" placeholder="Mobile Number" value={orderFormData.mobile_number} onChange={handleOrderFormChange} required pattern="[0-9]{10}" className="w-full px-4 py-3 border rounded-lg"/>
              <button type="submit" className="w-full py-3 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600">
                {isSubmitting ? 'Processing...' : 'Confirm Booking'}
              </button>
            </form>

            {orderError && <p className="text-red-500 text-center mt-3">{orderError}</p>}
            {orderSuccess && <p className="text-green-500 text-center mt-3">✅ Order placed successfully!</p>}
          </div>
        </div>
      )}
    </>
  );
}

export default CategorySection;
