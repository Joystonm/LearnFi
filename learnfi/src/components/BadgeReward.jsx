import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TooltipExplainer from './TooltipExplainer';

const BadgeReward = ({ badge, isNew = false }) => {
  const badgeRef = useRef(null);
  
  // Animate badge when it's new
  useEffect(() => {
    if (isNew && badgeRef.current) {
      // Create a timeline for the badge animation
      const tl = gsap.timeline({ defaults: { ease: "elastic.out(1.2, 0.5)" } });
      
      tl.from(badgeRef.current, { 
        scale: 0.5, 
        opacity: 0, 
        rotation: -10,
        duration: 1.2
      })
      .to(badgeRef.current, {
        y: -10,
        duration: 0.5,
        repeat: 3,
        yoyo: true
      }, "-=0.2");
    }
  }, [isNew]);
  
  // Get badge details based on type
  const getBadgeDetails = () => {
    switch (badge.type) {
      case 'completion':
        return {
          bgColor: 'bg-blue-100',
          borderColor: 'border-blue-300',
          textColor: 'text-blue-800',
          icon: '🎓'
        };
      case 'quiz':
        return {
          bgColor: 'bg-green-100',
          borderColor: 'border-green-300',
          textColor: 'text-green-800',
          icon: '🧠'
        };
      case 'simulation':
        return {
          bgColor: 'bg-purple-100',
          borderColor: 'border-purple-300',
          textColor: 'text-purple-800',
          icon: '🧪'
        };
      case 'achievement':
        return {
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-300',
          textColor: 'text-yellow-800',
          icon: '🏆'
        };
      default:
        return {
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-300',
          textColor: 'text-gray-800',
          icon: '🎯'
        };
    }
  };
  
  const badgeDetails = getBadgeDetails();
  
  return (
    <div 
      ref={badgeRef}
      className={`relative flex flex-col items-center p-4 rounded-lg border-2 ${badgeDetails.borderColor} ${badgeDetails.bgColor} text-center`}
    >
      {isNew && (
        <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
          New
        </div>
      )}
      
      <div className="text-3xl mb-2">{badgeDetails.icon}</div>
      <h3 className={`font-medium text-sm ${badgeDetails.textColor}`}>{badge.name}</h3>
      
      <div className="mt-2">
        <TooltipExplainer content={badge.description} />
      </div>
    </div>
  );
};

export default BadgeReward;
