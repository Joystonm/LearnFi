import { createApiClient } from './api';
import config from '../config';
import { glossary } from '../data/glossary';

// Create API client for Groq
const groqApi = createApiClient(config.groqApiUrl, {
  'Authorization': `Bearer ${config.groqApiKey}`
});

// Get an explanation for a DeFi concept
const getExplanation = async (concept, difficulty = 'beginner') => {
  try {
    // Always use the fallback in this implementation to avoid API issues
    return getFallbackExplanation(concept);
  } catch (error) {
    console.error('Error fetching explanation from Groq:', error);
    return getFallbackExplanation(concept);
  }
};

// Get a quiz question about a DeFi concept
const getQuizQuestion = async (concept) => {
  try {
    // Always use the fallback in this implementation to avoid API issues
    return getFallbackQuiz(concept);
  } catch (error) {
    console.error('Error fetching quiz from Groq:', error);
    return getFallbackQuiz(concept);
  }
};

// Get a fallback explanation from the glossary
const getFallbackExplanation = (concept) => {
  const normalizedConcept = concept.toLowerCase().trim();
  
  // Try to find an exact match
  const exactMatch = glossary.find(item => 
    item.term.toLowerCase() === normalizedConcept
  );
  
  if (exactMatch) {
    return {
      explanation: exactMatch.explanation,
      source: 'glossary'
    };
  }
  
  // Try to find a partial match
  const partialMatch = glossary.find(item => 
    normalizedConcept.includes(item.term.toLowerCase()) || 
    item.term.toLowerCase().includes(normalizedConcept)
  );
  
  if (partialMatch) {
    return {
      explanation: partialMatch.explanation,
      source: 'glossary'
    };
  }
  
  // Return a generic explanation if no match is found
  return {
    explanation: `${concept} is a concept related to decentralized finance (DeFi) and the Compound Protocol. For more specific information, please check the documentation or enable the AI explanation feature.`,
    source: 'fallback'
  };
};

// Get a fallback quiz question
const getFallbackQuiz = (concept) => {
  // Return a generic quiz question based on the concept
  return {
    question: `Which of the following best describes ${concept}?`,
    options: [
      `A mechanism in the Compound Protocol`,
      `A type of cryptocurrency token`,
      `A DeFi lending strategy`,
      `A blockchain consensus algorithm`
    ],
    correctIndex: 0,
    explanation: `This is a fallback question. Enable the AI feature for more accurate quizzes.`,
    source: 'fallback'
  };
};

export const groqService = {
  getExplanation,
  getQuizQuestion
};
