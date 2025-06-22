import { createApiClient } from './api';
import config from '../config';

// Create API client for Tavily
const tavilyApi = createApiClient(config.tavilyApiUrl, {
  'X-API-Key': config.tavilyApiKey
});

// Get trivia about DeFi
const getTrivia = async () => {
  try {
    // In a real implementation, we would call the Tavily API
    // For now, we'll return a random trivia fact from our predefined list
    return getFallbackTrivia();
  } catch (error) {
    console.error('Error fetching trivia from Tavily:', error);
    return getFallbackTrivia();
  }
};

// Get a fallback trivia fact
const getFallbackTrivia = () => {
  const triviaFacts = [
    {
      fact: "Compound was one of the first DeFi protocols to introduce the concept of 'governance tokens' with COMP, allowing token holders to vote on protocol changes.",
      source: "DeFi Education"
    },
    {
      fact: "The total value locked (TVL) in DeFi protocols grew from less than $1 billion in 2019 to over $100 billion at its peak in 2021.",
      source: "DeFi Pulse"
    },
    {
      fact: "Compound's interest rates automatically adjust based on supply and demand, using an algorithmic interest rate model.",
      source: "Compound Docs"
    },
    {
      fact: "The concept of 'yield farming' became popular during the 'DeFi Summer' of 2020, when protocols started distributing governance tokens to users.",
      source: "DeFi History"
    },
    {
      fact: "Liquidations in Compound occur when a borrower's collateral value falls below the required threshold, typically resulting in a liquidation penalty.",
      source: "Compound Protocol"
    },
    {
      fact: "The collateral factor in Compound determines how much you can borrow against your supplied assets, with stablecoins typically having higher factors than volatile assets.",
      source: "DeFi Learning"
    },
    {
      fact: "cTokens in Compound automatically earn interest through their exchange rate, which increases over time relative to the underlying asset.",
      source: "Compound Documentation"
    }
  ];
  
  const randomIndex = Math.floor(Math.random() * triviaFacts.length);
  return triviaFacts[randomIndex];
};

export const tavilyService = {
  getTrivia
};
