import api from './api';

export const reservationService = {
  getAllReservations: async () => {
    const response = await api.get('/reservations');
    return response.data;
  },

  createReservation: async (reservationData) => {
    const response = await api.post('/reservations', reservationData);
    return response.data;
  },

  deleteReservation: async (id) => {
    const response = await api.delete(`/reservations/${id}`);
    return response.data;
  },
};
