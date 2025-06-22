import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { tavilyService } from '../services/tavilyService';

const Home = () => {
  // State for trivia
  const [trivia, setTrivia] = useState({
    fact: "Compound was one of the first DeFi protocols to introduce the concept of 'governance tokens' with COMP, allowing token holders to vote on protocol changes.",
    source: "DeFi Education"
  });
  
  // Fetch trivia on component mount
  useEffect(() => {
    const fetchTrivia = async () => {
      try {
        const triviaData = await tavilyService.getTrivia();
        setTrivia(triviaData);
      } catch (error) {
        console.error('Error fetching trivia:', error);
      }
    };
    
    fetchTrivia();
  }, []);
  
  return (
    <div className="flex flex-col space-y-16">
      {/* Hero Section */}
      <section className="py-16 px-4 text-center bg-white rounded-xl shadow-md">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 flex justify-center">
            <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              LF
            </div>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            LearnFi
          </h1>
          <p className="text-xl mb-8 text-gray-700">
            The Gamified, AI-Powered DeFi Playground
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/learn" 
              className="btn btn-primary text-lg px-8 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              Start Learning DeFi
            </Link>
            <Link 
              to="/simulate" 
              className="btn btn-secondary text-lg px-8 py-3 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
            >
              Try Simulation
            </Link>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-gray-50 rounded-xl">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How LearnFi Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Learn DeFi Concepts</h3>
              <p className="text-gray-600">
                Explore interactive lessons with AI-powered explanations that make complex DeFi concepts easy to understand.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold mb-2">Simulate Compound</h3>
              <p className="text-gray-600">
                Practice supplying and borrowing in a risk-free environment with animated visualizations of each action.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold mb-2">Earn Rewards</h3>
              <p className="text-gray-600">
                Complete challenges and quizzes to earn badges and track your progress through your DeFi learning journey.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trivia Section */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl">
            <h3 className="text-xl font-semibold mb-3 flex items-center">
              <span className="mr-2">💡</span> DeFi Trivia of the Day
            </h3>
            <p className="text-gray-700 mb-2">
              {trivia.fact}
            </p>
            <p className="text-sm text-gray-500">
              Source: {trivia.source}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
