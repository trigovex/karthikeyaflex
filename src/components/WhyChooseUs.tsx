import React from 'react';

const WhyChooseUs = () => {
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
          {[
            {
              title: 'Premium Materials',
              description:
                'Our banners are crafted using top-grade materials that ensure durability and weather resistance, maintaining vibrant colors in any condition.',
              image:
                'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=2069',
            },
            {
              title: 'Superior Print Quality',
              description:
                'Using state-of-the-art printing technology, we deliver sharp, vivid images with exceptional color accuracy and detail.',
              image:
                'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=2070',
            },
            {
              title: 'Custom Design Service',
              description:
                'Our expert designers work closely with you to create unique, eye-catching banners that perfectly match your vision and brand.',
              image:
                'https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?auto=format&fit=crop&q=80&w=2069',
            },
            {
              title: 'Fast Delivery',
              description:
                'Quick turnaround times and reliable delivery ensure your banners arrive when you need them, without compromising on quality.',
              image:
                'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=2069',
            },
          ].map((item, index) => (
            <div key={index} className="group">
              <div className="relative h-64 mb-6 rounded-2xl overflow-hidden shadow-lg">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                />
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
