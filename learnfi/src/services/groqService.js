import { createApiClient } from './api';
import config from '../config';
import { glossary } from '../data/glossary';
import { quizQuestions } from '../data/quizQuestions';

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
const getQuizQuestion = async (concept, topicId) => {
  try {
    // Use our predefined quiz questions if available
    if (topicId && quizQuestions[topicId]) {
      const topicQuestions = quizQuestions[topicId];
      const randomIndex = Math.floor(Math.random() * topicQuestions.length);
      return topicQuestions[randomIndex];
    }
    
    // Fallback to generic quiz
    return getFallbackQuiz(concept);
  } catch (error) {
    console.error('Error fetching quiz:', error);
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

// Get trivia about DeFi
const getTrivia = async () => {
  // Return a random trivia fact
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
    }
  ];
  
  const randomIndex = Math.floor(Math.random() * triviaFacts.length);
  return triviaFacts[randomIndex];
};

export const groqService = {
  getExplanation,
  getQuizQuestion,
  getTrivia
};
