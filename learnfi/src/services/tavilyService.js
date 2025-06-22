import axios from 'axios';
import config from '../config';

// Base URL and headers for Tavily API
const tavilyApi = axios.create({
  baseURL: config.tavilyApiUrl,
  headers: {
    'X-API-Key': config.tavilyApiKey,
    'Content-Type': 'application/json'
  }
});

// Get DeFi trivia or fun fact
const getTrivia = async (topic = 'Compound Protocol') => {
  try {
    // If no API key is available, use the fallback
    if (!config.tavilyApiKey) {
      return getFallbackTrivia(topic);
    }

    const response = await tavilyApi.post('/search', {
      query: `Interesting fact or trivia about ${topic} in DeFi`,
      search_depth: 'advanced',
      include_answer: true,
      max_results: 3
    });

    if (response.data.answer) {
      return {
        fact: response.data.answer,
        source: response.data.results?.[0]?.url || 'Tavily API'
      };
    } else {
      throw new Error('No answer found in Tavily response');
    }
  } catch (error) {
    console.error('Error fetching trivia from Tavily:', error);
    return getFallbackTrivia(topic);
  }
};

// Get DeFi news
const getNews = async (topic = 'Compound Protocol') => {
  try {
    // If no API key is available, use the fallback
    if (!config.tavilyApiKey) {
      return getFallbackNews();
    }

    const response = await tavilyApi.post('/search', {
      query: `Latest news about ${topic} in DeFi`,
      search_depth: 'advanced',
      include_answer: false,
      max_results: 5
    });

    if (response.data.results && response.data.results.length > 0) {
      return response.data.results.map(result => ({
        title: result.title,
        snippet: result.content,
        url: result.url,
        date: result.published_date || 'Recent'
      }));
    } else {
      throw new Error('No results found in Tavily response');
    }
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
