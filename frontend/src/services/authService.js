/**
 * Authentication service
 * Handles user registration, login, logout, and current user management
 */
import api from './api';

const authService = {
    /**
     * Register a new user
     */
    async register(email, password) {
        const response = await api.post('/auth/register', { email, password });
        return response.data;
    },

    /**
     * Login user
     */
    async login(email, password) {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    },

    /**
     * Logout current user
     */
    async logout() {
        const response = await api.post('/auth/logout');
        return response.data;
    },

    /**
     * Get current logged in user
     */
    async getCurrentUser() {
        const response = await api.get('/auth/me');
        return response.data;
    },
};

export default authService;
