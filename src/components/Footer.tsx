import { GraduationCap, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <GraduationCap className="h-8 w-8 text-teal-500" />
              <span className="ml-2 text-xl font-bold text-white">D.Dolphine</span>
            </div>
            <p className="text-sm mb-4">
              Empowering Students Through Experience. A multi-domain platform offering internships,
              workshops, and events to build skills and careers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-teal-500 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-teal-500 transition-colors"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('internships')}
                  className="hover:text-teal-500 transition-colors"
                >
                  Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('events')}
                  className="hover:text-teal-500 transition-colors"
                >
                  Events
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('blog')}
                  className="hover:text-teal-500 transition-colors"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-teal-500 transition-colors"
                >
                  FAQ
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mt-1 mr-2 flex-shrink-0 text-teal-500" />
                <span>123 Education Street, Tech City, IN 560001</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2 flex-shrink-0 text-teal-500" />
                <span>+91 9876543210</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2 flex-shrink-0 text-teal-500" />
                <span>contact@ddolphine.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>
            &copy; {currentYear} D.Dolphine Company. All rights reserved. |{' '}
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-teal-500 transition-colors"
            >
              Privacy Policy
            </button>
            {' | '}
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-teal-500 transition-colors"
            >
              Terms of Service
            </button>
          </p>
        </div>
      </div>
    </footer>
  );
}
