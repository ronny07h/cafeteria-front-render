import api from "./api";

export const newsService = {
  // Obtener todas las noticias
  getAllNews: async () => {
    try {
      const response = await api.get("/news");
      return response.data;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  // Obtener noticia por ID
  getNewsById: async (id) => {
    try {
      const response = await api.get(`/news/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching news by ID:", error);
      throw error;
    }
  },

  // Crear noticia
  createNews: async (newsData) => {
    try {
      const response = await api.post("/news", newsData);
      return response.data;
    } catch (error) {
      console.error("Error creating news:", error);
      throw error;
    }
  },

  // Actualizar noticia
  updateNews: async (id, newsData) => {
    try {
      const response = await api.put(`/news/${id}`, newsData);
      return response.data;
    } catch (error) {
      console.error("Error updating news:", error);
      throw error;
    }
  },

  // Eliminar noticia
  deleteNews: async (id) => {
    try {
      await api.delete(`/news/${id}`);
    } catch (error) {
      console.error("Error deleting news:", error);
      throw error;
    }
  },
};
