// Memory service for storing user data locally
// This could be replaced with mem0 or another service in the future

const USER_DATA_KEY = 'learnfi_user_data';
const COMPLETED_TOPICS_KEY = 'learnfi_completed_topics';
const BADGES_KEY = 'learnfi_badges';
const SIMULATION_HISTORY_KEY = 'learnfi_simulation_history';

// Helper function to safely parse JSON
const safelyParseJSON = (json) => {
  try {
    return JSON.parse(json);
  } catch (e) {
    return null;
  }
};

// Save user data to localStorage
const saveUserData = (userData) => {
  try {
    localStorage.setItem(USER_DATA_KEY, JSON.stringify(userData));
    return true;
  } catch (error) {
    console.error('Error saving user data:', error);
    return false;
  }
};

// Get user data from localStorage
const getUserData = () => {
  const userData = localStorage.getItem(USER_DATA_KEY);
  return safelyParseJSON(userData);
};

// Save completed topics
const saveCompletedTopics = (topics) => {
  try {
    localStorage.setItem(COMPLETED_TOPICS_KEY, JSON.stringify(topics));
    return true;
  } catch (error) {
    console.error('Error saving completed topics:', error);
    return false;
  }
};

// Get completed topics
const getCompletedTopics = () => {
  const topics = localStorage.getItem(COMPLETED_TOPICS_KEY);
  return safelyParseJSON(topics) || [];
};

// Save badges
const saveBadges = (badges) => {
  try {
    localStorage.setItem(BADGES_KEY, JSON.stringify(badges));
    return true;
  } catch (error) {
    console.error('Error saving badges:', error);
    return false;
  }
};

// Get badges
const getBadges = () => {
  const badges = localStorage.getItem(BADGES_KEY);
  return safelyParseJSON(badges) || [];
};

// Save simulation history
const saveSimulationHistory = (history) => {
  try {
    localStorage.setItem(SIMULATION_HISTORY_KEY, JSON.stringify(history));
    return true;
  } catch (error) {
    console.error('Error saving simulation history:', error);
    return false;
  }
};

// Get simulation history
const getSimulationHistory = () => {
  const history = localStorage.getItem(SIMULATION_HISTORY_KEY);
  return safelyParseJSON(history) || [];
};

// Clear all user data
const clearAllData = () => {
  try {
    localStorage.removeItem(USER_DATA_KEY);
    localStorage.removeItem(COMPLETED_TOPICS_KEY);
    localStorage.removeItem(BADGES_KEY);
    localStorage.removeItem(SIMULATION_HISTORY_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing user data:', error);
    return false;
  }
};

export const memoryService = {
  saveUserData,
  getUserData,
  saveCompletedTopics,
  getCompletedTopics,
  saveBadges,
  getBadges,
  saveSimulationHistory,
  getSimulationHistory,
  clearAllData
};
