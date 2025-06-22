import React, { createContext, useContext, useState, useEffect } from 'react';
import { compoundService } from '../services/compoundService';

// Create context
const CompoundContext = createContext();

// Custom hook to use the compound context
export const useCompound = () => useContext(CompoundContext);

export const CompoundProvider = ({ children }) => {
  // Market data state
  const [marketData, setMarketData] = useState({
    markets: [],
    loading: true,
    error: null
  });

  // User's compound state (simulated)
  const [userCompound, setUserCompound] = useState({
    supplied: {},
    borrowed: {},
    health: 100,
    collateralValue: 0
  });

  // Fetch market data on mount
  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const data = await compoundService.getMarkets();
        setMarketData({
          markets: data,
          loading: false,
          error: null
        });
      } catch (error) {
        setMarketData({
          markets: [],
          loading: false,
          error: error.message
        });
      }
    };

    fetchMarketData();
    
    // Refresh market data every 60 seconds
    const intervalId = setInterval(fetchMarketData, 60000);
    
    return () => clearInterval(intervalId);
  }, []);

  // Simulate supplying assets
  const simulateSupply = async (tokenSymbol, amount) => {
    try {
      // Get current market data for the token
      const market = marketData.markets.find(m => m.symbol === tokenSymbol);
      if (!market) {
        throw new Error(`Market for ${tokenSymbol} not found`);
      }
      
      // Calculate cToken amount (simplified)
      const exchangeRate = market.exchangeRate || 0.02; // Default if not available
      const cTokenAmount = amount / exchangeRate;
      
      // Update user's compound state
      setUserCompound(prev => ({
        ...prev,
        supplied: {
          ...prev.supplied,
          [tokenSymbol]: (prev.supplied[tokenSymbol] || 0) + parseFloat(amount)
        },
        collateralValue: prev.collateralValue + (parseFloat(amount) * market.price)
      }));
      
      return {
        success: true,
        cTokenAmount,
        message: `Successfully supplied ${amount} ${tokenSymbol}`
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };

  // Simulate borrowing assets
  const simulateBorrow = async (tokenSymbol, amount) => {
    try {
      // Get current market data for the token
      const market = marketData.markets.find(m => m.symbol === tokenSymbol);
      if (!market) {
        throw new Error(`Market for ${tokenSymbol} not found`);
      }
      
      // Check if user has enough collateral
      const borrowValueInUSD = parseFloat(amount) * market.price;
      const maxBorrow = userCompound.collateralValue * 0.75; // 75% of collateral value
      
      if (borrowValueInUSD > maxBorrow) {
        throw new Error(`Not enough collateral to borrow ${amount} ${tokenSymbol}`);
      }
      
      // Update user's compound state
      setUserCompound(prev => {
        const newBorrowed = {
          ...prev.borrowed,
          [tokenSymbol]: (prev.borrowed[tokenSymbol] || 0) + parseFloat(amount)
        };
        
        // Calculate new health factor
        const totalBorrowedValue = Object.entries(newBorrowed)
          .reduce((total, [symbol, amt]) => {
            const tokenMarket = marketData.markets.find(m => m.symbol === symbol);
            return total + (amt * (tokenMarket?.price || 0));
          }, 0);
        
        const newHealth = prev.collateralValue > 0 
          ? (prev.collateralValue / totalBorrowedValue) * 100
          : 100;
        
        return {
          ...prev,
          borrowed: newBorrowed,
          health: Math.min(newHealth, 100)
        };
      });
      
      return {
        success: true,
        message: `Successfully borrowed ${amount} ${tokenSymbol}`
      };
    } catch (error) {
      return {
        success: false,
        message: error.message
      };
    }
  };

  // Calculate APY for supplied assets
  const calculateSupplyAPY = (tokenSymbol) => {
    const market = marketData.markets.find(m => m.symbol === tokenSymbol);
    return market ? market.supplyApy : 0;
  };

  // Calculate APY for borrowed assets
  const calculateBorrowAPY = (tokenSymbol) => {
    const market = marketData.markets.find(m => m.symbol === tokenSymbol);
    return market ? market.borrowApy : 0;
  };

  // Value to be provided by the context
  const value = {
    marketData: marketData.markets,
    isLoading: marketData.loading,
    error: marketData.error,
    userCompound,
    simulateSupply,
    simulateBorrow,
    calculateSupplyAPY,
    calculateBorrowAPY
  };

  return (
    <CompoundContext.Provider value={value}>
      {children}
    </CompoundContext.Provider>
  );
};
