import { useEffect, useState } from 'react';
import { Download, FileText } from 'lucide-react';
import { client } from '../lib/sanity';
import type { CityDocument } from '../types';

const DocumentSection = () => {
  const [documents, setDocuments] = useState<CityDocument[]>([]);

  useEffect(() => {
    // Fetch documents, newest first
    // Note: We specifically ask for 'file.asset->url' to get the download link
    const query = `*[_type == "cityDocument"] | order(publishedAt desc)[0...5] {
      _id,
      title,
      publishedAt,
      file {
        asset->{
          url
        }
      }
    }`;

    client.fetch(query)
      .then(setDocuments)
      .catch(console.error);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* The Card Container */}
        <div className="bg-secondary rounded-3xl relative overflow-hidden shadow-2xl">
          
          {/* 1. Green Diagonal Corner */}
          {/* We use absolute positioning + clip-path to create the triangle */}
          <div 
            className="absolute top-0 right-0 w-32 h-32 sm:w-48 sm:h-48 bg-primary z-10"
            style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
          ></div>

          <div className="p-8 sm:p-12 relative z-20">
            
            {/* 2. Header Section */}
            <div className="mb-10 ">
              <h2 className="text-white font-display font-bold text-3xl sm:text-4xl mb-6 leading-tight">
                DOWNLOAD CITY <br /> DOCUMENTS
              </h2>
              
              {/* PDF Icon Badge */}
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary">
                <FileText size={28} />
                <span className="absolute text-[8px] font-bold mt-1 text-primary bg-white px-1">PDF</span>
              </div>
            </div>

            {/* 3. Document List */}
            <div className="space-y-6">
              {documents.map((doc) => {
                // Format Date: "June 20, 2025"
                const dateString = new Date(doc.publishedAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                });

                return (
                  <div key={doc._id} className="border-b border-white/20 pb-4 last:border-0 last:pb-0 group">
                    <div className="flex justify-between items-end">
                      
                      {/* Left: Info */}
                      <div>
                        <p className="text-gray-400 text-sm mb-1">{dateString}</p>
                        <h3 className="text-white font-bold text-lg sm:text-xl group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>
                      </div>

                      {/* Right: Download Button */}
                      <a 
                        href={`${doc.file.asset.url}?dl=`} // ?dl= forces the browser to download instead of opening
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white group-hover:text-primary transition-colors transform group-hover:translate-y-1 duration-300"
                        title="Download File"
                      >
                        <Download size={28} />
                      </a>
                    </div>
                  </div>
                );
              })}

              {documents.length === 0 && (
                <div className="text-gray-400 italic">No documents available at the moment.</div>
              )}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default DocumentSection;