import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type BannerImage = { url: string; alt: string };

interface BannerSliderProps {
  images?: BannerImage[];
}

const BannerSlider: React.FC<BannerSliderProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const bannerImages = images || [];

  if (!bannerImages.length) {
    return null;
  }

  // Auto-play functionality with reduced interval time
  useEffect(() => {
    // Clear any existing interval when component mounts or isAutoPlaying changes
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 3000); // Change slide every 3 seconds for faster rotation
    }
    
    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isAutoPlaying]);

  // Force slide change when component mounts to ensure auto-play starts immediately
  useEffect(() => {
    // Trigger first slide change after a short delay
    const initialTimer = setTimeout(() => {
      if (isAutoPlaying) {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }
    }, 100);
    
    return () => clearTimeout(initialTimer);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  // Navigation functions
  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 3000);
    }
  };

  const goToPrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerImages.length) % bannerImages.length);
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 3000);
    }
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Reset auto-play timer when manually navigating
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % bannerImages.length);
      }, 3000);
    }
  };

  return (
    <div 
      className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      <div 
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {bannerImages.map((image, index) => (
          <div key={index} className="min-w-full h-full flex-shrink-0 relative">
            <img 
              src={image.url} 
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
              <div className="container mx-auto px-6 pb-16">
                <h2 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-4">{image.alt}</h2>
                <p className="text-white/90 text-lg md:text-xl max-w-2xl">
                  Premium quality printing solutions for all your needs. Custom designs, superior materials, and fast delivery at competitive prices.
                </p>
                <button className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-md text-lg font-medium transition-colors duration-200">
                  Explore Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation arrows */}
      <button 
        className="absolute top-1/2 left-6 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="w-8 h-8" />
      </button>
      
      <button 
        className="absolute top-1/2 right-6 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full p-3 backdrop-blur-sm transition-colors"
        onClick={goToNextSlide}
      >
        <ChevronRight className="w-8 h-8" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {bannerImages.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-4 h-4 rounded-full transition-all ${
              currentSlide === index ? 'bg-white scale-125' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play indicator */}
      <div className="absolute top-4 right-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
        {isAutoPlaying ? 'Auto' : 'Paused'}
      </div>
    </div>
  );
};

export default BannerSlider;
