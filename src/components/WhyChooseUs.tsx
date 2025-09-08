import React from 'react';

interface WhyItem { title: string; description: string; image?: string }
interface WhyChooseUsProps { items?: WhyItem[] }

const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ items }) => {
  const display = items || [];
  return (
    <section className="py-16 bg-white" style={{ marginTop: '-15px' }}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We deliver excellence in every banner through premium materials, outstanding print quality, and exceptional service.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {display.map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-600 leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
