import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const TooltipExplainer = ({ content, position = 'top', children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);
  const triggerRef = useRef(null);
  
  // Handle tooltip positioning
  const getTooltipPosition = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 translate-y-2 mt-1';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 -translate-x-2 mr-1';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 translate-x-2 ml-1';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 -translate-y-2 mb-1';
    }
  };
  
  // Animate tooltip
  useEffect(() => {
    if (!tooltipRef.current) return;
    
    if (isVisible) {
      gsap.fromTo(tooltipRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 0.2, ease: "power2.out" }
      );
    } else {
      gsap.to(tooltipRef.current, { 
        opacity: 0, 
        scale: 0.8, 
        duration: 0.15, 
        ease: "power2.in" 
      });
    }
  }, [isVisible]);
  
  return (
    <div className="relative inline-block" ref={triggerRef}>
      {/* Tooltip trigger */}
      <div 
        className="cursor-help"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
        onClick={() => setIsVisible(!isVisible)}
      >
        {children || (
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-4 w-4 text-gray-500 hover:text-gray-700" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        )}
      </div>
      
      {/* Tooltip content */}
      {isVisible && (
        <div 
          ref={tooltipRef}
          className={`absolute z-10 w-64 p-3 bg-gray-800 text-white text-sm rounded-md shadow-lg ${getTooltipPosition()}`}
        >
          <div className="relative">
            {content}
            
            {/* Arrow */}
            <div 
              className={`absolute w-2 h-2 bg-gray-800 transform rotate-45 ${
                position === 'top' ? 'bottom-0 left-1/2 -translate-x-1/2 translate-y-1' :
                position === 'bottom' ? 'top-0 left-1/2 -translate-x-1/2 -translate-y-1' :
                position === 'left' ? 'right-0 top-1/2 -translate-y-1/2 translate-x-1' :
                'left-0 top-1/2 -translate-y-1/2 -translate-x-1'
              }`}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TooltipExplainer;
