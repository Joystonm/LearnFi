import React from 'react';
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

function App() {
  return (
    <Router>
      <UserProvider>
        <CompoundProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
            <Header />
            <main className="flex-grow container mx-auto px-4 py-8">
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
