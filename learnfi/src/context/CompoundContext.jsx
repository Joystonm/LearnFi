import React, { createContext, useContext, useState, useEffect } from 'react';
import { compoundService } from '../services/compoundService';

// Create context
const CompoundContext = createContext();

// Custom hook to use the compound context
export const useCompound = () => useContext(CompoundContext);

export const CompoundProvider = ({ children }) => {
  // Market data state with default values
  const [marketData, setMarketData] = useState([
    {
      symbol: 'DAI',
      name: 'Dai Stablecoin',
      cTokenSymbol: 'cDAI',
      supplyApy: 2.53,
      borrowApy: 3.82,
      price: 1.00,
      totalSupply: 1234567890,
      totalBorrow: 987654321,
      collateralFactor: 0.75,
      exchangeRate: 0.02,
      underlyingDecimals: 18
    },
    {
      symbol: 'USDC',
      name: 'USD Coin',
      cTokenSymbol: 'cUSDC',
      supplyApy: 2.12,
      borrowApy: 3.45,
      price: 1.00,
      totalSupply: 2345678901,
      totalBorrow: 1876543210,
      collateralFactor: 0.80,
      exchangeRate: 0.022,
      underlyingDecimals: 6
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      cTokenSymbol: 'cETH',
      supplyApy: 0.32,
      borrowApy: 1.25,
      price: 3500.00,
      totalSupply: 123456,
      totalBorrow: 98765,
      collateralFactor: 0.70,
      exchangeRate: 0.05,
      underlyingDecimals: 18
    },
    {
      symbol: 'WBTC',
      name: 'Wrapped Bitcoin',
      cTokenSymbol: 'cWBTC',
      supplyApy: 0.21,
      borrowApy: 1.12,
      price: 60000.00,
      totalSupply: 5432,
      totalBorrow: 3210,
      collateralFactor: 0.65,
      exchangeRate: 0.02,
      underlyingDecimals: 8
    }
  ]);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
        setIsLoading(true);
        const data = await compoundService.getMarkets();
        if (data && data.length > 0) {
          setMarketData(data);
        }
        setError(null);
      } catch (error) {
        console.error('Error fetching market data:', error);
        // Keep using the default market data
        setError('Failed to fetch market data. Using default values.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  // Simulate supplying assets
  const simulateSupply = async (tokenSymbol, amount) => {
    try {
      // Get current market data for the token
      const market = marketData.find(m => m.symbol === tokenSymbol);
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
      const market = marketData.find(m => m.symbol === tokenSymbol);
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
            const tokenMarket = marketData.find(m => m.symbol === symbol);
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
    const market = marketData.find(m => m.symbol === tokenSymbol);
    return market ? market.supplyApy : 0;
  };

  // Calculate APY for borrowed assets
  const calculateBorrowAPY = (tokenSymbol) => {
    const market = marketData.find(m => m.symbol === tokenSymbol);
    return market ? market.borrowApy : 0;
  };

  // Value to be provided by the context
  const value = {
    marketData,
    isLoading,
    error,
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
