import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css/bundle';

import { client, urlFor } from '../lib/sanity';
import type { Testimonial } from '../types';

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    client.fetch(`*[_type == "testimonial"]`)
      .then(setTestimonials)
      .catch(console.error);
  }, []);

  // Helper to render stars
  const renderStars = (rating: number) => {
    return [...Array(5)].map((_, i) => (
      <Star 
        key={i} 
        size={16} 
        className={`${i < rating ? 'fill-green-500 text-green-500' : 'fill-gray-200 text-gray-200'}`} 
      />
    ));
  };

  return (
    <section className="py-5 bg-white overflow-hidden w-11/12 md:w-9/12 mx-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* LEFT COLUMN: Header & Controls */}
          <div className="lg:w-1/3 flex flex-col justify-center">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Our Testimonials
            </span>
            <h2 className="font-display font-bold text-4xl sm:text-5xl text-secondary leading-tight mb-4">
              What they’re talking about us?
            </h2>
            <p className="text-gray-500 mb-8">
              Feedback from citizens, businesses, and organizations committed to the Wamba project.
            </p>

            {/* Navigation Buttons */}
            <div className="flex gap-4">
              <button 
                onClick={() => swiperRef.current?.slidePrev()}
                className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <ArrowLeft size={18} />
              </button>
              <button 
                onClick={() => swiperRef.current?.slideNext()}
                className="w-12 h-12 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Slider */}
          <div className="lg:w-2/3 w-full min-w-0"> {/* min-w-0 is crucial for Swiper inside Flexbox */}
            <Swiper
              modules={[Navigation, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              autoplay={{ delay: 5000 }}
              onBeforeInit={(swiper) => {
                swiperRef.current = swiper;
              }}
              breakpoints={{
                // Tablet/Desktop show 2 cards
                768: {
                  slidesPerView: 2,
                }
              }}
            >
              {testimonials.map((item) => (
                <SwiperSlide key={item._id} className="h-auto">
                  <div className="bg-white border border-gray-100 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
                    
                    {/* User Profile */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-14 h-14 bg-gray-200 rounded-full overflow-hidden shrink-0">
                        {item.photo ? (
                          <img 
                            src={urlFor(item.photo).width(100).height(100).url()} 
                            alt={item.name} 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-300"></div> // Fallback
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-secondary text-lg">{item.name}</h4>
                        <p className="text-xs text-gray-500 uppercase tracking-wide">{item.role}</p>
                        <div className="flex gap-1 mt-1">
                          {renderStars(item.rating)}
                        </div>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="text-gray-600 leading-relaxed italic">
                      "{item.text}"
                    </p>

                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;