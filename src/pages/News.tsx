import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Folder, MessageCircle, User } from 'lucide-react'; // Icons
import { client, urlFor } from '../lib/sanity';
import type { Post } from '../types';
import NewsSidebar from '../components/NewsSidebar'; // Import Sidebar

const News = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    // Fetch ALL posts (we handle pagination in frontend for simplicity)
    const query = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      // We fetch the first block of the body to use as an "excerpt"
      "excerpt": body[0].children[0].text 
    }`;

    client.fetch(query)
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  // Pagination Logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  if (loading) return <div className="p-20 text-center">Loading News...</div>;

  return (
    <div className="bg-white min-h-screen pb-20">
      
      {/* 1. Page Header */}
      <div className="bg-[#051025] text-white py-16 text-center">
        <h1 className="font-display font-bold text-4xl">News & Updates</h1>
        <p className="mt-2 text-gray-300">Stay informed about Wamba LGA developments</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        
        {/* 2. Main Layout Grid (Left Content + Right Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* LEFT COLUMN: Main Article List (Span 2) */}
          <div className="lg:col-span-2">
            <div className="space-y-12">
              {currentPosts.map((post) => (
                <article key={post._id} className="flex flex-col gap-4">
                  
                  {/* Image */}
                  <div className="w-full h-64 sm:h-80 bg-gray-200 rounded-lg overflow-hidden">
                    {post.mainImage && (
                      <img
                        src={urlFor(post.mainImage).width(800).height(500).url()}
                        alt={post.title}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>

                  {/* Meta Data */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1.5 text-green-600">
                      <Calendar size={14} />
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'long', day: 'numeric', year: 'numeric'
                      })}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Folder size={14} />
                      <span>Uncategorized</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MessageCircle size={14} />
                      <span>0 Comments</span>
                    </div>
                  </div>

                  {/* Title & Excerpt */}
                  <h2 className="text-2xl font-bold text-secondary font-display hover:text-primary transition-colors">
                    <Link to={`/news/${post.slug.current}`}>{post.title}</Link>
                  </h2>
                  <p className="text-gray-600 leading-relaxed line-clamp-3">
                    {/* Display the excerpt we fetched, or a fallback */}
                    {(post as any).excerpt || "Click read more to view the full details of this news update from the Wamba Local Government administration."}
                  </p>

                  {/* Button */}
                  <div>
                    <Link 
                      to={`/news/${post.slug.current}`}
                      className="inline-block bg-primary text-white px-6 py-2 rounded font-semibold text-sm hover:bg-green-700 transition-colors"
                    >
                      Read more
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                  <button
                    key={number}
                    onClick={() => paginate(number)}
                    className={`w-10 h-10 rounded border flex items-center justify-center font-bold transition-colors
                      ${currentPage === number 
                        ? 'bg-primary text-white border-primary' 
                        : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}
                    `}
                  >
                    {number}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Sidebar (Span 1) */}
          <div className="lg:col-span-1">
             {/* Pass all posts so sidebar can filter the latest and calculate archives */}
            <NewsSidebar allPosts={posts} />
          </div>

        </div>
      </div>
    </div>
  );
};

export default News;