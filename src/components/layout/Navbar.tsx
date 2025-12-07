import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Home, Info, Users, Newspaper, Phone } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: '/', icon: <Home size={20} /> },
    { name: 'About Wamba', path: '/about', icon: <Info size={20} /> },
    { name: 'Council', path: '/council', icon: <Users size={20} /> },
    { name: 'News', path: '/news', icon: <Newspaper size={20} /> },
  ];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className="sticky top-0 z-50 bg-surface shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* LOGO */}
          <Link to="/" className="flex items-center  z-50 relative">
          <img src="/images/wamba-logo.png" alt="Wamba LGA Logo" className="w-10 h-10 md:w-20 md:h-20" />
          <span className="font-display font-bold text-2xl md:text-3xl text-secondary tracking-tight">
            Wamba LGA
          </span>
          </Link>

          {/* DESKTOP MENU (Hidden on Mobile, Visible on md+) */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-lg font-medium transition-colors duration-200
                    ${isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'}
                  `}
                >
                  {item.name}
                  {/* Active Indicator Dot */}
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"></span>
                  )}
                </Link>
              );
            })}
            
            {/* Contact Button for Desktop */}
            <Link 
              to="/contact"
              className="px-6 py-2 bg-secondary text-white rounded hover:bg-primary transition-colors font-medium"
            >
              Contact Us
            </Link>
          </div>

          {/* MOBILE HAMBURGER (Visible on Mobile, Hidden on md+) */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-secondary hover:text-primary z-50 focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE FULL SCREEN MENU (Same as before) */}
      <div
        className={`fixed inset-0 bg-surface z-40 transform transition-transform duration-300 ease-in-out md:hidden  ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '0', height: '100vh' }}
      >
        <div className="flex flex-col h-full mt-32 px-8 space-y-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className="flex items-center gap-4 text-2xl font-display font-bold text-secondary hover:text-primary transition-colors border-b-1 pb-7"
            >
              <span className="text-secondary">{item.icon}</span>
              {item.name}
            </Link>
          ))}
           <Link to="/contact" className="flex items-center gap-4 text-2xl font-display font-bold text-secondary hover:text-primary">
              <span className="text-secondary"><Phone size={24}/></span>
              Contact Us
           </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;