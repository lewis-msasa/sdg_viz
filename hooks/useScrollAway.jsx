import { useState, useEffect, useRef } from 'react';

export const useScrollAway = (options = {}) => {
  const [isComponentVisible, setIsComponentVisible] = useState(true);
  const targetRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(([entry]) => {
      // Hide when scrolling down past the component
      // Show when scrolling up or when component is in view
      setIsComponentVisible(
        entry.isIntersecting || 
        entry.boundingClientRect.top > 0
      );
    }, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
      ...options
    });

    if (targetRef.current) {
      observerRef.current.observe(targetRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [options]);

  return [targetRef, isComponentVisible];
};

export const useVisibilityOnScroll = () => {
    const [isVisible, setIsVisible] = useState(false);
    const elementRef = useRef(null);
  
    const handleScroll = () => {
      if (elementRef.current) {
        const rect = elementRef.current.getBoundingClientRect();
        const isOutOfView = rect.bottom < 0 || rect.top > window.innerHeight;
        
        if(isOutOfView){
            setIsVisible(!isOutOfView);
        }
       
      }
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return { isVisible, setIsVisible, elementRef };
  };
  
  export default useVisibilityOnScroll;


export const HideWhenAway = ({ children }) => {
  const [ref, isVisible] = useScrollAway({
    threshold: Array.from({ length: 100 }, (_, i) => i * 0.01), // More precise tracking
    rootMargin: '-20% 0px -70% 0px' // Adjust trigger zones
  });

  return (
    <div 
      ref={ref}
      style={{
        transition: 'all 0.3s ease',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      {children}
    </div>
  );
};

// Usage Example:
const App = () => (
  <div>
    <Header />
    <MainContent />
    
    <HideWhenAway>
      <FloatingActionButton />
    </HideWhenAway>
    
    <Footer />
  </div>
);