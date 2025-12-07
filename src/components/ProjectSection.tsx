import { useEffect, useState, useRef } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
// Swiper Imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
// @ts-ignore
import 'swiper/css/bundle';

import { client } from '../lib/sanity';
import type { Project } from '../types';
import ProjectCard from './ui/ProjectCard';

const ProjectSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const swiperRef = useRef<SwiperType | null>(null);

  useEffect(() => {
    // Fetch projects
    client.fetch(`*[_type == "project"] | order(startDate desc)`)
      .then(setProjects)
      .catch(console.error);
  }, []);

  return (
    <section className="py-5 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Custom Navigation Arrows */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <span className="text-primary font-bold tracking-widest text-sm uppercase block mb-2">
              Our Projects
            </span>
            <div className="w-24 h-1 bg-primary  mt-1 rounded-full"></div>
            <h2 className="font-display font-bold text-3xl mt-4 sm:text-4xl text-secondary leading-tight">
              Explore the Completed and Ongoing Projects of the Administration
            </h2>
          </div>

          {/* Custom Arrows (Circle Buttons from your UI) */}
          <div className="flex gap-4">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowLeft size={24} />
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center hover:bg-primary hover:text-white transition-colors"
            >
              <ArrowRight size={24} />
            </button>
          </div>
        </div>

        {/* The Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          breakpoints={{
            // Mobile: 1 slide per view
            640: {
              slidesPerView: 1,
            },
            // Tablet: 2 slides
            768: {
              slidesPerView: 2,
            },
            // Desktop: 3 slides
            1024: {
              slidesPerView: 3,
            },
          }}
          className="pb-10" // Padding for shadow
        >
          {projects.map((project) => (
            <SwiperSlide key={project._id} className="h-auto">
               <ProjectCard project={project} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default ProjectSection;