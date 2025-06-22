import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import TooltipExplainer from './TooltipExplainer';
import { useCompound } from '../context/CompoundContext';

const TokenCard = ({ symbol, amount, className = '' }) => {
  const cardRef = useRef(null);
  const { calculateSupplyAPY } = useCompound();
  
  // Get token details
  const getTokenDetails = () => {
    switch (symbol) {
      case 'DAI':
        return {
          name: 'Dai Stablecoin',
          color: 'bg-yellow-500',
          textColor: 'text-yellow-800',
          bgColor: 'bg-yellow-100',
          icon: '💰'
        };
      case 'ETH':
        return {
          name: 'Ethereum',
          color: 'bg-blue-500',
          textColor: 'text-blue-800',
          bgColor: 'bg-blue-100',
          icon: '💎'
        };
      case 'USDC':
        return {
          name: 'USD Coin',
          color: 'bg-blue-500',
          textColor: 'text-blue-800',
          bgColor: 'bg-blue-100',
          icon: '💵'
        };
      case 'WBTC':
        return {
          name: 'Wrapped Bitcoin',
          color: 'bg-orange-500',
          textColor: 'text-orange-800',
          bgColor: 'bg-orange-100',
          icon: '🔶'
        };
      default:
        return {
          name: symbol,
          color: 'bg-gray-500',
          textColor: 'text-gray-800',
          bgColor: 'bg-gray-100',
          icon: '🪙'
        };
    }
  };
  
  const tokenDetails = getTokenDetails();
  const apy = calculateSupplyAPY(symbol);
  
  // Add hover animation
  useEffect(() => {
    const card = cardRef.current;
    
    const enterAnimation = () => {
      gsap.to(card, {
        scale: 1.02,
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        duration: 0.2
      });
    };
    
    const leaveAnimation = () => {
      gsap.to(card, {
        scale: 1,
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        duration: 0.2
      });
    };
    
    card.addEventListener('mouseenter', enterAnimation);
    card.addEventListener('mouseleave', leaveAnimation);
    
    return () => {
      card.removeEventListener('mouseenter', enterAnimation);
      card.removeEventListener('mouseleave', leaveAnimation);
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={`flex items-center p-4 rounded-lg border border-gray-200 ${tokenDetails.bgColor} ${className}`}
    >
      <div className={`w-10 h-10 rounded-full ${tokenDetails.color} flex items-center justify-center text-white mr-4`}>
        <span>{tokenDetails.icon}</span>
      </div>
      
      <div className="flex-grow">
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{symbol}</h3>
          <span className="token-balance font-bold">{amount.toFixed(4)}</span>
        </div>
        
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-gray-500">{tokenDetails.name}</span>
          <div className="flex items-center">
            <span className="text-xs text-green-600 mr-1">{apy.toFixed(2)}% APY</span>
            <TooltipExplainer 
              content={`Annual Percentage Yield for supplying ${symbol} to Compound`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
