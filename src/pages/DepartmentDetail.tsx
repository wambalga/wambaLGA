import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { client } from '../lib/sanity';
import type { Department } from '../types';
import { RenderIcon } from '../lib/iconMap';
import { PortableText } from '@portabletext/react'; // You might need to install this: npm install @portabletext/react

const DepartmentDetail = () => {
  const { slug } = useParams(); // Get the slug from URL
  const [dept, setDept] = useState<Department | null>(null);

  useEffect(() => {
    client.fetch(
      `*[_type == "department" && slug.current == $slug][0]`, 
      { slug }
    )
    .then(setDept)
    .catch(console.error);
  }, [slug]);

  if (!dept) return <div className="p-20 text-center">Loading...</div>;

  return (
    <div className="bg-gray-50 min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        
        <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-primary mb-8">
          <ArrowLeft size={20} /> Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          {/* Header */}
          <div className="flex items-center gap-6 mb-8 border-b border-gray-100 pb-8">
          <div className="w-20 h-20 p-4 bg-green-50 rounded-full text-primary flex items-center justify-center text-4xl">
               <RenderIcon iconName={dept.icon} />
            </div>
            <h1 className="font-display font-bold text-3xl sm:text-4xl text-secondary">
              {dept.title}
            </h1>
          </div>

          {/* Rich Text Content */}
          <div className="prose prose-lg text-gray-600 max-w-none">
            {/* If you haven't installed @portabletext/react, you can just dump text for now, 
                but I recommend installing it for rich text support */}
             {dept.description && <PortableText value={dept.description} />}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DepartmentDetail;