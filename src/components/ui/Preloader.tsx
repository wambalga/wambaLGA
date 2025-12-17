import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // 1. Lock scroll
    document.body.style.overflow = 'hidden';

    // 2. Timer: 5.5 seconds total life
    // Timeline:
    // 0.5s: Initial Pause
    // 4.0s: Smooth Zoom
    // 1.0s: Hold on target
    const timer = setTimeout(() => {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }, 5500);

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
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        >
          <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
            <motion.img
              src="/images/nasarawa-map.jpeg" 
              alt="Loading Map"
              className="w-[80%] md:w-[40%] h-auto object-contain"
              
              initial={{ scale: 1 }}
              animate={{ scale: 5 }} // Increased scale to ensure we really enter the map
              transition={{ 
                delay: 0.5,     // Slight pause at start
                duration: 4,    // Long, slow duration for smoothness
                ease: [0.42, 0, 0.58, 1] // "easeInOut" curve for smooth acceleration & deceleration
              }}
              style={{
                // Optimization: tells browser to prepare for heavy movement
                willChange: "transform",
                
                // Keep your specific target coordinates
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