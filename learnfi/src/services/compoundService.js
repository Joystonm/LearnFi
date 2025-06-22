import Compound from '@compound-finance/compound-js';
import config from '../config';

// Initialize Compound with the network from config
const compound = new Compound(config.compoundNetwork);

// Get all markets data
const getMarkets = async () => {
  try {
    // Get all cToken addresses
    const cTokens = await compound.api.account({
      "addresses": [],
      "network": config.compoundNetwork
    });

    if (!cTokens.cTokens) {
      throw new Error('Failed to fetch cToken data');
    }

    // Map cTokens to a more usable format
    const markets = cTokens.cTokens.map(cToken => {
      const underlying = cToken.underlying || {};
      const symbol = underlying.symbol || cToken.symbol.replace('c', '');
      
      return {
        symbol,
        name: underlying.name || symbol,
        address: cToken.address,
        cTokenSymbol: cToken.symbol,
        supplyApy: parseFloat(cToken.supply_rate.value) * 100,
        borrowApy: parseFloat(cToken.borrow_rate.value) * 100,
        price: parseFloat(underlying.price?.value || 0),
        totalSupply: parseFloat(cToken.total_supply.value) || 0,
        totalBorrow: parseFloat(cToken.total_borrow.value) || 0,
        collateralFactor: parseFloat(cToken.collateral_factor.value) || 0,
        exchangeRate: parseFloat(cToken.exchange_rate.value) || 0,
        underlyingDecimals: parseInt(underlying.decimals) || 18
      };
    });

    return markets;
  } catch (error) {
    console.error('Error fetching Compound markets:', error);
    
    // If in development mode, return mock data
    if (config.isDevelopment) {
      return getMockMarkets();
    }
    
    throw error;
  }
};

// Get specific market data
const getMarket = async (symbol) => {
  try {
    const markets = await getMarkets();
    return markets.find(market => market.symbol === symbol);
  } catch (error) {
    console.error(`Error fetching market data for ${symbol}:`, error);
    throw error;
  }
};

// Calculate supply APY for a token
const calculateSupplyApy = async (symbol) => {
  try {
    const market = await getMarket(symbol);
    return market ? market.supplyApy : 0;
  } catch (error) {
    console.error(`Error calculating supply APY for ${symbol}:`, error);
    return 0;
  }
};

// Calculate borrow APY for a token
const calculateBorrowApy = async (symbol) => {
  try {
    const market = await getMarket(symbol);
    return market ? market.borrowApy : 0;
  } catch (error) {
    console.error(`Error calculating borrow APY for ${symbol}:`, error);
    return 0;
  }
};

// Get mock market data for development
const getMockMarkets = () => {
  return [
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
  ];
};

export const compoundService = {
  getMarkets,
  getMarket,
  calculateSupplyApy,
  calculateBorrowApy
};
