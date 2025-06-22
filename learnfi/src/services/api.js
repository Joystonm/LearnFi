// This file provides a simple API implementation without using axios

// Simple fetch wrapper
const fetchWithTimeout = async (url, options = {}, timeout = 10000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  const response = await fetch(url, {
    ...options,
    signal: controller.signal
  });
  
  clearTimeout(id);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  
  return response.json();
};

// Create a simple API client
const createApiClient = (baseUrl, headers = {}) => {
  return {
    get: async (endpoint, params = {}) => {
      const url = new URL(`${baseUrl}${endpoint}`);
      Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
      
      return fetchWithTimeout(url.toString(), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        }
      });
    },
    
    post: async (endpoint, data = {}) => {
      return fetchWithTimeout(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(data)
      });
    }
  };
};

export { createApiClient };
