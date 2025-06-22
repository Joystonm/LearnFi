// Quiz questions for each topic
export const quizQuestions = {
  ctoken: [
    {
      question: "What is a cToken in the Compound Protocol?",
      options: [
        "A cryptocurrency that can only be used within Compound",
        "A token that represents your deposited assets in Compound",
        "A token used for governance voting in Compound",
        "A token that represents your borrowed assets in Compound"
      ],
      correctIndex: 1,
      explanation: "cTokens are tokens that represent your deposited assets in Compound. When you supply an asset, you receive cTokens in return which automatically earn interest through their exchange rate increasing over time."
    },
    {
      question: "How do you calculate how many cTokens you receive when supplying assets?",
      options: [
        "Amount of asset × exchange rate",
        "Amount of asset / exchange rate",
        "Amount of asset × (1 + APY)",
        "Amount of asset × collateral factor"
      ],
      correctIndex: 1,
      explanation: "The number of cTokens you receive is calculated as: Amount of asset / exchange rate. For example, if the exchange rate is 0.02 ETH per cETH and you supply 1 ETH, you'll receive 1/0.02 = 50 cETH."
    },
    {
      question: "How do cTokens generate interest for users?",
      options: [
        "Through manual dividend payments",
        "Through their exchange rate, which increases over time",
        "Through staking rewards",
        "Through transaction fees"
      ],
      correctIndex: 1,
      explanation: "cTokens generate interest through their exchange rate, which increases over time relative to the underlying asset. This means each cToken becomes worth more of the underlying asset as time passes."
    },
    {
      question: "What happens to your cTokens when you withdraw your supplied assets?",
      options: [
        "They are burned in exchange for the underlying asset plus interest",
        "They are transferred to the Compound treasury",
        "They remain in your wallet but become inactive",
        "They are converted to COMP tokens"
      ],
      correctIndex: 0,
      explanation: "When you withdraw your supplied assets, your cTokens are burned (redeemed) in exchange for the underlying asset plus any accrued interest."
    }
  ],
  apy: [
    {
      question: "What does APY stand for in the context of DeFi?",
      options: [
        "Annual Percentage Yield",
        "Automated Protocol Yield",
        "Asset Price Yearly",
        "Annual Protocol Yield"
      ],
      correctIndex: 0,
      explanation: "APY stands for Annual Percentage Yield, which represents the rate of return earned on an investment over a year, taking into account the effect of compounding interest."
    },
    {
      question: "How is APY different from APR (Annual Percentage Rate)?",
      options: [
        "APY is always lower than APR",
        "APY includes compounding effects while APR does not",
        "APY is only used for borrowing while APR is for lending",
        "There is no difference between APY and APR"
      ],
      correctIndex: 1,
      explanation: "APY includes the effects of compounding interest, while APR does not. This means that for the same nominal rate, APY will result in a higher effective return than APR because it accounts for interest earned on interest."
    },
    {
      question: "If an asset has a 10% APY, approximately how much would $1,000 grow to after one year?",
      options: [
        "$1,010",
        "$1,100",
        "$1,105",
        "$1,000 + $100 × (exchange rate increase)"
      ],
      correctIndex: 1,
      explanation: "With a 10% APY, $1,000 would grow to approximately $1,100 after one year. The calculation is: Initial Amount × (1 + APY) = $1,000 × 1.10 = $1,100."
    },
    {
      question: "What factors influence the APY in Compound?",
      options: [
        "Only the total supply of assets in the protocol",
        "Only the total borrowing demand in the protocol",
        "Supply and demand dynamics, utilization rate, and protocol parameters",
        "Only the governance decisions made by COMP token holders"
      ],
      correctIndex: 2,
      explanation: "APY in Compound is influenced by supply and demand dynamics, the utilization rate of assets (percentage of supplied assets being borrowed), and protocol parameters set through governance."
    }
  ],
  collateral: [
    {
      question: "What is the collateral factor in Compound?",
      options: [
        "The percentage of your supplied assets you can withdraw",
        "The percentage of your supplied assets you can borrow against",
        "The interest rate you earn on supplied assets",
        "The fee charged when supplying assets"
      ],
      correctIndex: 1,
      explanation: "The collateral factor is the percentage of your supplied assets that you can borrow against. For example, if ETH has a collateral factor of 75%, you can borrow up to 75% of the value of your supplied ETH."
    },
    {
      question: "How is the borrow limit calculated in Compound?",
      options: [
        "Supplied Value × 0.5",
        "Supplied Value × Collateral Factor",
        "Supplied Value × (1 - Collateral Factor)",
        "Supplied Value / Collateral Factor"
      ],
      correctIndex: 1,
      explanation: "The borrow limit is calculated as: Supplied Value × Collateral Factor. For multiple assets, it's the sum of each asset's supplied value multiplied by its respective collateral factor."
    },
    {
      question: "If you supply 10 ETH worth $3,000 each with a collateral factor of 75%, what is your maximum borrowing capacity?",
      options: [
        "$22,500",
        "$30,000",
        "$7,500",
        "$40,000"
      ],
      correctIndex: 0,
      explanation: "Your maximum borrowing capacity would be: 10 ETH × $3,000 × 0.75 = $22,500."
    },
    {
      question: "Why do different assets have different collateral factors in Compound?",
      options: [
        "To encourage users to supply specific assets",
        "Based on the market capitalization of each asset",
        "Based on the risk profile and volatility of each asset",
        "It's randomly assigned by the protocol"
      ],
      correctIndex: 2,
      explanation: "Different assets have different collateral factors based on their risk profile and volatility. Stablecoins typically have higher collateral factors (80-90%) while more volatile assets like ETH or WBTC have lower collateral factors (50-75%)."
    }
  ],
  liquidation: [
    {
      question: "What triggers a liquidation in Compound?",
      options: [
        "When you fail to repay your loan on time",
        "When the value of your collateral falls below the required threshold relative to your borrowed amount",
        "When the interest rates become too high",
        "When you withdraw your supplied assets"
      ],
      correctIndex: 1,
      explanation: "A liquidation is triggered when the value of your collateral falls below the required threshold relative to your borrowed amount, often due to price fluctuations of the collateral asset."
    },
    {
      question: "How is the health factor calculated in Compound?",
      options: [
        "(Supplied Value × Collateral Factor) / Borrowed Value × 100",
        "Supplied Value / (Borrowed Value × Collateral Factor) × 100",
        "(Supplied Value - Borrowed Value) / Supplied Value × 100",
        "Borrowed Value / Supplied Value × 100"
      ],
      correctIndex: 0,
      explanation: "The health factor is calculated as: (Supplied Value × Collateral Factor) / Borrowed Value × 100. A health factor below 100% means your position is eligible for liquidation."
    },
    {
      question: "What happens during a liquidation event?",
      options: [
        "Your entire collateral is sold to repay your debt",
        "A portion of your collateral is sold at a discount to repay part of your debt",
        "Your borrowed assets are frozen until you add more collateral",
        "The protocol automatically adds more collateral to your position"
      ],
      correctIndex: 1,
      explanation: "During a liquidation event, a portion of your collateral is sold at a discount (liquidation penalty) to repay part of your debt. Liquidators perform this function and receive the discount as an incentive."
    },
    {
      question: "How can you avoid liquidation in Compound?",
      options: [
        "Only by repaying all your borrowed assets",
        "By maintaining a high health factor through adding more collateral, repaying loans, or avoiding excessive borrowing",
        "By only borrowing stablecoins",
        "By paying a liquidation prevention fee"
      ],
      correctIndex: 1,
      explanation: "You can avoid liquidation by maintaining a high health factor. This can be achieved by adding more collateral, repaying some of your borrowed assets, or avoiding borrowing too close to your maximum limit."
    }
  ],
  interest: [
    {
      question: "How are interest rates determined in Compound?",
      options: [
        "Fixed rates set by the Compound team",
        "Based on the Federal Reserve interest rates",
        "Through algorithmic models based on supply and demand (utilization rate)",
        "Voted on by COMP token holders"
      ],
      correctIndex: 2,
      explanation: "Interest rates in Compound are determined through algorithmic models based on the utilization rate, which is the percentage of supplied assets that are currently being borrowed."
    },
    {
      question: "What is the utilization rate in Compound?",
      options: [
        "The percentage of users who are actively using the protocol",
        "The percentage of supplied assets that are currently being borrowed",
        "The percentage of the protocol's capacity being used",
        "The percentage of COMP tokens being staked"
      ],
      correctIndex: 1,
      explanation: "The utilization rate is the percentage of supplied assets that are currently being borrowed. It's calculated as: Total Borrowed / Total Supplied × 100."
    },
    {
      question: "How does the utilization rate affect interest rates?",
      options: [
        "Higher utilization leads to lower borrow rates to encourage more borrowing",
        "Utilization has no effect on interest rates",
        "Higher utilization leads to higher supply and borrow rates",
        "Higher utilization only affects supply rates, not borrow rates"
      ],
      correctIndex: 2,
      explanation: "Higher utilization leads to higher interest rates for both suppliers and borrowers. This is designed to balance supply and demand - higher rates incentivize more supply and discourage additional borrowing when utilization is high."
    },
    {
      question: "What is the relationship between supply APY and borrow APY?",
      options: [
        "They are always equal",
        "Borrow APY is always higher than supply APY",
        "Supply APY is always higher than borrow APY",
        "They are inversely related - when one goes up, the other goes down"
      ],
      correctIndex: 1,
      explanation: "Borrow APY is always higher than supply APY. The difference (spread) is used to build reserves for the protocol and as a return for the protocol's capital providers."
    }
  ],
  governance: [
    {
      question: "What is Compound Governance?",
      options: [
        "The legal entity that owns the Compound protocol",
        "The system where COMP token holders can propose and vote on changes to the protocol",
        "The team of developers who maintain the Compound codebase",
        "The regulatory framework that oversees DeFi lending"
      ],
      correctIndex: 1,
      explanation: "Compound Governance is the system where COMP token holders can propose and vote on changes to the protocol. This includes adjusting interest rate models, adding new assets, or changing collateral factors."
    },
    {
      question: "What is the COMP token used for in Compound?",
      options: [
        "Only for earning interest on supplied assets",
        "Only for paying transaction fees",
        "For governance voting and protocol ownership",
        "It has no utility in the protocol"
      ],
      correctIndex: 2,
      explanation: "The COMP token is used for governance voting and represents ownership in the protocol. COMP holders can propose and vote on changes to the protocol parameters and features."
    },
    {
      question: "How can users earn COMP tokens?",
      options: [
        "Only by buying them on exchanges",
        "By supplying or borrowing assets on Compound",
        "Only by participating in governance votes",
        "Only through airdrops from the Compound team"
      ],
      correctIndex: 1,
      explanation: "Users can earn COMP tokens by supplying or borrowing assets on Compound. The protocol distributes COMP tokens to users based on their activity, incentivizing participation."
    },
    {
      question: "What types of proposals can be made through Compound Governance?",
      options: [
        "Only technical upgrades to the protocol",
        "Only changes to interest rate models",
        "Only adding new assets to the protocol",
        "A wide range including parameter adjustments, adding assets, technical upgrades, and fund allocations"
      ],
      correctIndex: 3,
      explanation: "Compound Governance allows for a wide range of proposals including parameter adjustments (like collateral factors), adding new assets to the protocol, technical upgrades to the codebase, and allocations of community funds."
    }
  ]
};
