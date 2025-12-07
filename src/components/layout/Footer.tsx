import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, ArrowUp } from 'lucide-react';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa6'; // Brand icons

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-secondary text-white pt-10 pb-2 mt-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Logo & Socials */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-800 pb-8 gap-6">
          
          {/* Logo Area */}
          <Link to="/" className="col items-center gap-1 md:flex">
            {/* Simple White Logo Placeholder */}
            <img src="/images/wamba-logo.png" alt="Wamba LGA Logo" className="w-25 h-25  mx-auto" />
            <div className="flex flex-col text-center md:text-left">
              <span className="font-bold text-xl leading-none tracking-wide">WAMBA</span>
              <span className="text-[10px] uppercase tracking-widest opacity-70">Local Goverment Area</span>
            </div>
          </Link>

          {/* Social Icons */}
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaInstagram].map((Icon, i) => (
              <a 
                key={i} 
                href="#" 
                className="w-10 h-10 rounded-full bg-[#111f38] flex items-center justify-center hover:bg-primary transition-colors text-white/80 hover:text-white"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* MIDDLE ROW: 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 mt-5 gap-12 mb-20">
          
          {/* Column 1: Contact (3 cols width) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="font-bold text-white text-lg mb-6">Contact</h3>
            
            <div className="flex items-center gap-3 text-white hover:text-primary transition-colors">
              <Mail size={18} className="text-white  shrink-0" />
              <a href="mailto:info@wambalga.ng" className="text-sm">info@wambalga.ng</a>
            </div>
            
            <div className="flex items-center gap-3 text-white hover:text-primary transition-colors">
              <Phone size={18} className="text-white shrink-0" />
              <a href="tel:+2349031932411" className="text-sm">+234 (0) 903 193 2411</a>
            </div>

            <div className="flex items-start gap-3 text-white">
              <MapPin size={18} className="text-white shrink-0 mt-1" />
              <p className="text-sm leading-relaxed">
                Wamba LGA Headquarters, <br />
                Nasarawa State, Nigeria.
              </p>
            </div>
          </div>

          {/* Column 2: Explore Links (3 cols width) */}
          <div className="lg:col-span-3">
            <h3 className="font-bold text-white text-lg mb-6">Explore</h3>
            <ul className="space-y-4 text-sm text-white">
              {['About Us', 'Council Personnel', 'Upcoming Events', 'Latest News', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="/" className="hover:text-primary transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Subscription (6 cols width) */}
          <div className="lg:col-span-6">
            <h3 className="font-display font-bold text-white text-2xl md:text-3xl leading-tight mb-4">
              Great city & place to develop your career & business.
            </h3>
            <p className="text-gray-400 mb-8 text-sm">
              Subscribe to get latest update & news
            </p>

            <form className="flex flex-col sm:flex-row gap-0" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter address" 
                className="w-full bg-white text-gray-800 px-6 py-4 focus:outline-none rounded-t-sm sm:rounded-l-sm sm:rounded-tr-none"
              />
              <button className="bg-primary text-white px-8 py-4 font-bold hover:bg-primary/90 transition-colors rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none mt-2 md:mt-0">
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* BOTTOM ROW: Copyright */}
        <div className="border-t border-gray-800 pt-4 text-center">
          <p className="text-gray-500 text-sm">
            © Copyright {currentYear} NSG Technologies
          </p>
        </div>

      </div>

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-primary text-white w-12 h-12 rounded flex items-center justify-center shadow-lg hover:bg-green-700 transition-all z-30 animate-bounce"
        aria-label="Scroll to top"
      >
        <ArrowUp size={24} />
      </button>

    </footer>
  );
};

export default Footer;