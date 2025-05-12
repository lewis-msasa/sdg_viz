import { useState, useEffect, useRef } from 'react';

export const useScrollVisibility = (options) => {
  const [isVisible, setIsVisible] = useState(true);
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [options]);

  return [targetRef, isVisible];
};
export const HideOnScroll = ({ children }) => {
  const [targetRef, isVisible] = useScrollVisibility({
    threshold: 0.1, // Trigger when 10% of element is visible
    rootMargin: '-50px 0px' // Adjust trigger point
  });

  return (
    <div 
      ref={targetRef}
      className={`hideable-component ${isVisible ? 'visible' : 'hidden'}`}
    >
      {children}
    </div>
  );
};