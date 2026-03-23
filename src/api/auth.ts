import axios from 'axios';
import { z } from 'zod';

const TokenSchema = z.object({
  access_token: z.string(),
  token_type: z.literal('Bearer'),
  expires_in: z.number(),
});

export const authService = {
  async requestUserCode() {
    const response = await axios.post('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/userCode', {
      client_id: import.meta.env.VITE_IFOOD_CLIENT_ID,
      scope: 'merchant',
    });
    return response.data;
  },

  async exchangeToken(userCode: string) {
    const response = await axios.post('https://merchant-api.ifood.com.br/authentication/v1.0/oauth/token', {
      grant_type: 'authorization_code',
      code: userCode,
      client_id: import.meta.env.VITE_IFOOD_CLIENT_ID,
      client_secret: import.meta.env.VITE_IFOOD_CLIENT_SECRET,
    }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } });
    const token = TokenSchema.parse(response.data);
    localStorage.setItem('token', token.access_token);
    return token;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  logout() {
    localStorage.removeItem('token');
  },
};
