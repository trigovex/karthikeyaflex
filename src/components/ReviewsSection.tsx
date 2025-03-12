import React from 'react';
import { Star } from 'lucide-react';

const ReviewsSection = ({ reviews, currentReview, setCurrentReview }) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4" style={{ marginTop: '-100px' }}>
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
                <div key={index} className="w-full flex-shrink-0 px-4">
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
                          <h3 className="text-lg font-bold text-gray-800 mb-0.5">{review.name}</h3>
                          <p className="text-sm text-indigo-600 font-medium">{review.role}</p>
                        </div>
                        <div className="flex items-center mb-4">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <blockquote className="text-center">
                          <p className="text-sm text-gray-600 leading-relaxed italic">"{review.text}"</p>
                        </blockquote>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-6">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentReview(index)}
                className={`transition-all duration-300 ${
                  index === currentReview ? 'w-6 h-1.5 bg-indigo-600' : 'w-1.5 h-1.5 bg-gray-300'
                } rounded-full`}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
