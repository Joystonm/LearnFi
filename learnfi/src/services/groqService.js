import axios from 'axios';
import config from '../config';
import { glossary } from '../data/glossary';

// Base URL and headers for Groq API
const groqApi = axios.create({
  baseURL: config.groqApiUrl,
  headers: {
    'Authorization': `Bearer ${config.groqApiKey}`,
    'Content-Type': 'application/json'
  }
});

// Get an explanation for a DeFi concept
const getExplanation = async (concept, difficulty = 'beginner') => {
  try {
    // If no API key is available, use the glossary
    if (!config.groqApiKey) {
      return getFallbackExplanation(concept);
    }

    const response = await groqApi.post('/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a DeFi educator specializing in the Compound Protocol. 
          Explain concepts in simple terms with analogies. Target your explanation 
          for a ${difficulty} level user (beginner, intermediate, or advanced).
          Keep explanations concise (max 3 paragraphs) and focus on practical understanding.`
        },
        {
          role: 'user',
          content: `Explain this DeFi concept related to Compound: "${concept}"`
        }
      ],
      temperature: 0.5,
      max_tokens: 500
    });

    return {
      explanation: response.data.choices[0].message.content,
      source: 'groq'
    };
  } catch (error) {
    console.error('Error fetching explanation from Groq:', error);
    return getFallbackExplanation(concept);
  }
};

// Get a quiz question about a DeFi concept
const getQuizQuestion = async (concept) => {
  try {
    // If no API key is available, use the fallback
    if (!config.groqApiKey) {
      return getFallbackQuiz(concept);
    }

    const response = await groqApi.post('/chat/completions', {
      model: 'llama3-8b-8192',
      messages: [
        {
          role: 'system',
          content: `You are a DeFi educator creating quiz questions about the Compound Protocol.
          Create a multiple-choice question with 4 options and indicate the correct answer.
          Format your response as a JSON object with the following structure:
          {
            "question": "The question text",
            "options": ["Option A", "Option B", "Option C", "Option D"],
            "correctIndex": 0,
            "explanation": "Brief explanation of why this answer is correct"
          }`
        },
        {
          role: 'user',
          content: `Create a quiz question about this DeFi concept: "${concept}"`
        }
      ],
      temperature: 0.7,
      max_tokens: 500,
      response_format: { type: "json_object" }
    });

    const quizData = JSON.parse(response.data.choices[0].message.content);
    return {
      ...quizData,
      source: 'groq'
    };
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
