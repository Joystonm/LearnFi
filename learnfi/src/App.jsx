import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import LearnModule from './pages/LearnModule';
import SimulateCompound from './pages/SimulateCompound';
import MarketData from './pages/MarketData';
import { UserProvider } from './context/UserContext';
import { CompoundProvider } from './context/CompoundContext';
import { gsap } from 'gsap';

function App() {
  // Initialize GSAP
  useEffect(() => {
    // Set default ease for all animations
    gsap.defaults({
      ease: "power2.out",
      duration: 0.7
    });
    
    // Global animation for page transitions
    gsap.registerEffect({
      name: "fadeIn",
      effect: (targets) => {
        return gsap.from(targets, { 
          opacity: 0, 
          y: 20, 
          stagger: 0.1,
          clearProps: "all" 
        });
      }
    });
  }, []);

  return (
    <Router>
      <UserProvider>
        <CompoundProvider>
          <div className="app min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />
            <main className="container mx-auto px-4 py-8 flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/learn" element={<LearnModule />} />
                <Route path="/learn/:topicId" element={<LearnModule />} />
                <Route path="/simulate" element={<SimulateCompound />} />
                <Route path="/market-data" element={<MarketData />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </CompoundProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
