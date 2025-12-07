import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react'; // Icons for the list
import { client, urlFor } from '../lib/sanity';
import type { Staff } from '../types';

const ChairmanMessage = () => {
  const [chairman, setChairman] = useState<Staff | null>(null);

  useEffect(() => {
    // Fetch ONLY the person with rank 1 (The Chairman)
    const query = `*[_type == "staff" && rank == 1][0]{
      name,
      role,
      photo,
      bio
    }`;

    client.fetch(query)
      .then(setChairman)
      .catch(console.error);
  }, []);

  if (!chairman) return null; // Don't show if no data yet

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: Image with Gold Nameplate */}
          <div className="w-full lg:w-1/2 relative">
            <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-100 group">
              {/* The Image */}
              {chairman.photo && (
                <img
                  src={urlFor(chairman.photo).width(500).height(600).url()}
                  alt={chairman.name}
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
              )}
              
              {/* Gold Nameplate Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#cc9933] p-4 text-center rounded-sm shadow-lg border border-[#b88626]">
                <h3 className="font-display font-bold text-md md:text-xl text-secondary uppercase tracking-wider">
                  {chairman.name}
                </h3>
                <p className="text-white text-xs font-bold uppercase tracking-widest mt-1">
                  {chairman.role}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="w-full lg:w-1/2">
          <span className="text-primary font-bold tracking-widest text-sm uppercase">
            From the Blog
          </span>
          <div className="w-24 h-1 bg-primary  mt-1 rounded-full"></div>
            
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-secondary leading-tight my-6">
              Engage with the ideological pioneer, shaping the future generation
            </h2>

            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {chairman.bio || "Committed to solving problems for the people across the local government under his leadership."}
            </p>

            {/* Static Key Points (You can make these dynamic later if needed) */}
            <div className="space-y-4 mb-8">
              {['Quality Education', 'Infrastructure Development', 'Healthcare & Wellbeing'].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2 className="text-secondary" size={20} />
                  <span className="font-bold text-secondary">{item}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar Visual */}
            <div className="mb-8">
              <div className="flex justify-between text-sm font-bold text-secondary mb-2">
                <span>City Development</span>
                <span>85%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary h-2.5 rounded-full w-[85%]"></div>
              </div>
            </div>

            {/* The Button */}
            <Link 
              to="/council"
              className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-md font-bold hover:bg-primary-dark transition-colors"
            >
              View Council Members <ArrowRight size={20} />
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ChairmanMessage;