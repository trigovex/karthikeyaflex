import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider';
import { Eye, ShoppingCart, Star, X, ChevronLeft, ChevronRight, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Flag, Gift, Award, PartyPopper, Cake, Building2, GraduationCap, Heart, Baby, Music, Trophy, Users, Tent, Palette, Store, Camera, CheckCircle, Flower, Diamond, Gem, Home, HeartHandshake, PenTool, Warehouse } from 'lucide-react';
import img1 from './Images/Birthday.jpg';
import img2 from './Images/Christain_Wedding.jpg';
import img3 from './Images/Death.jpg';
import img4 from './Images/Engagement.jpg';
import img5 from './Images/HinduWedding.jpg';
import img6 from './Images/House.jpg';
import img7 from './Images/Mechur.jpeg';
import img8 from './Images/Muslim_Wedding.jpg';
import img9 from './Images/Namkarnam.avif';
import img10 from './Images/Village.jpg';
import img11 from './Images/retirement.avif'

interface EventCard {
  image: string;
  title: string;
  price: string;
  category: string;
  rating?: number;
  description?: string;
}

// const eventCards: EventCard[] = [
//   {
//     image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069',
//     title: 'Elegant Wedding Collection',
//     price: '$299',
//     category: 'Wedding',
//     rating: 4.9,
//     description: 'Premium wedding designs with elegant themes and customizable options.',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069',
//     title: 'Graduation Special',
//     price: '$199',
//     category: 'Graduation',
//     rating: 4.8,
//     description: 'Celebrate academic success with our modern graduation designs.',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069',
//     title: 'Birthday Bash Package',
//     price: '$149',
//     category: 'Birthday',
//     rating: 4.7,
//     description: 'Make your birthday memorable with our creative design collection.',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=2069',
//     title: 'Corporate Event Suite',
//     price: '$399',
//     category: 'Corporate',
//     rating: 4.9,
//     description: 'Professional designs perfect for corporate events and meetings.',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=2069',
//     title: 'Anniversary Collection',
//     price: '$249',
//     category: 'Anniversary',
//     rating: 4.8,
//     description: 'Romantic and elegant designs to celebrate your special moments.',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1470753937643-efeb931202a9?auto=format&fit=crop&q=80&w=2069',
//     title: 'Baby Shower Package',
//     price: '$179',
//     category: 'Baby Shower',
//     rating: 4.7,
//     description: 'Adorable designs to welcome your little bundle of joy.',
//   },
// ];

interface OrderFormData {
  name: string;
  mobile: string;
  categoryType: string;
  quality: string;
  quantity: string;
}

// Add Review interface
interface Review {
  name: string;
  image: string;
  rating: number;
  text: string;
  role: string;
}

// Add review data
const reviews: Review[] = [
  {
    name: "Sarah Johnson",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Absolutely amazing quality! The banners exceeded my expectations. The colors were vibrant and the material was perfect for our outdoor event.",
    role: "Event Organizer"
  },
  {
    name: "Michael Chen",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Professional service from start to finish. The team was incredibly helpful and delivered our corporate banners ahead of schedule.",
    role: "Business Owner"
  },
  {
    name: "Emily Davis",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "The custom design service was exceptional! They brought our vision to life perfectly. Will definitely use them again.",
    role: "Marketing Director"
  },
  {
    name: "James Wilson",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200",
    rating: 5,
    text: "Outstanding quality and customer service. The team went above and beyond to ensure our satisfaction.",
    role: "Retail Manager"
  }
];

// Add Category interface
interface CategoryCard {
  title: string;
  icon: React.ReactNode;
  image: string;
  description: string;
}

// Add category data
const categories: CategoryCard[] = [
   
  {
    title: "Wedding Banners",
    icon: <Gem className="w-6 h-6" />,
    image: img5,
    description: "Elegant wedding designs"
  },
  {
    title: "Chirstain Wedding Banners",
    icon: <Heart className="w-6 h-6" />,
    image: img2,
    description: "Elegant wedding designs"
  },
  {
    title: "Muslim Wedding Banners",
    icon: <Gem className="w-6 h-6" />,
    image: img8,
    description: "Elegant wedding designs"
  },
  {
    title: "Birthday Banners",
    icon: <Cake className="w-6 h-6" />,
    image: img1,
    description: "Make birthdays special"
  },
  {
    title: "Mechur Banners",
    icon: <Flower className="w-6 h-6" />,
    image: img7,
    description: "Elegant Mechur function designs"
  },
  {
    title: "Gruhapravesam Banners",
    icon: <Home className="w-6 h-6" />,
    image: img6,
    description: "Elegant wedding designs"
  },
  {
    title: "Engagement Banners",
    icon: <HeartHandshake className="w-6 h-6" />,
    image: img4,
    description: "Elegant wedding designs"
  },
  {
    title: "Retirement Banners",
    icon: <Heart className="w-6 h-6" />,
    image: img11,
    description: "Elegant wedding designs"
  },
  {
    title: "NamaKarana Banners",
    icon: <PenTool className="w-6 h-6" />,
    image: img9,
    description: "Elegant wedding designs"
  },
  {
    title: "GramaPanchayati Banners",
    icon: <Warehouse className="w-6 h-6" />,
    image: img10,
    description: "Elegant wedding designs"
  },
  {
    title: "Death Banners",
    icon: <Star className="w-6 h-6" />,
    image: img3,
    description: "Elegant wedding designs"
  },
  
];

// Add this interface after other interfaces
interface CategoryImage {
  url: string;
  title: string;
}

// Add this type for category image mapping
type CategoryImagesMap = {
  [key: string]: CategoryImage[];
};

// Add this constant after other constants
const categoryImages: CategoryImagesMap = {
  "Birthday Banners": [
    { url: "/src/Images/Birthday.jpg", title: "Flex-1" },
     
  ],
  "Wedding Banners": [
    { url: "", title: "" },
      
  ],
  "Chirstain Wedding Banners": [
    { url: "", title: "" }, 
  ],
  "Mechur Banners": [
    { url: "", title: "" }, 
  ],
  "Gruhapravesam Banners": [
    { url: "", title: "" }, 
  ],
  "Muslim Wedding Banners": [
    { url: "", title: "" }, 
  ],
  "Engagement Banners": [
    { url: "", title: "" }, 
  ],
  "Retirement Banners": [
    { url: "", title: "" }, 
  ],
  "Namakarana Banners": [
    { url: "", title: "" },
  ],
  "GramaPanchayati Banners": [
    { url: "", title: "" },
  ],
  "Death Banners": [
    { url: "", title: "" },
  ],
   
};

// Add this before the App function
const qualityOptions = [
  { value: 'standard', label: 'Standard Quality' },
  { value: 'premium', label: 'Premium Quality' },
  { value: 'ultra', label: 'Ultra Premium Quality' }
];

function App() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState<EventCard | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImageOrderForm, setShowImageOrderForm] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState<{url: string, title: string} | null>(null);
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    mobile: '',
    categoryType: '',
    quality: '',
    quantity: '1'
  });
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [showOrderFormModal, setShowOrderFormModal] = useState(false);

  const handlePreview = (image: string) => {
    setSelectedImage(image);
  };

  const handleOrder = (card: EventCard) => {
    setSelectedCard(card);
    setShowOrderForm(true);
  };

  const handleImageClick = (image: CategoryImage) => {
    setSelectedImageData(image);
    setShowImageOrderForm(true);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Close all possible forms/modals
    setShowOrderForm(false);
    setShowImageOrderForm(false);
    setShowOrderFormModal(false);
    setSelectedCategory(null);
    setSelectedCard(null);

    // Show the confirmation popup
    setShowConfirmation(true); 

    // Reset form data
    setFormData({
      name: '',
      mobile: '',
      categoryType: '',
      quality: '',
      quantity: '1'
    });
  };

  // Auto-sliding effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(timer);
  }, []);

  // Add this function to handle category click
  const handleCategoryClick = (categoryTitle: string) => {
    setSelectedCategory(categoryTitle);
  };

  // Add new function to handle confirmation close
  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedCategory(null);
  };

  // Add this function to handle view button click
  const handleViewImage = (image: string) => {
    setFullScreenImage(image);
  };

  // Add this function to handle order button click
  const handleOrderButtonClick = () => {
    setShowOrderFormModal(true);
  };

  // Add this function to close the full-screen image
  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSlider />

      {/* Category Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Flex Printing
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our wide range of banner designs for every occasion
            </p>
          </div>

          {/* Updated grid classes for responsive layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
                onClick={() => handleCategoryClick(category.title)}
              >
                <div className="aspect-w-16 aspect-h-9 relative">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-32 sm:h-48 object-cover" // Adjusted height for mobile
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
                <div className="p-3 sm:p-6"> {/* Adjusted padding for mobile */}
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      {category.icon}
                    </div>
                    <h3 className="text-sm sm:text-lg font-bold text-gray-800 line-clamp-2">
                      {category.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-white" style={{marginTop:'-65px'}}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We deliver excellence in every banner through premium materials, outstanding print quality, and exceptional service.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Premium Materials */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069" 
                  alt="Premium Materials" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Premium Materials</h3>
              <p className="text-gray-600 leading-relaxed">
                Our banners are crafted using top-grade materials that ensure durability and weather resistance, maintaining vibrant colors in any condition.
              </p>
            </div>

            {/* Superior Print Quality */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2070" 
                  alt="Print Quality" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Superior Print Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Using state-of-the-art printing technology, we deliver sharp, vivid images with exceptional color accuracy and detail.
              </p>
            </div>

            {/* Custom Design Service */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=2069" 
                  alt="Custom Design" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Custom Design Service</h3>
              <p className="text-gray-600 leading-relaxed">
                Our expert designers work closely with you to create unique, eye-catching banners that perfectly match your vision and brand.
              </p>
            </div>

            {/* Fast Delivery */}
            <div className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img 
                  src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069" 
                  alt="Fast Delivery" 
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">Fast Delivery</h3>
              <p className="text-gray-600 leading-relaxed">
                Quick turnaround times and reliable delivery ensure your banners arrive when you need them, without compromising on quality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* User Reviews Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{marginTop: '-100px'}}>
              Customer Reviews
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear what our clients have to say about their experience with our banner services.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-1000 ease-in-out"
                style={{ transform: `translateX(-${currentReview * 100}%)` }}
              >
                {reviews.map((review, index) => (
                  <div
                    key={index}
                    className="w-full flex-shrink-0 px-4"
                  >
                    <div className="max-w-lg mx-auto">
                      <div className="bg-white rounded-xl shadow-lg p-6">
                        <div className="flex flex-col items-center">
                          <div className="relative mb-4">
                            <div className="w-16 h-16 rounded-full overflow-hidden ring-4 ring-indigo-50">
                              <img
                                src={review.image}
                                alt={review.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="absolute -bottom-1 -right-1 bg-indigo-600 rounded-full p-1.5">
                              <Star className="w-3 h-3 text-white fill-current" />
                            </div>
                          </div>
                          
                          <div className="text-center mb-4">
                            <h3 className="text-lg font-bold text-gray-800 mb-0.5">
                              {review.name}
                            </h3>
                            <p className="text-sm text-indigo-600 font-medium">
                              {review.role}
                            </p>
                          </div>

                          <div className="flex items-center mb-4">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                              />
                            ))}
                          </div>

                          <blockquote className="text-center">
                            <p className="text-sm text-gray-600 leading-relaxed italic">
                              "{review.text}"
                            </p>
                          </blockquote>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Indicators */}
            <div className="flex justify-center gap-2 mt-6">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReview(index)}
                  className={`transition-all duration-300 ${
                    index === currentReview 
                      ? 'w-6 h-1.5 bg-indigo-600' 
                      : 'w-1.5 h-1.5 bg-gray-300'
                  } rounded-full`}
                  aria-label={`Go to review ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Image Preview Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Preview" 
            className="max-w-[90%] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && selectedCard && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Place Order</h3>
                <button 
                  onClick={() => setShowOrderForm(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmation && (
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

      {/* Add Category Images Modal */}
      {selectedCategory && (
        <div className="fixed inset-0 bg-black/80 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 py-8">
            <div className="relative max-w-7xl mx-auto">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-white">
                  {selectedCategory} Designs
                </h3>
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className="text-white hover:text-gray-300 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Images Grid */}
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
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                      <div className="p-3 w-full">
                        <h4 className="text-white text-sm font-medium truncate mb-2">
                          {category.title}
                        </h4>
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
      )}

      {/* Add Image Order Form Modal */}
      {showImageOrderForm && selectedImageData && (
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

              {/* Selected Image Preview */}
              <div className="mb-8 rounded-xl overflow-hidden shadow-xl ring-4 ring-white/20">
                <img
                  src={selectedImageData.url}
                  alt={selectedImageData.title}
                  className="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-500"
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
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    placeholder="Enter mobile number"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block text-sm font-medium text-white/90 mb-1.5 ml-1">Category Type</label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl focus:ring-2 focus:ring-white/50 focus:border-white/50 text-white shadow-inner transition-all duration-300 hover:bg-white/15"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, quality: e.target.value})}
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
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
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
      )}

      {/* Full-Screen Image Modal */}
      {fullScreenImage && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
          <button 
            className="absolute top-4 left-4 text-white hover:text-gray-300 transition-colors"
            onClick={closeFullScreenImage}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={fullScreenImage} 
            alt="Preview" 
            className="max-w-[90%] max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderFormModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800">Place Order</h3>
                <button 
                  onClick={() => setShowOrderFormModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Banner Type</label>
                  <select
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.categoryType}
                    onChange={(e) => setFormData({...formData, categoryType: e.target.value})}
                  >
                    <option value="">Select type</option>
                    <option value="standard">Standard</option>
                    <option value="premium">Premium</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.quantity}
                    onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-4 rounded-xl transition-colors duration-300"
                >
                  Submit Order
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Footer Section */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-5 py-5">
            {/* Company Info */}
            <div className="space-y-4 text-center md:text-left">
              <h4 className="text-2xl font-bold mb-6">Flex Design</h4>
              <p className="text-gray-300 leading-relaxed">
                Creating high-quality, customizable banners with premium materials and exceptional craftsmanship for all your needs.
              </p>
              <div className="flex items-center gap-4 mt-6 justify-center md:justify-start">
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition-colors duration-300">
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About Us', 'Services', 'Portfolio', 'Contact'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6">Our Services</h4>
              <ul className="space-y-3">
                {[
                  'Custom Banners',
                  'Event Displays',
                  'Business Signs',
                  'Wedding Banners',
                  'Trade Show Materials'
                ].map((service) => (
                  <li key={service}>
                    <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                      {service}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div className="text-center md:text-left">
              <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                  <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>123 Design Street, Creative City, 12345</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                  <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                  <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                  <span>info@flexdesign.com</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800">
            <div className="container mx-auto px-4 py-6">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-gray-400 text-sm text-center md:text-left">
                  © {new Date().getFullYear()} Flex Design. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-gray-400">
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Privacy Policy
                  </a>
                  <a href="#" className="hover:text-white transition-colors duration-300">
                    Terms of Service
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;