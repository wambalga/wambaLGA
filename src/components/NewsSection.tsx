import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../lib/sanity';
import type { Post } from '../types';
import NewsCard from './ui/NewsCard';

const NewsSection = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Fetch only the latest 3 posts
    const query = `*[_type == "post"] | order(publishedAt desc)[0...3] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt
    }`;

    client.fetch(query)
      .then(setPosts)
      .catch(console.error);
  }, []);

  return (
    <section className="py-10 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-left mb-16">
          <span className="text-primary font-bold tracking-widest text-sm uppercase">
            From the Blog
          </span>
          <div className="w-24 h-1 bg-primary  mt-1 rounded-full"></div>
          <h2 className="mt-4 font-display font-bold text-3xl sm:text-4xl text-secondary">
            Latest news & Articles from Wamba LGA
          </h2>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <NewsCard key={post._id} post={post} />
          ))}
        </div>

        {/* 'View All' Button (Requested Feature) */}
        <div className="mt-12 text-center">
          <Link
            to="/news"
            className="inline-block border-2 border-primary text-primary font-bold py-3 px-8 rounded-md hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All News
          </Link>
        </div>

      </div>
    </section>
  );
};

export default NewsSection;