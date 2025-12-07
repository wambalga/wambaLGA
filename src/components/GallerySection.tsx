import { useEffect, useState } from 'react';
import { client, urlFor } from '../lib/sanity';
import type { GalleryImage } from '../types';

const GallerySection = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  // New State: Track which image is currently "active" (tapped) on mobile
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "galleryImage"] | order(_createdAt desc)[0...5]`)
      .then(setImages)
      .catch(console.error);
  }, []);

  if (images.length === 0) return null;

  // Mobile Helper: Toggle the overlay when tapped
  const handleTap = (id: string) => {
    if (activeId === id) {
      setActiveId(null); // Tap again to close
    } else {
      setActiveId(id); // Tap to open
    }
  };

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 text-center">
      <span className="text-primary font-bold tracking-widest text-sm uppercase">
            From the Wamba Gallery
          </span>
        <h2 className="text-center font-display font-bold text-3xl sm:text-4xl text-secondary">
          Explore our beautiful city
        </h2>
        <div className="w-24 h-1 bg-primary mx-auto mt-2 rounded-full"></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-5 gap-2">
          {images.map((item) => {
            // Check if this specific card is active
            const isActive = activeId === item._id;

            return (
              <div 
                key={item._id} 
                className="relative group h-64 md:h-80 rounded-lg overflow-hidden cursor-pointer"
                onClick={() => handleTap(item._id)} // 1. Add Click Handler
              >
                
                <img 
                  src={urlFor(item.image).width(400).height(600).url()} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* 2. Update Overlay Logic:
                    - group-hover:opacity-100 (Works on Desktop Hover)
                    - isActive ? 'opacity-100' : '' (Works on Mobile Tap)
                */}
                <div 
                  className={`absolute inset-0 bg-primary/90 p-6 flex flex-col justify-end text-white transition-opacity duration-300 
                    opacity-0 group-hover:opacity-100 
                    ${isActive ? '!opacity-100' : ''} 
                  `}
                >
                  <h3 className="font-bold text-xl mb-2">{item.title}</h3>
                  {item.details && (
                    <p className="text-sm leading-relaxed text-white/90">
                      {item.details}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default GallerySection;