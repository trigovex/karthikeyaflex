import React from 'react';

const CategorySection = ({ categories, handleCategoryClick }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Flex Printing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our wide range of banner designs for every occasion
          </p>
        </div>
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
                  className="w-full h-32 sm:h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>
              <div className="p-3 sm:p-6">
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
  );
};

export default CategorySection;
