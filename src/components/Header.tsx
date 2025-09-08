import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo11 from '../Images/logo11.png';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 mt-3">
        <div className="glass rounded-2xl px-4 md:px-6 py-3 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <img src={logo11} alt="Logo" className="h-10 md:h-12 w-auto drop-shadow" />
            <span className="hidden sm:inline text-xl md:text-2xl font-extrabold gradient-text tracking-tight">Karthikeya Flex</span>
          </a>

          {/* Desktop Menu */}
          <nav className="hidden md:flex items-center gap-2">
            {['Services', 'About Us', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '-')}`}
                className="text-gray-800/80 font-medium px-3 py-2 rounded-lg hover:text-indigo-700 hover:bg-white/40 transition-colors duration-300"
              >
                {item}
              </a>
            ))}
            <a
              href="#book-now"
              className="ml-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-4 py-2 rounded-xl font-semibold shadow hover:opacity-95 transition-opacity"
            >
              Book Now
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-xl text-gray-800 hover:bg-white/50 transition"
            aria-label="Toggle Menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full px-4">
          <div className="glass rounded-2xl py-4">
            <nav className="flex flex-col items-stretch space-y-2 px-4">
              {['Services', 'About Us', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-gray-800/80 font-medium px-3 py-2 rounded-lg hover:text-indigo-700 hover:bg-white/40 transition-colors duration-300"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
              <a
                href="#book-now"
                className="mt-2 bg-gradient-to-r from-indigo-600 to-cyan-500 text-white px-4 py-3 rounded-xl font-semibold text-center shadow"
                onClick={() => setIsMenuOpen(false)}
              >
                Book Now
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
