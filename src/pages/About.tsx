import { useEffect, useState } from 'react';
import { CheckCircle2, Users } from 'lucide-react'; // Icons
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../lib/sanity';
import type { AboutPageData } from '../types';
import TestimonialSection from '../components/TestimonialSection';
import FadeIn from '../components/ui/FadeIn';

const About = () => {
  const [data, setData] = useState<AboutPageData | null>(null);

  useEffect(() => {
    // Fetch the most recent 'aboutPage' document
    client.fetch(`*[_type == "aboutPage"][0]`)
      .then(setData)
      .catch(console.error);
  }, []);

  if (!data) return <div className="p-20 text-center">Loading About Page...</div>;

  return (
    <div className="min-h-screen mx-auto pb-20">
      
      {/* --- SECTION 1: INTRO (Hero) --- */}
      <FadeIn>
      <section className="w-11/12 md:w-11/12 mx-auto sm:px-6 lg:px-8 py-10 md:py-20">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          
          {/* Left: Image with Green Overlay */}
          <div className="lg:w-1/2 relative">
            <div className="rounded-lg overflow-hidden h-[600px] shadow-xl">
              {data.introImage && (
                <img 
                  src={urlFor(data.introImage).url()} 
                  alt="Wamba Landscape" 
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {/* The Green Box "Stronger Together" */}
            <div className="absolute bottom-80 left-0 bg-primary/60 text-white p-8 w-64 shadow-2xl rounded-r-lg">
              <Users size={40} className="mb-2" />
              <h3 className="font-bold text-white text-xl leading-tight">Stronger Together</h3>
            </div>
          </div>

          {/* Right: Text Content */}
          <div className="lg:w-1/2">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Get to Know Us
            </span>
            <div className="w-34 h-1 bg-primary mt-2"></div>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-secondary mt-3 mb-6">
              {data.introHeading}
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {data.introText}
            </p>

            {/* Bullet Points */}
            <div className="space-y-4 mb-10">
              {data.keyPoints?.map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary shrink-0" size={20} />
                  <span className="font-bold text-secondary">{point}</span>
                </div>
              ))}
            </div>

            {/* Signature Area */}
            <div className="flex items-center gap-4 border-t border-gray-100 pt-8">
              {data.chairmanSign && (
                <img 
                  src={urlFor(data.chairmanSign).width(200).url()} 
                  alt="Signature" 
                  className="h-16 object-contain"
                />
              )}
            </div>
          </div>
        </div>
      </section>
      </FadeIn>


      {/* --- SECTION 1b: HISTORICAL BACKGROUND --- */}
      <FadeIn delay={0.2}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-10">
        <div className="">
          {/* Subtitle with Green Line */}
          <div className="mb-4">
           
            <span className="text-primary font-bold tracking-widest text-sm uppercase">
              {data.historySubtitle || 'WAMBA LGA'}
            </span>
            <div className="w-34 h-1 bg-primary mt-2"></div>
          </div>
          
          {/* Main Title */}
          <h2 className="font-display font-bold text-4xl text-secondary mb-8">
            {data.historyTitle}
          </h2>

          {/* Rich Text Content */}
          <div className="prose prose-lg text-gray-600 max-w-none leading-relaxed text-justify">
            <PortableText value={data.historyText} />
          </div>
        </div>
      </section>
      </FadeIn>


      {/* --- SECTION 2: THE PEOPLE --- */}
      <FadeIn delay={0.2}>
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            
            {/* Text Left */}
            <div className="lg:w-1/2">
            <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
              Get to Know
            </span>
            <div className="w-20 h-1 bg-primary mt-2"></div>
              <h2 className="font-display font-bold text-4xl mt-3 text-secondary mb-8">
                {data.peopleTitle}
              </h2>
              <div className="prose prose-lg text-gray-600">
                <PortableText value={data.peopleText} />
              </div>
            </div>

            {/* Image Right */}
            <div className="lg:w-1/2">
              <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white h-[500px]">
                 {data.peopleImage && (
                  <img 
                    src={urlFor(data.peopleImage).url()} 
                    alt="The People" 
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
      </FadeIn>


      {/* --- SECTION 3: CULTURE & OCCUPATION (Grid) --- */}
      <FadeIn>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 bg-green-50 rounded-lg">
          
          {/* 1. Festivals */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-display font-bold text-2xl text-secondary mb-4 border-b border-gray-200 pb-2">
              Festivals and Traditions
            </h3>
            <div className="prose text-gray-600">
              <PortableText value={data.festivalsText} />
            </div>
          </div>

          {/* 2. Cuisine */}
          <div className="bg-gray-50 p-8 rounded-lg">
             <h3 className="font-display font-bold text-2xl text-secondary mb-4 border-b border-gray-200 pb-2">
              Cuisine
            </h3>
            <div className="prose text-gray-600">
              <PortableText value={data.cuisineText} />
            </div>
          </div>

          {/* 3. Language */}
          <div className="bg-gray-50 p-8 rounded-lg">
             <h3 className="font-display font-bold text-2xl text-secondary mb-4 border-b border-gray-200 pb-2">
              Language and Religion
            </h3>
            <div className="prose text-gray-600">
              <PortableText value={data.languageText} />
            </div>
          </div>

          {/* 4. Occupation */}
          <div className="bg-gray-50 p-8 rounded-lg">
             <h3 className="font-display font-bold text-2xl text-secondary mb-4 border-b border-gray-200 pb-2">
              Occupation
            </h3>
            <div className="prose text-gray-600">
              <PortableText value={data.occupationText} />
            </div>
          </div>

        </div>
      </section>
      </FadeIn>


      {/* --- SECTION 4: TRADITIONAL RULERS --- */}
      <FadeIn delay={0.2}>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 border-t border-gray-100">
        <div className="text-center mb-16">
          <span className="text-primary font-bold tracking-widest text-sm uppercase mb-2 block">
            Custodians of Culture and Tradition
          </span>
          <div className="w-34 h-1 bg-primary mx-auto mt-2"></div>
          <h2 className="font-display font-bold text-4xl mt-5 text-secondary">
            Traditional Rulers
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.rulers?.map((ruler) => (
            <div key={ruler._key} className="bg-white p-8 rounded-xl shadow-sm border border-gray-100 text-center hover:shadow-lg transition-shadow">
              
              {/* Circular Image */}
              <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-gray-50 mb-6">
                {ruler.photo ? (
                  <img 
                    src={urlFor(ruler.photo).width(200).height(200).url()} 
                    alt={ruler.name} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200"></div>
                )}
              </div>

              <h3 className="font-display font-bold text-xl text-secondary mb-1">
                {ruler.name}
              </h3>
              <p className="text-green-600 text-sm font-medium uppercase tracking-wide">
                {ruler.title}
              </p>
            </div>
          ))}
        </div>
      </section>
      </FadeIn>

      {/* --- TESTIMONIAL SECTION --- */}
      <FadeIn delay={0.2}>
      <TestimonialSection />
      </FadeIn>
    </div>
  );
};

export default About;