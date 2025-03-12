import React, { useState, useEffect } from 'react';
import HeroSlider from './components/HeroSlider.tsx';
import CategorySection from './components/CategorySection';
import HoardingSection from './components/HoardingSection.tsx';
import WhyChooseUs from './components/WhyChooseUs.tsx';
import ReviewsSection from './components/ReviewsSection';
import Footer from './components/Footer';
import ImagePreviewModal from './components/ImagePreviewModal.tsx';
import OrderFormModal from './components/OrderFormModal';
import ConfirmationModal from './components/ConfirmationModal.tsx';
import CategoryImagesModal from './components/CategoryImagesModal.tsx';
import ImageOrderFormModal from './components/ImageOrderFormModal';
import WeddingCardsSection from './components/WeddingCardsSection.tsx';
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
import img11 from './Images/retirement.avif';
import wedding1 from './Images/Wed-1.jpg';
import wedding2 from './Images/Wed-2.jpg';
import wedding3 from './Images/Wed-3.jpg';
import wedding4 from './Images/Wed-4.jpg';
import wedding5 from './Images/Wed-5.jpg';
import wedding6 from './Images/Wed-6.jpg';
import wedding7 from './Images/Wed-7.jpg';
import wedding8 from './Images/Wed-8.jpg';
import wedding9 from './Images/Wed-9.jpg';
import wedding10 from './Images/Wed-10.jpg';


const reviews = [
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

const categories = [
  {
    title: "Wedding Banners",
    icon: <Gem className="w-6 h-6" />,
    image: img5,
    description: "Elegant wedding designs"
  },
  {
    title: "Christian Wedding Banners",
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
    title: "Mature Banners",
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
];

//cards inside Images
const categoriesinside = [
  {
    title: "Wedding Card",
    icon: <Gem className="w-6 h-6" />,
    image: wedding1,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <Heart className="w-6 h-6" />,
    image: wedding2,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <Gem className="w-6 h-6" />,
    image: wedding3,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <Cake className="w-6 h-6" />,
    image: wedding4,
    description: "Make birthdays special"
  },
  {
    title:  "Wedding Card",
    icon: <Flower className="w-6 h-6" />,
    image: wedding5,
    description: "Elegant Mechur function designs"
  },
  {
    title:  "Wedding Card",
    icon: <Home className="w-6 h-6" />,
    image: wedding6,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <HeartHandshake className="w-6 h-6" />,
    image: wedding7,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <Heart className="w-6 h-6" />,
    image: wedding8,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <PenTool className="w-6 h-6" />,
    image: wedding9,
    description: "Elegant wedding designs"
  },
  {
    title:  "Wedding Card",
    icon: <Warehouse className="w-6 h-6" />,
    image: wedding10,
    description: "Elegant wedding designs"
  },
];


const qualityOptions = [
  { value: 'standard', label: 'Normal Quality' },
  { value: 'premium', label: 'Star Flex' },
  { value: 'ultra', label: 'Vinyl Flex' }
];

function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showImageOrderForm, setShowImageOrderForm] = useState(false);
  const [selectedImageData, setSelectedImageData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    categoryType: '',
    quality: '',
    quantity: '1'
  });
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [showOrderFormModal, setShowOrderFormModal] = useState(false);

  const handlePreview = (image) => {
    setSelectedImage(image);
  };

  const handleOrder = (card) => {
    setSelectedCard(card);
    setShowOrderForm(true);
  };

  const handleImageClick = (image) => {
    setSelectedImageData(image);
    setShowImageOrderForm(true);
  };

  const handleSubmitOrder = (e) => {
    e.preventDefault();
    setShowOrderForm(false);
    setShowImageOrderForm(false);
    setShowOrderFormModal(false);
    setSelectedCategory(null);
    setSelectedCard(null);
    setShowConfirmation(true);
    setFormData({
      name: '',
      mobile: '',
      categoryType: '',
      quality: '',
      quantity: '1'
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const handleCategoryClick = (categoryTitle) => {
    setSelectedCategory(categoryTitle);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedCategory(null);
  };

  const handleViewImage = (image) => {
    setFullScreenImage(image);
  };

  const handleOrderButtonClick = () => {
    setShowOrderFormModal(true);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <HeroSlider />
      <CategorySection categories={categories} handleCategoryClick={handleCategoryClick} />
      <HoardingSection />
      <WeddingCardsSection/>
      <WhyChooseUs />
      <ReviewsSection reviews={reviews} currentReview={currentReview} setCurrentReview={setCurrentReview} />
      <ImagePreviewModal selectedImage={selectedImage} setSelectedImage={setSelectedImage} />
      <OrderFormModal
        showOrderForm={showOrderForm}
        setShowOrderForm={setShowOrderForm}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
      />
      <ConfirmationModal showConfirmation={showConfirmation} handleConfirmationClose={handleConfirmationClose} />
      <CategoryImagesModal
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categoriesinside}
        handleViewImage={handleViewImage}
        handleOrderButtonClick={handleOrderButtonClick}
      />
      <ImageOrderFormModal
        showImageOrderForm={showImageOrderForm}
        setShowImageOrderForm={setShowImageOrderForm}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
        selectedImageData={selectedImageData}
        qualityOptions={qualityOptions}
        categories={categories}
      />
      <OrderFormModal
        showOrderForm={showOrderFormModal}
        setShowOrderForm={setShowOrderFormModal}
        formData={formData}
        setFormData={setFormData}
        handleSubmitOrder={handleSubmitOrder}
      />
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
      <Footer />
    </div>
  );
}

export default App;
