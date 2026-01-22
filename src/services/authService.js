import axios from 'axios';

const API_BASE_URL = 'http://localhost:9090/api';

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });
            
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
            }
            
            return response.data;
        } catch (error) {
            throw error.response?.data?.message || 'Login failed';
        }
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    },

    getToken: () => {
        return localStorage.getItem('token');
    },

    getUsername: () => {
        return localStorage.getItem('username');
    },

    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    }
};

export default authService;
