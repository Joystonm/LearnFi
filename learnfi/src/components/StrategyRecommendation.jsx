import React, { useState } from 'react';
import { useCompound } from '../context/CompoundContext';
import { useUser } from '../context/UserContext';
import { groqService } from '../services/groqService';

const StrategyRecommendation = () => {
  const { marketData } = useCompound();
  const { user } = useUser();
  
  const [riskTolerance, setRiskTolerance] = useState('medium');
  const [investmentGoal, setInvestmentGoal] = useState('income');
  const [timeHorizon, setTimeHorizon] = useState('medium');
  const [recommendation, setRecommendation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Risk tolerance options
  const riskToleranceOptions = [
    { id: 'low', label: 'Low Risk', description: 'Prioritize safety over returns' },
    { id: 'medium', label: 'Medium Risk', description: 'Balance between safety and returns' },
    { id: 'high', label: 'High Risk', description: 'Prioritize returns over safety' }
  ];
  
  // Investment goal options
  const investmentGoalOptions = [
    { id: 'income', label: 'Steady Income', description: 'Generate consistent passive income' },
    { id: 'growth', label: 'Capital Growth', description: 'Grow your principal investment' },
    { id: 'preservation', label: 'Capital Preservation', description: 'Protect your assets from market volatility' }
  ];
  
  // Time horizon options
  const timeHorizonOptions = [
    { id: 'short', label: 'Short Term', description: '1-3 months' },
    { id: 'medium', label: 'Medium Term', description: '3-12 months' },
    { id: 'long', label: 'Long Term', description: '1+ years' }
  ];
  
  // Generate strategy recommendation
  const generateRecommendation = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would call the AI service
      // For now, we'll use predefined recommendations based on parameters
      
      // Get market data for recommendations
      const stablecoins = marketData.filter(m => ['DAI', 'USDC'].includes(m.symbol));
      const volatileAssets = marketData.filter(m => ['ETH', 'WBTC'].includes(m.symbol));
      
      // Sort by supply APY
      const bestSupplyStablecoin = stablecoins.sort((a, b) => b.supplyApy - a.supplyApy)[0];
      const bestSupplyVolatile = volatileAssets.sort((a, b) => b.supplyApy - a.supplyApy)[0];
      
      // Sort by borrow APY (lowest first)
      const bestBorrowStablecoin = stablecoins.sort((a, b) => a.borrowApy - b.borrowApy)[0];
      const bestBorrowVolatile = volatileAssets.sort((a, b) => a.borrowApy - b.borrowApy)[0];
      
      // Generate recommendation based on parameters
      let strategy;
      let explanation;
      let steps = [];
      let risks = [];
      let expectedReturns;
      
      if (riskTolerance === 'low') {
        if (investmentGoal === 'income' || investmentGoal === 'preservation') {
          strategy = 'Stablecoin Lending';
          explanation = `Based on your low risk tolerance and ${investmentGoal === 'income' ? 'income' : 'capital preservation'} goal, we recommend a conservative stablecoin lending strategy. This approach minimizes volatility while generating steady returns.`;
          steps = [
            `Supply ${bestSupplyStablecoin?.symbol || 'stablecoins'} to earn ${bestSupplyStablecoin?.supplyApy.toFixed(2) || '~2-3'}% APY`,
            'Maintain a healthy buffer and avoid borrowing to eliminate liquidation risk',
            'Reinvest earned interest periodically to compound returns'
          ];
          risks = [
            'Smart contract risk',
            'Stablecoin depegging risk (minimal)',
            'Interest rate fluctuations'
          ];
          expectedReturns = `${bestSupplyStablecoin?.supplyApy.toFixed(2) || '2-3'}% APY`;
        } else { // growth
          strategy = 'Conservative Growth';
          explanation = 'For growth with low risk tolerance, we recommend a primarily stablecoin strategy with a small allocation to volatile assets. This provides some exposure to upside potential while maintaining safety.';
          steps = [
            `Supply 80% ${bestSupplyStablecoin?.symbol || 'stablecoins'} to earn ${bestSupplyStablecoin?.supplyApy.toFixed(2) || '~2-3'}% APY`,
            `Supply 20% ${bestSupplyVolatile?.symbol || 'ETH/WBTC'} for growth potential`,
            'Avoid borrowing to eliminate liquidation risk'
          ];
          risks = [
            'Smart contract risk',
            'Limited exposure to volatile asset price fluctuations',
            'Interest rate fluctuations'
          ];
          expectedReturns = `${((bestSupplyStablecoin?.supplyApy * 0.8) + (bestSupplyVolatile?.supplyApy * 0.2)).toFixed(2) || '3-5'}% APY plus potential capital appreciation`;
        }
      } else if (riskTolerance === 'medium') {
        if (investmentGoal === 'income') {
          strategy = 'Balanced Lending and Borrowing';
          explanation = 'For medium risk tolerance with an income goal, we recommend a balanced approach of supplying stablecoins and borrowing at a conservative ratio to enhance yields.';
          steps = [
            `Supply ${bestSupplyStablecoin?.symbol || 'stablecoins'} to earn ${bestSupplyStablecoin?.supplyApy.toFixed(2) || '~2-3'}% APY`,
            `Borrow up to 30% of your collateral value in ${bestBorrowStablecoin?.symbol || 'stablecoins'}`,
            'Use borrowed funds to supply more assets, creating a loop that increases returns'
          ];
          risks = [
            'Smart contract risk',
            'Moderate liquidation risk if market conditions change',
            'Interest rate fluctuations affecting borrow costs'
          ];
          expectedReturns = `${((bestSupplyStablecoin?.supplyApy * 1.3) - (bestBorrowStablecoin?.borrowApy * 0.3)).toFixed(2) || '4-6'}% net APY`;
        } else if (investmentGoal === 'growth') {
          strategy = 'Growth-Oriented Portfolio';
          explanation = 'For growth with medium risk tolerance, we recommend a diversified portfolio with both stablecoins and volatile assets, plus strategic borrowing.';
          steps = [
            `Supply 50% ${bestSupplyStablecoin?.symbol || 'stablecoins'} for stability`,
            `Supply 50% ${bestSupplyVolatile?.symbol || 'ETH/WBTC'} for growth potential`,
            `Optionally borrow up to 20% of your collateral value in ${bestBorrowStablecoin?.symbol || 'stablecoins'} to reinvest`
          ];
          risks = [
            'Smart contract risk',
            'Moderate exposure to volatile asset price fluctuations',
            'Potential liquidation risk if borrowing'
          ];
          expectedReturns = `${((bestSupplyStablecoin?.supplyApy * 0.5) + (bestSupplyVolatile?.supplyApy * 0.5)).toFixed(2) || '3-8'}% APY plus potential capital appreciation`;
        } else { // preservation
          strategy = 'Diversified Preservation';
          explanation = 'For capital preservation with medium risk tolerance, we recommend diversifying across multiple stablecoins with minimal borrowing.';
          steps = [
            'Diversify across multiple stablecoin markets to reduce platform-specific risk',
            'Maintain a small portion in volatile assets as a hedge against inflation',
            'Keep borrowing minimal to reduce liquidation risk'
          ];
          risks = [
            'Smart contract risk across multiple platforms',
            'Limited exposure to volatile asset price fluctuations',
            'Stablecoin depegging risk (mitigated through diversification)'
          ];
          expectedReturns = `${bestSupplyStablecoin?.supplyApy.toFixed(2) || '2-4'}% APY with enhanced stability`;
        }
      } else { // high risk
        if (investmentGoal === 'income') {
          strategy = 'Leveraged Yield Farming';
          explanation = 'For high risk tolerance with an income goal, we recommend a leveraged approach to maximize yield through recursive borrowing and lending.';
          steps = [
            `Supply ${bestSupplyVolatile?.symbol || 'ETH/WBTC'} as collateral`,
            `Borrow up to 50% of your collateral value in ${bestBorrowStablecoin?.symbol || 'stablecoins'}`,
            'Supply borrowed assets to earn additional yield, and repeat for multiple loops',
            'Monitor positions closely to avoid liquidation'
          ];
          risks = [
            'High liquidation risk during market volatility',
            'Smart contract risk',
            'Interest rate fluctuations affecting profitability',
            'Complex position management required'
          ];
          expectedReturns = `${((bestSupplyStablecoin?.supplyApy * 2) - (bestBorrowStablecoin?.borrowApy * 1)).toFixed(2) || '8-15'}% net APY (variable)`;
        } else if (investmentGoal === 'growth') {
          strategy = 'Aggressive Growth Strategy';
          explanation = 'For maximum growth with high risk tolerance, we recommend focusing on volatile assets with strategic borrowing to amplify returns.';
          steps = [
            `Supply ${bestSupplyVolatile?.symbol || 'ETH/WBTC'} as primary collateral`,
            `Borrow ${bestBorrowStablecoin?.symbol || 'stablecoins'} up to 40% of collateral value`,
            'Use borrowed funds to purchase more volatile assets',
            'Monitor closely and adjust positions based on market trends'
          ];
          risks = [
            'High liquidation risk during market downturns',
            'Significant exposure to volatile asset price fluctuations',
            'Smart contract risk',
            'Requires active management'
          ];
          expectedReturns = 'Variable based on market performance, potentially 15%+ APY with price appreciation';
        } else { // preservation
          strategy = 'Dynamic Hedging Strategy';
          explanation = 'For capital preservation with high risk tolerance, we recommend a dynamic approach that adjusts positions based on market conditions.';
          steps = [
            'Maintain a base of stablecoin deposits for security',
            'Use a portion of funds for strategic short-term positions',
            'Implement stop-loss strategies to protect capital',
            'Rebalance regularly based on market conditions'
          ];
          risks = [
            'Requires active management and market monitoring',
            'Strategy execution risk',
            'Smart contract risk',
            'Moderate liquidation risk'
          ];
          expectedReturns = 'Variable based on market conditions, targeting 5-10% while preserving capital';
        }
      }
      
      // Set recommendation
      setRecommendation({
        strategy,
        explanation,
        steps,
        risks,
        expectedReturns,
        parameters: {
          riskTolerance,
          investmentGoal,
          timeHorizon
        }
      });
    } catch (error) {
      console.error('Error generating recommendation:', error);
      setError('Failed to generate recommendation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
        <h2 className="text-xl font-semibold flex items-center">
          <span className="mr-2">📊</span> Strategy Recommendation
        </h2>
        <p className="text-sm text-green-100">
          Get personalized DeFi strategies based on your goals and risk tolerance
        </p>
      </div>
      
      <div className="p-6">
        {recommendation ? (
          <div>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">{recommendation.strategy}</h3>
              <p className="text-gray-600 mb-4">{recommendation.explanation}</p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  recommendation.parameters.riskTolerance === 'low' ? 'bg-green-100 text-green-800' :
                  recommendation.parameters.riskTolerance === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {riskToleranceOptions.find(o => o.id === recommendation.parameters.riskTolerance)?.label}
                </span>
                
                <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-800">
                  {investmentGoalOptions.find(o => o.id === recommendation.parameters.investmentGoal)?.label}
                </span>
                
                <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                  {timeHorizonOptions.find(o => o.id === recommendation.parameters.timeHorizon)?.label}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <span className="mr-2">📝</span> Implementation Steps
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-gray-700">
                  {recommendation.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-3 flex items-center">
                  <span className="mr-2">⚠️</span> Risk Factors
                </h4>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {recommendation.risks.map((risk, index) => (
                    <li key={index}>{risk}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-100 rounded-lg p-4 mb-6">
              <h4 className="font-medium mb-2 flex items-center">
                <span className="mr-2">💰</span> Expected Returns
              </h4>
              <p className="text-gray-700">{recommendation.expectedReturns}</p>
            </div>
            
            <div className="flex justify-between">
              <button
                onClick={() => setRecommendation(null)}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
              >
                Adjust Parameters
              </button>
              
              <button
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Try This Strategy
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p className="text-gray-600 mb-6">
              Tell us about your preferences, and we'll recommend a DeFi strategy tailored to your needs.
            </p>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your risk tolerance?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {riskToleranceOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      riskTolerance === option.id
                        ? option.id === 'low' ? 'border-green-500 bg-green-50' :
                          option.id === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                          'border-red-500 bg-red-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setRiskTolerance(option.id)}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your primary investment goal?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {investmentGoalOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      investmentGoal === option.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setInvestmentGoal(option.id)}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What is your time horizon?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {timeHorizonOptions.map((option) => (
                  <button
                    key={option.id}
                    className={`p-3 border rounded-lg text-left transition-colors ${
                      timeHorizon === option.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => setTimeHorizon(option.id)}
                  >
                    <h4 className="font-medium">{option.label}</h4>
                    <p className="text-xs text-gray-500">{option.description}</p>
                  </button>
                ))}
              </div>
            </div>
            
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
                {error}
              </div>
            )}
            
            <button
              onClick={generateRecommendation}
              disabled={isLoading}
              className={`w-full py-3 rounded-lg ${
                isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating Recommendation...
                </span>
              ) : (
                'Get Strategy Recommendation'
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyRecommendation;
