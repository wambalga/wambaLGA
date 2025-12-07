import { Link } from 'react-router-dom';
import { MessageCircle, Folder } from 'lucide-react'; // Icons
import { urlFor } from '../lib/sanity';
import type { Post } from '../types';

interface SidebarProps {
  allPosts: Post[];
}

const NewsSidebar = ({ allPosts }: SidebarProps) => {
  // 1. Get Top 3 Latest Posts
  const latestPosts = allPosts.slice(0, 3);

  // 2. Generate Archive List (Group by Month Year)
  // We use a Set to ensure unique "Month Year" strings
  const archiveSet = new Set(
    allPosts.map((post) => {
      const date = new Date(post.publishedAt);
      return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
    })
  );
  const archives = Array.from(archiveSet);

  return (
    <div className="space-y-10">
      
      {/* WIDGET 1: LATEST POSTS */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="font-display font-bold text-xl text-secondary mb-6 border-b border-gray-200 pb-2">
          Latest Posts
        </h3>
        <div className="space-y-6">
          {latestPosts.map((post) => (
            <div key={post._id} className="flex gap-4 group">
              {/* Thumbnail */}
              <div className="w-20 h-20 shrink-0 overflow-hidden rounded-md bg-gray-200">
                {post.mainImage && (
                  <img
                    src={urlFor(post.mainImage).width(150).height(150).url()}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                )}
              </div>
              
              {/* Info */}
              <div>
                <div className="flex items-center gap-1 text-xs text-green-600 mb-1">
                  <span className="font-bold">Admin</span>
                  <MessageCircle size={10} />
                  <span>0</span>
                </div>
                <Link 
                  to={`/news/${post.slug.current}`} 
                  className="font-bold text-sm text-secondary leading-snug hover:text-primary transition-colors line-clamp-2"
                >
                  {post.title}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* WIDGET 2: ARCHIVES */}
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
        <h3 className="font-display font-bold text-xl text-secondary mb-6 border-b border-gray-200 pb-2">
          Archives
        </h3>
        <ul className="space-y-3">
          {archives.map((dateString) => (
            <li key={dateString}>
              <button className="flex items-center gap-2 text-gray-500 hover:text-primary transition-colors text-sm w-full">
                <Folder size={16} />
                {dateString}
              </button>
            </li>
          ))}
          {archives.length === 0 && <li className="text-gray-400 text-sm">No archives yet.</li>}
        </ul>
      </div>

    </div>
  );
};

export default NewsSidebar;