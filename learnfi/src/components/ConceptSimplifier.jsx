import React, { useState } from 'react';
import { groqService } from '../services/groqService';

const ConceptSimplifier = ({ concept, initialDifficulty = 'intermediate' }) => {
  const [difficulty, setDifficulty] = useState(initialDifficulty);
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Difficulty levels
  const difficultyLevels = [
    { id: 'beginner', label: 'Beginner', description: 'Simple explanations with everyday analogies' },
    { id: 'intermediate', label: 'Intermediate', description: 'More technical details with some DeFi terminology' },
    { id: 'advanced', label: 'Advanced', description: 'In-depth explanations with technical concepts' }
  ];
  
  // Get explanation based on difficulty
  const getExplanation = async (selectedDifficulty) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await groqService.getExplanation(concept, selectedDifficulty);
      setExplanation(response.explanation);
    } catch (error) {
      console.error('Error fetching explanation:', error);
      setError('Failed to get explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle difficulty change
  const handleDifficultyChange = (newDifficulty) => {
    setDifficulty(newDifficulty);
    getExplanation(newDifficulty);
  };
  
  // Load explanation on mount
  React.useEffect(() => {
    if (concept) {
      getExplanation(difficulty);
    }
  }, [concept]);
  
  // Get difficulty color
  const getDifficultyColor = (difficultyId) => {
    switch (difficultyId) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-blue-100 text-blue-800';
      case 'advanced':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">🔍</span> Concept Simplifier
        </h2>
        <p className="text-sm text-blue-100">
          Adjust the difficulty level to understand concepts at your own pace
        </p>
      </div>
      
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">{concept}</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {difficultyLevels.map((level) => (
              <button
                key={level.id}
                onClick={() => handleDifficultyChange(level.id)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  difficulty === level.id
                    ? getDifficultyColor(level.id)
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {level.label}
              </button>
            ))}
          </div>
          
          <p className="text-sm text-gray-500 italic mb-4">
            {difficultyLevels.find(level => level.id === difficulty)?.description}
          </p>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        ) : (
          <div className="prose max-w-none">
            <div className={`p-4 rounded-lg ${
              difficulty === 'beginner' ? 'bg-green-50' :
              difficulty === 'intermediate' ? 'bg-blue-50' :
              'bg-purple-50'
            }`}>
              <p className="whitespace-pre-line">{explanation}</p>
            </div>
          </div>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Not clear enough? Try adjusting the difficulty level.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConceptSimplifier;
