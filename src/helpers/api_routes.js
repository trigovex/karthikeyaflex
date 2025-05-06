/**
 * API Routes and Helper Functions
 * This file contains API route constants and functions for making API requests
 */

import axios from 'axios';

// API Base URL
const API_BASE_URL = 'https://printing-sever.onrender.com';

// API Route Constants
const API_ROUTES = {
  CARD: {
    GET: '/card/get'
  },
  CATEGORY: {
    GET: '/category/get'
  },
  SUBCATEGORY: {
    GET: '/subcategory/get'
  },
  SEND_EMAIL: {
    POST: '/send_email'
  }
};

/**
 * Make a GET request to fetch data
 * @param {Object} params - Query parameters (category, subCategory, id)
 * @param {string} token - Authorization token (optional)
 * @returns {Promise} - Promise resolving to the API response
 */
export const getAll = async (params = { category: 'ALL', subCategory: 'ALL', id: '' }, token = '') => {
  try {
    // Default headers based on the curl command
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': token ? `Bearer ${token}` : 'Bearer',
      'origin': 'https://taupe-entremet-c68598.netlify.app',
      'referer': 'https://taupe-entremet-c68598.netlify.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };
    
    // Make the request with axios
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}${API_ROUTES.CARD.GET}`,
      params: params,
      headers: headers
    });
    
    // Return the data directly (axios already parses JSON)
    return response.data;
  } catch (error) {
    console.error('Error in getAll:', error);
    throw error;
  }
};

/**
 * Make a POST request to send data
 * @param {string} endpoint - The API endpoint to call
 * @param {Object} data - The data to send in the request body
 * @param {Object} params - Query parameters (optional)
 * @param {string} token - Authorization token (optional)
 * @returns {Promise} - Promise resolving to the API response
 */
export const post = async (endpoint, data = {}, params = {}, token = '') => {
  try {
    // Default headers based on the curl command
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'content-type': 'application/json',
      'authorization': token ? `Bearer ${token}` : 'Bearer',
      'origin': 'https://taupe-entremet-c68598.netlify.app',
      'referer': 'https://taupe-entremet-c68598.netlify.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };
    
    // Make the request with axios
    const response = await axios({
      method: 'POST',
      url: `${API_BASE_URL}${endpoint}`,
      params: params,
      headers: headers,
      data: data
    });
    
    // Return the data directly (axios already parses JSON)
    return response.data;
  } catch (error) {
    console.error('Error in post:', error);
    throw error;
  }
};

/**
 * Get all categories
 * @param {string} token - Authorization token (optional)
 * @returns {Promise} - Promise resolving to the API response with categories
 */
export const getCategories = async (token = '') => {
  try {
    // Default headers based on the curl command
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': token ? `Bearer ${token}` : 'Bearer',
      'origin': 'https://taupe-entremet-c68598.netlify.app',
      'referer': 'https://taupe-entremet-c68598.netlify.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };
    
    // Make the request with axios
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}${API_ROUTES.CATEGORY.GET}`,
      headers: headers
    });
    
    // Return the data directly (axios already parses JSON)
    return response.data;
  } catch (error) {
    console.error('Error in getCategories:', error);
    throw error;
  }
};

/**
 * Get all subcategories
 * @param {string} category - Category to filter subcategories (optional)
 * @param {string} token - Authorization token (optional)
 * @returns {Promise} - Promise resolving to the API response with subcategories
 */
export const getSubCategories = async (category = '', token = '') => {
  try {
    // Prepare params object if category is provided
    const params = category ? { Id: category } : {};
    
    // Default headers based on the curl command
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': token ? `Bearer ${token}` : 'Bearer',
      'origin': 'https://taupe-entremet-c68598.netlify.app',
      'referer': 'https://taupe-entremet-c68598.netlify.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };
    
    // Make the request with axios
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}${API_ROUTES.SUBCATEGORY.GET}`,
      params: params,
      headers: headers
    });
    
    // Return the data directly (axios already parses JSON)
    return response.data;
  } catch (error) {
    console.error('Error in getSubCategories:', error);
    throw error;
  }
};

/**
 * Get cards by subcategory
 * @param {string} subCategory - SubCategory name to filter cards
 * @param {string} token - Authorization token (optional)
 * @returns {Promise} - Promise resolving to the API response with cards
 */
export const getCardsBySubCategory = async (subCategory = '', category = '', token = '') => {
  try {
    // Prepare params object
    const params = { subCategory: subCategory,category: category };
    console.log("params", params);
    // Default headers based on the curl command
    const headers = {
      'accept': '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'authorization': token ? `Bearer ${token}` : 'Bearer',
      'origin': 'https://taupe-entremet-c68598.netlify.app',
      'referer': 'https://taupe-entremet-c68598.netlify.app/',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36'
    };
    
    // Make the request with axios
    const response = await axios({
      method: 'GET',
      url: `${API_BASE_URL}${API_ROUTES.CARD.GET}`,
      params: params,
      headers: headers
    });
    
    // Return the data directly (axios already parses JSON)
    return response.data;
  } catch (error) {
    console.error('Error in getCardsBySubCategory:', error);
    throw error;
  }
};

export const sendEmail = async (data = {}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${API_ROUTES.SEND_EMAIL.POST}`, data);
    return response.data;
  } catch (error) {
    console.error('Error in sendEmail:', error);
    throw error;
  }
};

// Export API routes constants and functions
export { API_ROUTES };
