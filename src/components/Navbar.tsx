import { useState } from 'react';
import { Menu, X, GraduationCap } from 'lucide-react';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: 'home' },
    { name: 'About', path: 'about' },
    { name: 'Internships', path: 'internships' },
    { name: 'Events', path: 'events' },
    { name: 'Gallery', path: 'gallery' },
    { name: 'Testimonials', path: 'testimonials' },
    { name: 'Blog', path: 'blog' },
    { name: 'Contact', path: 'contact' },
    { name: 'FAQ', path: 'faq' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <GraduationCap className="h-8 w-8 text-teal-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">D.Dolphine</span>
          </div>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => onNavigate(item.path)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentPage === item.path
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('admin')}
              className="ml-4 px-4 py-2 rounded-md text-sm font-medium bg-gray-800 text-white hover:bg-gray-700 transition-colors"
            >
              Admin
            </button>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-700 hover:text-teal-600"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => {
                  onNavigate(item.path);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                  currentPage === item.path
                    ? 'bg-teal-600 text-white'
                    : 'text-gray-700 hover:bg-teal-50 hover:text-teal-600'
                }`}
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('admin');
                setMobileMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 rounded-md text-base font-medium bg-gray-800 text-white hover:bg-gray-700"
            >
              Admin
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
