import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar'; // Import the new component
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import DepartmentDetail from './pages/DepartmentDetail';
import Council from './pages/Council';
import News from './pages/News';
import About from './pages/About';
import Contact from './pages/Contact';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Add placeholders for other routes so links don't break */}
        <Route path="/departments/:slug" element={<DepartmentDetail />} />
        <Route path="/council" element={<Council />} />
        <Route path="/news" element={<News />} />
        
        {/* Dynamic Route for single post (We will build this later) */}
        <Route path="/news/:slug" element={<div className="p-20">Single Article Coming Soon...</div>} />
        <Route path="/about" element={<About />} />
        <Route path="/council" element={<div className="p-10">Council Page Coming Soon</div>} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;