import api from '../api/axiosConfig';

const authService = {
  async login(email, senha) {
    try {
      const response = await api.post('/auth/login', { email, senha });
      const { accessToken, refreshToken, usuario } = response.data;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', refreshToken);
      localStorage.setItem('user', JSON.stringify(usuario));

      return {
        success: true,
        data: { usuario, accessToken, refreshToken },
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao fazer login',
      };
    }
  },

  async register(nome, email, senha) {
    try {
      const response = await api.post('/auth/register', {
        nome,
        email,
        senha,
      });

      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao registrar usuário',
      };
    }
  },

  async refreshToken(refreshToken) {
    try {
      const response = await api.post('/auth/refresh', {
        refreshToken,
      });

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      localStorage.setItem('access_token', accessToken);
      localStorage.setItem('refresh_token', newRefreshToken);

      return {
        success: true,
        data: { accessToken, refreshToken: newRefreshToken },
      };
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Erro ao renovar token',
      };
    }
  },

  async logout() {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    } finally {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('user');
    }
  },

  isAuthenticated() {
    return !!localStorage.getItem('access_token');
  },

  getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
};

export default authService;
