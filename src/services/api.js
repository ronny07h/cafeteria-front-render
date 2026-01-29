import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:9090/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Note: To avoid circular dependency or complex prop drilling, 
// we will start with simple console logs here, but arguably 
// the interceptor should trigger an event that the Context listens to.
// However, a simpler approach for now without major refactor is to dispatch a custom event.

export const eventBus = {
  on(event, callback) {
    document.addEventListener(event, (e) => callback(e.detail));
  },
  dispatch(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event, callback) {
    document.removeEventListener(event, callback);
  },
};

// Request interceptor to add JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    // Show success message for non-GET requests if desired
    if (['post', 'put', 'delete'].includes(response.config.method)) {
        let message = 'Operación realizada con éxito.';
        if (response.config.method === 'post') message = 'Guardado exitosamente.';
        if (response.config.method === 'put') message = 'Actualizado exitosamente.';
        if (response.config.method === 'delete') message = 'Eliminado exitosamente.';
        
        eventBus.dispatch('api:success', message);
    }
    return response;
  },
  (error) => {
    // Dispatch error event
    let message = 'Ocurrió un error inesperado.';
    if (error.response) { // Server responded
        if (error.response.data && typeof error.response.data === 'object') {
             // Handle Validation Errors map
             const data = error.response.data;
             if (Object.keys(data).length > 0 && !data.error && !data.message) {
                 // Assume it's a map of field->error
                 message = Object.values(data).join(', ');
             } else {
                 message = data.message || data.error || message;
             }
        }
    } else if (error.request) { // No response
        message = 'No hay respuesta del servidor. Compruebe su conexión.';
    }
    
    eventBus.dispatch('api:error', message);
    return Promise.reject(error);
  }
);

export default api;
