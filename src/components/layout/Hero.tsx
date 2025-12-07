import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-surface flex flex-col-reverse md:block">
      {/* MOBILE LAYOUT STRATEGY: 
         1. We use 'flex-col' on the section to stack Image then Text on mobile.
         2. On Desktop (md:), we switch to 'block' to allow absolute positioning.
      */}

      {/* RIGHT COLUMN (Image) - Appears First on Mobile */}
      <div className="relative w-full h-64 md:absolute md:inset-y-0 md:right-0 md:w-1/2 md:h-full">
        {/* THE SLANT FIX:
           - default (mobile): No clip-path.
           - md (desktop): Apply the polygon clip-path.
        */}
<div className="h-full px-4 pb-12 md:px-0 md:pb-0">
           <div className="w-full h-full relative overflow-hidden rounded-xl md:rounded-none md:[clip-path:polygon(15%_0,100%_0,100%_100%,0%_100%)]">
            <img 
                src="/images/hero-banner.jpeg" 
                alt="Wamba Landscape" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-secondary/10"></div>
           </div>
        </div>
      </div>

      {/* LEFT COLUMN (Text) - Appears Second on Mobile */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="md:w-1/2 px-6 py-12 md:py-32 lg:py-28 md:pr-12 bg-surface">
          <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight text-center md:text-left">
            <span className="block text-secondary">WELCOME TO</span>
            <span className="block text-primary">WAMBA LGA </span>
          </h1>
          
          <p className="mt-6 text-base sm:text-lg text-gray-600 leading-relaxed text-center md:text-left">
            Wamba LGA is a hub of culture, agriculture, and tourism. We are dedicated 
            to building a transparent, progressive, and efficient administration that 
            connects our people with quality services.
          </p>

        </div>
      </div>
    </section>
  );
};

export default Hero;