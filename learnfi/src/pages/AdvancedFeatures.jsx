import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TutorialSystem from '../components/TutorialSystem';
import TryItYourself from '../components/TryItYourself';
import MarketStressTesting from '../components/MarketStressTesting';
import HistoricalScenario from '../components/HistoricalScenario';
import MultiStepSimulation from '../components/MultiStepSimulation';
import SkillAssessment from '../components/SkillAssessment';
import LearningPath from '../components/LearningPath';
import RecommendedNextSteps from '../components/RecommendedNextSteps';
import AdvancedQuiz from '../components/AdvancedQuiz';
import ScenarioQuestion from '../components/ScenarioQuestion';
import TimedChallenge from '../components/TimedChallenge';
import AILearningAssistant from '../components/AILearningAssistant';
import ConceptSimplifier from '../components/ConceptSimplifier';
import StrategyRecommendation from '../components/StrategyRecommendation';

const AdvancedFeatures = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('interactive-tutorials');
  const [showTutorial, setShowTutorial] = useState(true);
  
  // Tutorial steps for the advanced features page
  const tutorialSteps = [
    {
      title: 'Welcome to Advanced Features',
      description: 'This page contains all the advanced learning and simulation features of LearnFi. Let me guide you through what\'s available.',
      action: 'Click "Next" to continue the tutorial.'
    },
    {
      title: 'Interactive Tutorials',
      description: 'These guided walkthroughs help you learn step-by-step. They include tooltips and "Try it yourself" sections for hands-on learning.',
      action: 'Try clicking on the "Interactive Tutorials" tab if it\'s not already selected.'
    },
    {
      title: 'Advanced Simulations',
      description: 'Test your strategies under different market conditions with stress testing, historical scenarios, and multi-step transactions.',
      action: 'Click on the "Advanced Simulations" tab to see these features.'
    },
    {
      title: 'Personalized Learning',
      description: 'Get a customized learning experience with skill assessments, learning paths, and recommended next steps based on your progress.',
      action: 'Click on the "Personalized Learning" tab to explore these options.'
    },
    {
      title: 'Advanced Quizzes',
      description: 'Challenge yourself with different difficulty levels, scenario-based questions, and timed challenges to test your knowledge.',
      action: 'Click on the "Advanced Quizzes" tab to see the quiz options.'
    },
    {
      title: 'AI Learning Assistant',
      description: 'Get personalized explanations, concept simplifications, and strategy recommendations powered by AI.',
      action: 'Click on the "AI Assistant" tab to interact with these features.'
    },
    {
      title: 'You\'re All Set!',
      description: 'Now you know all about the advanced features available in LearnFi. Feel free to explore each section at your own pace.',
      action: 'Click "Finish" to end the tutorial and start exploring.'
    }
  ];
  
  // Handle tutorial completion
  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-md p-6">
        <h1 className="text-3xl font-bold mb-2">Advanced Features</h1>
        <p className="text-gray-600">
          Explore advanced learning and simulation features to deepen your understanding of DeFi and the Compound Protocol.
        </p>
      </div>
      
      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex overflow-x-auto">
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'interactive-tutorials'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('interactive-tutorials')}
            >
              Interactive Tutorials
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'advanced-simulations'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('advanced-simulations')}
            >
              Advanced Simulations
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'personalized-learning'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('personalized-learning')}
            >
              Personalized Learning
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'advanced-quizzes'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('advanced-quizzes')}
            >
              Advanced Quizzes
            </button>
            <button
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                activeTab === 'ai-assistant'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('ai-assistant')}
            >
              AI Assistant
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        <div className="p-6">
          {activeTab === 'interactive-tutorials' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Interactive Tutorials</h2>
              <p className="text-gray-600 mb-6">
                Learn DeFi concepts through guided walkthroughs with step-by-step instructions and interactive elements.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Guided Walkthroughs</h3>
                  <p className="text-gray-600 mb-4">
                    Step-by-step tutorials that guide you through complex DeFi concepts and Compound Protocol features.
                  </p>
                  <button
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    onClick={() => navigate('/learn')}
                  >
                    Start Tutorial
                  </button>
                </div>
                
                <div className="bg-green-50 border border-green-100 rounded-xl p-6">
                  <h3 className="text-xl font-semibold mb-3">Try It Yourself</h3>
                  <p className="text-gray-600 mb-4">
                    Hands-on exercises that let you practice DeFi concepts in a guided environment.
                  </p>
                  <TryItYourself
                    title="Supply Assets Exercise"
                    description="Learn how to supply assets to Compound"
                    steps={[
                      { title: "Select an asset", description: "Choose which asset you want to supply" },
                      { title: "Enter amount", description: "Specify how much you want to supply" },
                      { title: "Confirm transaction", description: "Review and confirm your supply transaction" }
                    ]}
                    badgeId="try_it_supply"
                    badgeName="Supply Master"
                    badgeDescription="Completed the supply assets exercise"
                  />
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'advanced-simulations' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Advanced Simulations</h2>
              <p className="text-gray-600 mb-6">
                Test your strategies under different market conditions and scenarios to better understand risk and opportunity.
              </p>
              
              <div className="space-y-8">
                <MarketStressTesting />
                <HistoricalScenario />
                <MultiStepSimulation />
              </div>
            </div>
          )}
          
          {activeTab === 'personalized-learning' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Personalized Learning</h2>
              <p className="text-gray-600 mb-6">
                Get a customized learning experience based on your knowledge level, interests, and goals.
              </p>
              
              <div className="space-y-8">
                <SkillAssessment />
                <LearningPath pathId="defi-basics" />
                <RecommendedNextSteps />
              </div>
            </div>
          )}
          
          {activeTab === 'advanced-quizzes' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Advanced Quizzes</h2>
              <p className="text-gray-600 mb-6">
                Test your knowledge with different types of quizzes and challenges.
              </p>
              
             {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Difficulty Levels</h3>
                  <p className="text-gray-600 mb-4">
                    Choose from beginner, intermediate, or advanced quizzes.
                  </p>
                  <button
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    onClick={() => { Logic to show quiz }}
                  >
                    Start Quiz
                  </button>
                </div> 
                
                <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Scenario Questions</h3>
                  <p className="text-gray-600 mb-4">
                    Apply your knowledge to realistic DeFi scenarios.
                  </p>
                  <button
                    className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700"
                    onClick={() => { Logic to show scenario }}
                  >
                    Start Scenario
                  </button>
                </div>
                
                <div className="bg-white border rounded-xl p-6 hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-semibold mb-3">Timed Challenges</h3>
                  <p className="text-gray-600 mb-4">
                    Test your knowledge under time pressure.
                  </p>
                  <button
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                    onClick={() => { Logic to show challenge }}
                  >
                    Start Challenge
                  </button>
                </div>
              </div> */}
              
              <div className="space-y-8">
                <AdvancedQuiz topic="ctoken" difficulty="medium" />
                <ScenarioQuestion />
                <TimedChallenge difficulty="medium" />
              </div>
            </div>
          )}
          
          {activeTab === 'ai-assistant' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">AI Learning Assistant</h2>
              <p className="text-gray-600 mb-6">
                Get personalized explanations and recommendations powered by AI.
              </p>
              
              <div className="space-y-8">
                <AILearningAssistant />
                {/* <ConceptSimplifier concept="Collateral Factor" /> */}
                <StrategyRecommendation />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Tutorial System */}
      {showTutorial && (
        <TutorialSystem
          tutorialId="advanced-features-intro"
          steps={tutorialSteps}
          onComplete={handleTutorialComplete}
        />
      )}
    </div>
  );
};

export default AdvancedFeatures;
