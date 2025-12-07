import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { PortableText } from '@portabletext/react';
import { client, urlFor } from '../lib/sanity';
import type { Post } from '../types';

const NewsDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch the single post based on the slug from the URL
    const query = `*[_type == "post" && slug.current == $slug][0]{
      title,
      mainImage,
      publishedAt,
      body
    }`;

    client.fetch(query, { slug })
      .then((data) => {
        setPost(data);
        setLoading(false);
      })
      .catch(console.error);
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Loading Article...</div>;
  if (!post) return <div className="p-20 text-center">Article not found</div>;

  // Custom components to render images inside the body text
  const ptComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) {
          return null;
        }
        return (
          <img
            src={urlFor(value).width(800).fit('max').auto('format').url()}
            alt={value.alt || 'Article image'}
            className="w-full h-auto rounded-lgmy-8"
          />
        );
      }
    }
  };

  return (
    <div className="bg-white min-h-screen pb-20">
      {/* Hero Image */}
      <div className="h-[400px] w-full relative bg-gray-900">
        {post.mainImage && (
          <img 
            src={urlFor(post.mainImage).width(1200).height(600).url()} 
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-8 max-w-4xl mx-auto">
          <Link to="/news" className="text-white/80 hover:text-white flex items-center gap-2 mb-6 w-fit transition-colors">
            <ArrowLeft size={20} /> Back to News
          </Link>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-6 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <Calendar size={16} />
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                month: 'long', day: 'numeric', year: 'numeric'
              })}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} />
              <span>Admin</span>
            </div>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        {/* The 'prose' class fixes your LIST issue. 
           It automatically adds bullets, numbers, and spacing.
           'prose-lg' makes the text slightly larger and easier to read.
           'prose-green' styles links and accents with your primary color.
        */}
        <div className="prose prose-lg prose-green max-w-none">
          <PortableText 
            value={post.body} 
            components={ptComponents}
          />
        </div>
      </article>
    </div>
  );
};

export default NewsDetail;