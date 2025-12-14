import Hero from '../components/layout/Hero';
import DepartmentSection from '../components/DepartmentSection';
import ChairmanMessage from '../components/ChairmanMessage';
import ProjectSection from '../components/ProjectSection';
import NewsSection from '../components/NewsSection'; // Import
import DocumentSection from '../components/DocumentSection';
import TestimonialSection from '../components/TestimonialSection';
import GallerySection from '../components/GallerySection';
import Newsletter from '../components/Newsletter';
import FadeIn from '../components/ui/FadeIn';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <FadeIn>
      <Hero />
      </FadeIn>
      <FadeIn delay={0.2}>
      <DepartmentSection />
      </FadeIn>
      <FadeIn>
      <ChairmanMessage />
      </FadeIn>
      <FadeIn>
      <ProjectSection />
      </FadeIn>
      <FadeIn>
      <NewsSection />
      </FadeIn>
      <FadeIn>
      <DocumentSection />
      </FadeIn>
      <FadeIn>
      <TestimonialSection />
      </FadeIn>
      <FadeIn>
      <GallerySection />
      </FadeIn>
      <FadeIn>
      <Newsletter />
      </FadeIn>
    </div>
  );
};

export default Home;