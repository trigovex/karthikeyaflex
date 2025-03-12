import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 px-5 py-5">
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
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                'Custom Banners',
                'Event Displays',
                'Business Signs',
                'Wedding Banners',
                'Trade Show Materials',
              ].map((service) => (
                <li key={service}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-center md:text-left">
            <h4 className="text-lg font-semibold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <MapPin className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>D.no: 15-7-14, Rangamannar Peta, Palakollu</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <Phone className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>+91 9848068806</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300 justify-center md:justify-start">
                <Mail className="w-5 h-5 text-indigo-400 flex-shrink-0" />
                <span>karthikeyaflex@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm text-center md:text-left">
                © {new Date().getFullYear()} Karthikeya Flex. All rights reserved.
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
  );
};

export default Footer;
