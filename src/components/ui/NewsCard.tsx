import { Link } from 'react-router-dom';
import { ArrowRight, User, MessageCircle } from 'lucide-react';
import { urlFor } from '../../lib/sanity';
import type { Post } from '../../types';

interface NewsCardProps {
  post: Post;
}

const NewsCard = ({ post }: NewsCardProps) => {
  // Format Date Logic: Splits "2025-11-12" into "12" and "NOV, 2025"
  const dateObj = new Date(post.publishedAt);
  const day = dateObj.getDate();
  const monthYear = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full">
      
      {/* 1. Image Container with Floating Date Badge */}
      <div className="relative h-48 overflow-hidden group">
        {post.mainImage ? (
          <img
            src={urlFor(post.mainImage).width(500).height(400).url()}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">No Image</div>
        )}

        {/* The Green Date Badge */}
        <div className="absolute top-4 left-4 bg-primary text-white text-center py-2 px-3 rounded shadow-3xl  min-w-[70px]">
          <span className="block text-2xl font-bold leading-none">{day}</span>
          <span className="block text-[10px] font-medium uppercase tracking-wider mt-1 opacity-90">
            {monthYear}
          </span>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="p-6 flex flex-col grow">
        
        {/* Meta Data (Author & Comments) */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3 border-b border-gray-100 pb-3">
          <div className="flex items-center gap-1.5">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <User size={12} />
            </div>
            <span>Media Team</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MessageCircle size={12} />
            <span>0 Comments</span>
          </div>
        </div>

        {/* Title */}
        <Link to={`/news/${post.slug.current}`} className="block mb-4">
          <h3 className="text-xl font-bold text-secondary font-display hover:text-primary transition-colors line-clamp-3">
            {post.title}
          </h3>
        </Link>

        {/* View Button */}
        <div className="mt-auto pt-4">
          <Link 
            to={`/news/${post.slug.current}`}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-primary transition-colors bg-gray-100 px-4 py-2 rounded-md hover:bg-green-50 w-full justify-between"
          >
            View News <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;