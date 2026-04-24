import api from '../api/axiosConfig';

const clienteService = {
  async getAll(page = 0, size = 10) {
    try {
      const response = await api.get(`/clientes?page=${page}&size=${size}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message || 'Erro ao buscar clientes',
      };
    }
  },

  async getById(id) {
    try {
      const response = await api.get(`/clientes/${id}`);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao buscar cliente',
      };
    }
  },

  async create(clienteData) {
    try {
      const response = await api.post('/clientes', clienteData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao criar cliente',
      };
    }
  },

  async update(id, clienteData) {
    try {
      const response = await api.put(`/clientes/${id}`, clienteData);
      return {
        success: true,
        data: response.data,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao atualizar cliente',
      };
    }
  },

  async delete(id) {
    try {
      await api.delete(`/clientes/${id}`);
      return {
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          'Erro ao deletar cliente',
      };
    }
  },
};

export default clienteService;
