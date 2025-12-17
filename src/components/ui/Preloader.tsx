import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Lock the body scroll so user can't scroll while loading
    document.body.style.overflow = 'hidden';

    // 2. Timer to end the animation
    // Timeline: 
    // 0s - 1s: View Map
    // 1s - 2.5s: Zoom In
    // 2.5s: Fade Out
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset'; // Unlock scroll
    }, 2800);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
          exit={{ opacity: 0 }} // Fade out the white screen
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.img
              src="/images/nasarawa-map.svg" 
              alt="Loading Map"
              className="w-[80%] md:w-[40%] h-auto object-contain"
              
              initial={{ scale: 1 }}
              animate={{ scale: 5 }} // Zoom level (30x makes it huge, filling screen)
              transition={{ 
                delay: 1,      // Wait 1 second before zooming
                duration: 4.5, // Take 1.8 seconds to zoom
                ease: [0.25, 0, 0.24, 1] // Custom bezier for "smooth start, fast middle, smooth end"
              }}
              style={{
                // CRITICAL SETTING: THE "ZOOM TARGET"
                // You must adjust these % values to match where Wamba is on your specific SVG.
                // 50% 50% is dead center.
                // If Wamba is top-right, try "70% 30%"
                transformOrigin: "67% 20%" 
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;