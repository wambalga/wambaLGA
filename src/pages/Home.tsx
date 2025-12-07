import Hero from '../components/layout/Hero';
import DepartmentSection from '../components/DepartmentSection';
import ChairmanMessage from '../components/ChairmanMessage';
import ProjectSection from '../components/ProjectSection';
import NewsSection from '../components/NewsSection'; // Import
import DocumentSection from '../components/DocumentSection';
import TestimonialSection from '../components/TestimonialSection';
import GallerySection from '../components/GallerySection';
import Newsletter from '../components/Newsletter';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Hero />
      <DepartmentSection />
      <ChairmanMessage />
      <ProjectSection />
      {/* Add the News Section here */}
      <NewsSection />
      <DocumentSection />
      <TestimonialSection />
      <GallerySection />
      <Newsletter />
    </div>
  );
};

export default Home;