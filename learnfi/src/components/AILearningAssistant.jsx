import React, { useState, useRef, useEffect } from 'react';
import { groqService } from '../services/groqService';

const AILearningAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      type: 'assistant',
      content: "👋 Hi there! I'm your DeFi Learning Assistant. Ask me anything about Compound Protocol, DeFi concepts, or strategies!",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  
  // Suggested questions
  const suggestions = [
    "What is the difference between APY and APR?",
    "How does liquidation work in Compound?",
    "What strategy would you recommend for a beginner?",
    "Explain collateral factor in simple terms",
    "What are the risks of borrowing assets?"
  ];
  
  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  // Handle input change
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    setShowSuggestions(false);
    handleSendMessage(suggestion);
  };
  
  // Handle send message
  const handleSendMessage = async (messageContent = null) => {
    const content = messageContent || inputValue;
    if (!content.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    
    try {
      // Get AI response
      const difficulty = detectDifficultyLevel(content);
      const response = await groqService.getExplanation(content, difficulty);
      
      // Add assistant message
      const assistantMessage = {
        id: `assistant-${Date.now()}`,
        type: 'assistant',
        content: response.explanation,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Add error message
      const errorMessage = {
        id: `error-${Date.now()}`,
        type: 'assistant',
        content: "I'm sorry, I couldn't process your request. Please try again or ask a different question.",
        isError: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSendMessage();
  };
  
  // Detect difficulty level based on user query
  const detectDifficultyLevel = (query) => {
    const query_lower = query.toLowerCase();
    
    // Check for advanced terms
    const advancedTerms = ['liquidation', 'collateralization ratio', 'yield farming', 'governance', 'interest rate model', 'oracle', 'flash loan'];
    const hasAdvancedTerms = advancedTerms.some(term => query_lower.includes(term));
    
    // Check for intermediate terms
    const intermediateTerms = ['apy', 'collateral', 'supply', 'borrow', 'interest', 'risk'];
    const hasIntermediateTerms = intermediateTerms.some(term => query_lower.includes(term));
    
    // Check for beginner indicators
    const beginnerIndicators = ['what is', 'how does', 'explain', 'beginner', 'new to', 'simple', 'basic'];
    const hasBeginnerIndicators = beginnerIndicators.some(term => query_lower.includes(term));
    
    // Determine difficulty
    if (hasAdvancedTerms && !hasBeginnerIndicators) {
      return 'advanced';
    } else if (hasIntermediateTerms && !hasBeginnerIndicators) {
      return 'intermediate';
    } else {
      return 'beginner';
    }
  };
  
  // Format timestamp
  const formatTimestamp = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-[600px]">
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">🤖</span> AI Learning Assistant
        </h2>
        <p className="text-sm text-blue-100">
          Ask questions about DeFi concepts and get personalized explanations
        </p>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user'
                  ? 'bg-blue-600 text-white'
                  : message.isError
                  ? 'bg-red-50 border border-red-100 text-gray-700'
                  : 'bg-gray-100 text-gray-700'
              }`}>
                <p className="whitespace-pre-wrap">{message.content}</p>
                <div className={`text-xs mt-1 ${
                  message.type === 'user' ? 'text-blue-200' : 'text-gray-500'
                }`}>
                  {formatTimestamp(message.timestamp)}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 rounded-lg p-4 max-w-[80%]">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          
          {showSuggestions && messages.length === 1 && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-2">Try asking about:</p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full hover:bg-blue-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      <div className="border-t border-gray-200 p-4">
        <form onSubmit={handleSubmit} className="flex items-center">
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Ask about DeFi concepts, strategies, or Compound..."
            className="flex-grow px-4 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={`px-4 py-2 rounded-r-lg ${
              isLoading || !inputValue.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            disabled={isLoading || !inputValue.trim()}
          >
            {isLoading ? (
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </form>
        <p className="text-xs text-gray-500 mt-2">
          Powered by Groq AI. Responses are generated based on your questions and may be simplified for educational purposes.
        </p>
      </div>
    </div>
  );
};

export default AILearningAssistant;
