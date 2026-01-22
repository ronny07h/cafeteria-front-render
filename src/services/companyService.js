import api from './api';

export const companyService = {
  getCompanyConfig: async () => {
    const response = await api.get('/config');
    return response.data;
  },

  updateCompanyConfig: async (configData) => {
    const response = await api.put('/config', configData);
    return response.data;
  },
};
