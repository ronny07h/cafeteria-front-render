import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:9090/api';

const authService = {
    login: async (username, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, {
                username,
                password
            });
            
            console.log('Login API Response:', response.data);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('username', response.data.username);
                console.log('Token saved to localStorage:', response.data.token);
            } else {
                console.warn('No token found in response.data!', response.data);
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
