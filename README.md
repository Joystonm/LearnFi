# LearnFi - The Gamified, AI-Powered DeFi Playground

LearnFi is an interactive educational platform that teaches users about DeFi concepts through the Compound Protocol in a fun, gamified way. The application combines AI-powered explanations, interactive simulations, and gamification elements to make learning about DeFi accessible and engaging.

## Features

- **Interactive Learning Modules**: Learn DeFi concepts with AI-powered explanations
- **Compound Protocol Simulation**: Practice supplying and borrowing in a risk-free environment
- **GSAP Animations**: Engaging visual feedback for user actions
- **Gamification**: Earn badges and track progress through your DeFi learning journey
- **Real-time Market Data**: View and analyze Compound market information

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/Joystonm/LearnFi.git
   cd LearnFi
   ```

2. Install dependencies:
   ```
   cd learnfi
   npm install
   ```

3. Create a `.env` file in the learnfi directory with your API keys:
   ```
   REACT_APP_GROQ_API_KEY=your_groq_api_key_here
   REACT_APP_TAVILY_API_KEY=your_tavily_api_key_here
   REACT_APP_COMPOUND_NETWORK=mainnet
   REACT_APP_ENV=development
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

## Project Structure

```
learnfi/
│
├── public/                   # Static files
│   └── index.html
│
├── src/
│   ├── assets/               # Icons, images, badges
│   ├── components/           # Reusable UI components
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── TokenCard.jsx
│   │   ├── BadgeReward.jsx
│   │   └── TooltipExplainer.jsx
│   │
│   ├── pages/                # Page-level views
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LearnModule.jsx
│   │   ├── SimulateCompound.jsx
│   │   └── MarketData.jsx
│   │
│   ├── services/             # External API handlers
│   │   ├── compoundService.js # Compound.js integration
│   │   ├── groqService.js    # Groq AI explainers
│   │   ├── tavilyService.js  # Tavily trivia fetch
│   │   └── memoryService.js  # localStorage helpers
│
│   ├── context/              # React Context (for global state)
│   │   ├── UserContext.jsx
│   │   └── CompoundContext.jsx
│
│   ├── hooks/                # Custom hooks
│   │   └── useCompound.js
│
│   ├── data/                 # Static DeFi concepts, terms
│   │   └── glossary.js
│
│   ├── styles/               # Tailwind or CSS modules
│   │   └── global.css
│
│   ├── App.jsx               # App entry point
│   ├── index.js              # ReactDOM entry
│   └── config.js             # API keys and base URLs
│
├── craco.config.js           # Webpack configuration for polyfills
├── package.json
└── README.md
```

## Technologies Used

- **Frontend**: React.js
- **State Management**: React Context
- **Animation**: GSAP (GreenSock)
- **DeFi Integration**: Compound.js SDK
- **AI Explanations**: Groq API ,Tavily API
- **Styling**: Tailwind CSS
- **Memory**: localStorage


