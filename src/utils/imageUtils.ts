// Image utility functions for better iPhone compatibility

export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
};

export const handleImageLoad = (img: HTMLImageElement) => {
  img.classList.add('loaded');
  img.style.opacity = '1';
};

export const handleImageError = (img: HTMLImageElement, fallbackSrc: string = '/placeholder-image.jpg') => {
  img.src = fallbackSrc;
  img.classList.add('loaded');
  img.style.opacity = '1';
};

// Intersection Observer for lazy loading
export const setupLazyLoading = () => {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            observer.unobserve(img);
          }
        }
      });
    });

    // Observe all lazy images
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }
};

// iOS specific image fixes
export const applyIOSImageFixes = () => {
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
    // Force hardware acceleration for images
    document.querySelectorAll('img').forEach(img => {
      img.style.transform = 'translateZ(0)';
      img.style.backfaceVisibility = 'hidden';
    });
  }
};

