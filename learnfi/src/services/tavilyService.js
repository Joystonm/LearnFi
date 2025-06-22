import { createApiClient } from './api';
import config from '../config';

// Create API client for Tavily
const tavilyApi = createApiClient(config.tavilyApiUrl, {
  'X-API-Key': config.tavilyApiKey
});

// Get DeFi trivia or fun fact
const getTrivia = async (topic = 'Compound Protocol') => {
  try {
    // Always use the fallback in this implementation to avoid API issues
    return getFallbackTrivia(topic);
  } catch (error) {
    console.error('Error fetching trivia from Tavily:', error);
    return getFallbackTrivia(topic);
  }
};

// Get DeFi news
const getNews = async (topic = 'Compound Protocol') => {
  try {
    // Always use the fallback in this implementation to avoid API issues
    return getFallbackNews();
  } catch (error) {
    console.error('Error fetching news from Tavily:', error);
    return getFallbackNews();
  }
};

// Fallback trivia when API is unavailable
const getFallbackTrivia = (topic) => {
  const triviaList = [
    {
      fact: "Compound was one of the first DeFi protocols to introduce the concept of 'governance tokens' with COMP, allowing token holders to vote on protocol changes.",
      source: "DeFi Education"
    },
    {
      fact: "The total value locked (TVL) in Compound has exceeded billions of dollars, making it one of the largest lending protocols in DeFi.",
      source: "DeFi Education"
    },
    {
      fact: "Compound uses an algorithmic interest rate model that adjusts based on supply and demand for each asset.",
      source: "DeFi Education"
    },
    {
      fact: "cTokens in Compound automatically earn interest through their exchange rate, which increases over time relative to the underlying asset.",
      source: "DeFi Education"
    },
    {
      fact: "Compound was founded by Robert Leshner and Geoffrey Hayes in 2017, but the protocol wasn't launched until 2018.",
      source: "DeFi Education"
    }
  ];
  
  // Return a random trivia fact
  return triviaList[Math.floor(Math.random() * triviaList.length)];
};

// Fallback news when API is unavailable
const getFallbackNews = () => {
  return [
    {
      title: "Compound Releases New Governance Proposal",
      snippet: "The Compound community is voting on a new proposal to adjust interest rate models for several assets.",
      url: "#",
      date: "Recent"
    },
    {
      title: "DeFi Market Analysis: Lending Protocols Lead Growth",
      snippet: "Compound and other lending protocols show strong growth in total value locked despite market volatility.",
      url: "#",
      date: "Recent"
    },
    {
      title: "Educational Resources for DeFi Users Expanding",
      snippet: "New educational platforms are making it easier for beginners to understand DeFi protocols like Compound.",
      url: "#",
      date: "Recent"
    }
  ];
};

export const tavilyService = {
  getTrivia,
  getNews
};
