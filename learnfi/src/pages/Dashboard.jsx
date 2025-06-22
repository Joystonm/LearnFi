import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useUser } from '../context/UserContext';
import { useCompound } from '../context/CompoundContext';
import BadgeReward from '../components/BadgeReward';
import TokenCard from '../components/TokenCard';

const Dashboard = () => {
  // Get user data from context
  const { user, calculateProgress } = useUser();
  const { userCompound } = useCompound();
  
  // Refs for GSAP animations
  const progressBarRef = useRef(null);
  const balanceRef = useRef(null);
  const badgesRef = useRef(null);
  const activityRef = useRef(null);
  
  // Calculate user progress
  const progressPercentage = calculateProgress();
  
  // GSAP animations on component mount
  useEffect(() => {
    // Create a timeline for dashboard animations
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate dashboard elements
    tl.from(".dashboard-card", { 
      opacity: 0, 
      y: 30, 
      stagger: 0.15,
      duration: 0.8 
    });
    
    // Animate progress bar
    gsap.to(progressBarRef.current, {
      width: `${progressPercentage}%`,
      duration: 1.5,
      ease: "power2.out",
      delay: 0.5
    });
    
    // Animate balance counters
    const balanceElements = balanceRef.current.querySelectorAll('.token-balance');
    gsap.from(balanceElements, {
      textContent: 0,
      duration: 2,
      ease: "power2.out",
      snap: { textContent: 0.001 },
      stagger: 0.2,
      delay: 0.8,
      onUpdate: function() {
        for (let i = 0; i < balanceElements.length; i++) {
          balanceElements[i].textContent = parseFloat(balanceElements[i].textContent).toFixed(4);
        }
      }
    });
    
    // Add hover animations for badges
    gsap.utils.toArray('.badge-item').forEach(badge => {
      badge.addEventListener('mouseenter', () => {
        gsap.to(badge, {
          scale: 1.1,
          duration: 0.3,
          ease: "back.out(1.7)"
        });
      });
      
      badge.addEventListener('mouseleave', () => {
        gsap.to(badge, {
          scale: 1,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
    
    return () => {
      // Clean up animations
      tl.kill();
    };
  }, [progressPercentage]);
  
  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your DeFi Dashboard</h1>
      
      {/* Progress Section */}
      <div className="dashboard-card bg-white p-6 rounded-xl shadow-md mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Your Progress</h2>
          <div className="text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
            Level {user.level}: DeFi Explorer
          </div>
        </div>
        
        <div className="h-4 bg-gray-200 rounded-full mb-2">
          <div 
            ref={progressBarRef} 
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" 
            style={{ width: '0%' }}
          ></div>
        </div>
        
        <div className="flex justify-between text-sm text-gray-600">
          <span>{progressPercentage}% Complete</span>
          <span>{user.experience} / {user.level * 100} XP</span>
        </div>
      </div>
      
      {/* Balance Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div className="dashboard-card bg-white p-6 rounded-xl shadow-md" ref={balanceRef}>
          <h2 className="text-xl font-semibold mb-4">Your Simulated Balance</h2>
          
          <div className="space-y-4">
            {Object.entries(user.balance).map(([token, amount]) => (
              <TokenCard 
                key={token}
                symbol={token}
                amount={amount}
                className="mb-3"
              />
            ))}
          </div>
          
          <div className="mt-6">
            <Link 
              to="/simulate" 
              className="btn btn-primary w-full text-center py-2"
            >
              Simulate More
            </Link>
          </div>
        </div>
        
        {/* Compound Position */}
        <div className="dashboard-card bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Compound Position</h2>
          
          {Object.keys(userCompound.supplied).length > 0 ? (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Supplied Assets</h3>
              <div className="space-y-2 mb-4">
                {Object.entries(userCompound.supplied).map(([token, amount]) => (
                  <div key={token} className="flex justify-between items-center">
                    <span>{token}</span>
                    <span className="font-medium">{amount.toFixed(4)}</span>
                  </div>
                ))}
              </div>
              
              <h3 className="font-medium text-gray-700 mb-2">Borrowed Assets</h3>
              <div className="space-y-2 mb-4">
                {Object.entries(userCompound.borrowed).map(([token, amount]) => (
                  <div key={token} className="flex justify-between items-center">
                    <span>{token}</span>
                    <span className="font-medium">{amount.toFixed(4)}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">Health Factor</span>
                  <span 
                    className={`text-sm font-medium ${
                      userCompound.health > 50 ? 'text-green-600' : 
                      userCompound.health > 25 ? 'text-yellow-600' : 'text-red-600'
                    }`}
                  >
                    {userCompound.health.toFixed(2)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full">
                  <div 
                    className={`h-full rounded-full ${
                      userCompound.health > 50 ? 'bg-green-500' : 
                      userCompound.health > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${userCompound.health}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">You haven't supplied any assets yet</p>
              <Link 
                to="/simulate" 
                className="btn btn-primary"
              >
                Try Compound Simulation
              </Link>
            </div>
          )}
        </div>
      </div>
      
      {/* Badges Section */}
      <div className="dashboard-card bg-white p-6 rounded-xl shadow-md mb-8" ref={badgesRef}>
        <h2 className="text-xl font-semibold mb-4">Your Rewards</h2>
        
        {user.badges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {user.badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <BadgeReward badge={badge} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">Complete lessons and quizzes to earn badges</p>
            <Link 
              to="/learn" 
              className="btn btn-primary"
            >
              Start Learning
            </Link>
          </div>
        )}
      </div>
      
      {/* Recent Activity */}
      <div className="dashboard-card bg-white p-6 rounded-xl shadow-md" ref={activityRef}>
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        
        {user.simulationHistory.length > 0 ? (
          <div className="space-y-3">
            {user.simulationHistory.slice(0, 5).map((activity, index) => (
              <div key={index} className="flex items-center border-b border-gray-100 pb-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                  {activity.type === 'supply' ? '📥' : '📤'}
                </div>
                <div>
                  <p className="font-medium">
                    {activity.type === 'supply' ? 'Supplied' : 'Borrowed'} {activity.amount} {activity.token}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(activity.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">No activity yet</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
