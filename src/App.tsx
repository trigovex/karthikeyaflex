import React, { useState, useEffect } from 'react';
import CategorySection from './components/CategorySection';
import Footer from './components/Footer';
import ImagePreviewModal from './components/ImagePreviewModal.tsx';
import OrderFormModal from './components/OrderFormModal';
import ConfirmationModal from './components/ConfirmationModal.tsx';
import CategoryImagesModal from './components/CategoryImagesModal.tsx';
import ImageOrderFormModal from './components/ImageOrderFormModal';
import Header from './components/Header.tsx';
import { X } from 'lucide-react';

import img1 from './Images/Birthday.jpg';
import img2 from './Images/Christain_Wedding.jpg';
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

// Categories
const categories = [
  { title: "Wedding Banners", image: img5 },
  { title: "Christian Wedding Banners", image: img2 },
  { title: "Muslim Wedding Banners", image: img8 },
  { title: "Birthday Banners", image: img1 },
  { title: "Mature Banners", image: img7 },
  { title: "Gruhapravesam Banners", image: img6 },
  { title: "Engagement Banners", image: img4 },
  { title: "Retirement Banners", image: img11 },
  { title: "NamaKarana Banners", image: img9 },
  { title: "GramaPanchayati Banners", image: img10 },
];

// Wedding cards
const categoriesinside = [
  { title: "Wedding Card", image: wedding1 },
  { title: "Wedding Card", image: wedding2 },
  { title: "Wedding Card", image: wedding3 },
  { title: "Wedding Card", image: wedding4 },
  { title: "Wedding Card", image: wedding5 },
  { title: "Wedding Card", image: wedding6 },
  { title: "Wedding Card", image: wedding7 },
  { title: "Wedding Card", image: wedding8 },
  { title: "Wedding Card", image: wedding9 },
  { title: "Wedding Card", image: wedding10 },
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
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [fullScreenImage, setFullScreenImage] = useState(null);
  const [showOrderFormModal, setShowOrderFormModal] = useState(false);

  // push history state so back works like website
  const pushHistoryEntry = () => {
    try {
      window.history.pushState({}, '');
    } catch (err) {
      // no-op
    }
  };

  const handlePreview = (image) => {
    pushHistoryEntry();
    setSelectedImage(image);
  };

  const handleOrder = (card) => {
    pushHistoryEntry();
    setSelectedCard(card);
    setShowOrderForm(true);
  };

  const handleImageClick = (image) => {
    pushHistoryEntry();
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
    setFormData({ name: '', mobile: '', categoryType: '', quality: '', quantity: '1' });
  };

  const handleCategoryClick = (categoryTitle) => {
    pushHistoryEntry();
    setSelectedCategory(categoryTitle);
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    setSelectedCategory(null);
  };

  const handleViewImage = (image) => {
    pushHistoryEntry();
    setFullScreenImage(image);
  };

  const handleOrderButtonClick = () => {
    pushHistoryEntry();
    setShowOrderFormModal(true);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  useEffect(() => {
    const onPopState = () => {
      if (fullScreenImage) {
        setFullScreenImage(null);
        return;
      }
      if (showImageOrderForm) {
        setShowImageOrderForm(false);
        return;
      }
      if (showOrderForm) {
        setShowOrderForm(false);
        return;
      }
      if (showOrderFormModal) {
        setShowOrderFormModal(false);
        return;
      }
      if (selectedCategory) {
        setSelectedCategory(null);
        return;
      }
      if (selectedImage) {
        setSelectedImage(null);
        return;
      }
      if (showConfirmation) {
        setShowConfirmation(false);
        return;
      }
      // ✅ No window.history.go(1) here
      // If nothing is open, let browser/system handle back normally
    };

    // Seed initial history entry
    pushHistoryEntry();
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, [fullScreenImage, showImageOrderForm, showOrderForm, showOrderFormModal, selectedCategory, selectedImage, showConfirmation]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Header />
      <CategorySection categories={categories} handleCategoryClick={handleCategoryClick} />

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
