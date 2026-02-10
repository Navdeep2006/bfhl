import dotenv from 'dotenv';
dotenv.config();

import { askAI } from './src/services/ai.js';

(async () => {
  try {
    const res = await askAI('Color of the sky');
    console.log('AI replied:', res);
  } catch (err) {
    console.error('Test error:', err.message);
    if (err.response?.data) console.error('Response data:', err.response.data);
  }
})();
