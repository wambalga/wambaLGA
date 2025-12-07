import { Mail } from 'lucide-react';

const Newsletter = () => {
  return (
    <section className="bg-green-50 py-6 relative overflow-hidden w-11/12  md:w-9/12 mx-auto mt-5 md:mt-24">
      {/* Optional: Add a subtle pattern overlay if you have one, 
          matching the faint cityscape in your desktop screenshot */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/city-lights.png')]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
          
          {/* LEFT SIDE: Icon & Text */}
          <div className="flex flex-col md:flex-row items-center gap-6">
            
            {/* The Circle Icon */}
            <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg shrink-0">
              <Mail className="text-white" size={36} />
            </div>

            {/* The Text */}
            <div className="text-secondary">
              <h2 className="font-display font-bold text-3xl">Subscribe!</h2>
              <p className="text-secondary mt-1 font-medium">
                Get latest news & events details
              </p>
            </div>
          </div>

          {/* RIGHT SIDE: The Form */}
          <div className="w-full md:w-auto">
            <form 
              className="flex flex-col sm:flex-row shadow-xl gap-2 md:gap-0"
              onSubmit={(e) => e.preventDefault()} // Prevent page reload for now
            >
              <input 
                type="email" 
                placeholder="Enter address" 
                className="px-6 py-4 w-full bg-white sm:w-80 text-gray-700 focus:outline-none focus:ring-2 focus:ring-secondary"
                required 
              />
              <button 
                type="submit"
                className="bg-primary text-white px-8 py-4 font-bold hover:bg-primary/90 transition-colors uppercase tracking-wider text-sm sm:w-auto w-full rounded-b-sm sm:rounded-r-sm sm:rounded-bl-none mt md:mt-0"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Newsletter;