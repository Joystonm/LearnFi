import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { groqService } from '../services/groqService';

const LearnModule = () => {
  const { topicId } = useParams();
  const navigate = useNavigate();
  const { user, completeLearnTopic, addBadge } = useUser();
  
  // State for the current topic and explanation
  const [currentTopic, setCurrentTopic] = useState(null);
  const [explanation, setExplanation] = useState({ explanation: '', source: '' });
  const [isLoading, setIsLoading] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showBadge, setShowBadge] = useState(false);
  const [earnedBadge, setEarnedBadge] = useState(null);
  
  // List of available topics
  const topics = [
    { id: 'ctoken', title: 'What is a cToken?', icon: '🪙' },
    { id: 'apy', title: 'Understanding APY', icon: '📈' },
    { id: 'collateral', title: 'Collateral Factor', icon: '🔒' },
    { id: 'liquidation', title: 'Liquidation Risk', icon: '⚠️' },
    { id: 'interest', title: 'Interest Rate Models', icon: '💹' },
    { id: 'governance', title: 'Compound Governance', icon: '🏛️' }
  ];
  
  // Find the current topic based on the URL parameter
  useEffect(() => {
    if (!topicId) {
      // If no topic is specified, navigate to the first one
      navigate(`/learn/${topics[0].id}`);
      return;
    }
    
    const topic = topics.find(t => t.id === topicId);
    if (topic) {
      setCurrentTopic(topic);
      setIsLoading(true);
      
      // Fetch explanation for the topic
      const fetchExplanation = async () => {
        try {
          const data = await groqService.getExplanation(topic.title);
          setExplanation(data);
        } catch (error) {
          console.error('Error fetching explanation:', error);
          // Set a default explanation
          setExplanation({
            explanation: `This is a placeholder explanation for ${topic.title}. In a real implementation, this would be fetched from an AI service.`,
            source: 'fallback'
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchExplanation();
    } else {
      // If topic doesn't exist, navigate to the first one
      navigate(`/learn/${topics[0].id}`);
    }
  }, [topicId, navigate]);
  
  // Handle quiz display
  const handleStartQuiz = async () => {
    setIsLoading(true);
    
    try {
      // Fetch quiz question
      const quiz = await groqService.getQuizQuestion(currentTopic.title);
      setQuizData(quiz);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      // Set a default quiz
      setQuizData({
        question: `Which of the following best describes ${currentTopic.title}?`,
        options: [
          'A mechanism in the Compound Protocol',
          'A type of cryptocurrency token',
          'A DeFi lending strategy',
          'A blockchain consensus algorithm'
        ],
        correctIndex: 0,
        explanation: 'This is a placeholder explanation for the quiz answer.'
      });
    } finally {
      setIsLoading(false);
      setShowQuiz(true);
    }
  };
  
  // Handle answer selection
  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
    setIsCorrect(index === quizData.correctIndex);
    
    // If answer is correct, mark topic as completed
    if (index === quizData.correctIndex) {
      completeLearnTopic(currentTopic.id);
      
      // Check if user already has the badge
      const hasBadge = user.badges.some(b => b.id === `quiz_${currentTopic.id}`);
      
      if (!hasBadge) {
        // Create a new badge
        const newBadge = {
          id: `quiz_${currentTopic.id}`,
          name: `${currentTopic.title} Expert`,
          type: 'quiz',
          description: `Successfully completed the quiz on ${currentTopic.title}`
        };
        
        // Add badge to user's collection
        addBadge(newBadge);
        setEarnedBadge(newBadge);
        
        // Show badge after a short delay
        setTimeout(() => {
          setShowBadge(true);
        }, 1000);
      }
    }
  };
  
  // Handle continuing to next topic
  const handleContinue = () => {
    // Find the index of the current topic
    const currentIndex = topics.findIndex(t => t.id === currentTopic.id);
    
    // If there's a next topic, navigate to it
    if (currentIndex < topics.length - 1) {
      navigate(`/learn/${topics[currentIndex + 1].id}`);
    } else {
      // Otherwise, go back to the dashboard
      navigate('/dashboard');
    }
    
    // Reset quiz state
    setShowQuiz(false);
    setSelectedAnswer(null);
    setIsCorrect(null);
    setShowBadge(false);
  };
  
  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar Navigation */}
        <div className="md:w-64 bg-white rounded-xl shadow-md p-4 h-fit">
          <h2 className="text-lg font-semibold mb-4">DeFi Topics</h2>
          <nav className="space-y-1">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => navigate(`/learn/${topic.id}`)}
                className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${
                  currentTopic?.id === topic.id
                    ? 'bg-blue-100 text-blue-800'
                    : 'hover:bg-gray-100'
                } ${user.completedTopics.includes(topic.id) ? 'font-medium' : ''}`}
              >
                <span className="mr-2">{topic.icon}</span>
                <span>{topic.title}</span>
                {user.completedTopics.includes(topic.id) && (
                  <span className="ml-auto text-green-500">✓</span>
                )}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1">
          {isLoading ? (
            <div className="bg-white rounded-xl shadow-md p-6 flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-md p-6">
              {/* Topic Header */}
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mr-4">
                  {currentTopic?.icon}
                </div>
                <h1 className="text-2xl font-bold">{currentTopic?.title}</h1>
              </div>
              
              {/* Explanation */}
              {!showQuiz ? (
                <>
                  <div className="prose max-w-none mb-8">
                    <p className="text-gray-700 whitespace-pre-line">
                      {explanation.explanation}
                    </p>
                    
                    {explanation.source !== 'groq' && (
                      <p className="text-sm text-gray-500 mt-4">
                        Source: {explanation.source}
                      </p>
                    )}
                  </div>
                  
                  {/* Interactive Elements */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-8">
                    <h3 className="font-semibold mb-2 flex items-center">
                      <span className="mr-2">💡</span> Key Takeaway
                    </h3>
                    <p className="text-gray-700">
                      {currentTopic?.id === 'ctoken' && 'cTokens represent your deposits in Compound and automatically earn interest through their exchange rate.'}
                      {currentTopic?.id === 'apy' && 'APY (Annual Percentage Yield) shows your expected yearly return with compounding interest.'}
                      {currentTopic?.id === 'collateral' && 'Collateral Factor determines how much you can borrow against your supplied assets.'}
                      {currentTopic?.id === 'liquidation' && 'Liquidation happens when your borrowed amount exceeds your allowed borrowing limit.'}
                      {currentTopic?.id === 'interest' && 'Interest rates in Compound adjust automatically based on supply and demand.'}
                      {currentTopic?.id === 'governance' && 'COMP token holders can propose and vote on changes to the Compound protocol.'}
                    </p>
                  </div>
                  
                  {/* Quiz Button */}
                  <button
                    onClick={handleStartQuiz}
                    className="btn btn-primary w-full py-3 text-center"
                  >
                    Test Your Knowledge
                  </button>
                </>
              ) : (
                <div>
                  {/* Quiz Question */}
                  <div className="bg-blue-50 border border-blue-100 rounded-lg p-6 mb-6">
                    <h3 className="text-xl font-semibold mb-4">{quizData.question}</h3>
                    
                    <div className="space-y-3">
                      {quizData.options.map((option, index) => (
                        <button
                          key={index}
                          onClick={() => selectedAnswer === null && handleAnswerSelect(index)}
                          className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            selectedAnswer === index
                              ? index === quizData.correctIndex
                                ? 'bg-green-100 border-green-300'
                                : 'bg-red-100 border-red-300'
                              : 'bg-white border-gray-200 hover:bg-gray-50'
                          } ${selectedAnswer !== null && index !== selectedAnswer && index !== quizData.correctIndex ? 'opacity-50' : ''}`}
                          disabled={selectedAnswer !== null}
                        >
                          <div className="flex items-center">
                            <div className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center mr-3">
                              {String.fromCharCode(65 + index)}
                            </div>
                            <span>{option}</span>
                            {selectedAnswer === index && index === quizData.correctIndex && (
                              <span className="ml-auto text-green-500">✓</span>
                            )}
                            {selectedAnswer === index && index !== quizData.correctIndex && (
                              <span className="ml-auto text-red-500">✗</span>
                            )}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Result Explanation */}
                  {selectedAnswer !== null && (
                    <div className={`p-4 rounded-lg mb-6 ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                      <h4 className={`font-semibold mb-2 ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                        {isCorrect ? '🎉 Correct!' : '❌ Not quite right'}
                      </h4>
                      <p className="text-gray-700">
                        {quizData.explanation}
                      </p>
                    </div>
                  )}
                  
                  {/* Continue Button */}
                  {selectedAnswer !== null && (
                    <button
                      onClick={handleContinue}
                      className="btn btn-primary w-full py-3 text-center"
                    >
                      Continue
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Badge Reward Modal */}
      {showBadge && earnedBadge && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold mb-4">🎉 Badge Earned!</h2>
            <div className="mb-6">
              <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center text-4xl">
                🎓
              </div>
              <h3 className="text-xl font-bold mt-4">{earnedBadge.name}</h3>
              <p className="text-gray-600 mt-2">{earnedBadge.description}</p>
            </div>
            <button
              onClick={() => setShowBadge(false)}
              className="btn btn-primary px-8 py-2"
            >
              Awesome!
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearnModule;
