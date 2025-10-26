import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import InternshipsPage from './pages/InternshipsPage';
import EventsPage from './pages/EventsPage';
import GalleryPage from './pages/GalleryPage';
import TestimonialsPage from './pages/TestimonialsPage';
import BlogPage from './pages/BlogPage';
import ContactPage from './pages/ContactPage';
import FAQPage from './pages/FAQPage';
import AdminPage from './pages/AdminPage';


function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'about':
        return <AboutPage />;
      case 'internships':
        return <InternshipsPage />;
      case 'events':
        return <EventsPage />;
      case 'gallery':
        return <GalleryPage />;
      case 'testimonials':
        return <TestimonialsPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case 'faq':
        return <FAQPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {currentPage !== 'admin' && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
      <main className="flex-grow">{renderPage()}</main>
      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

export default App;
