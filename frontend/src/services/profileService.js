/**
 * Profile service
 * Handles taxpayer profile CRUD operations
 */
import api from './api';

const profileService = {
    /**
     * Get user profile
     */
    async getProfile() {
        const response = await api.get('/profile');
        return response.data;
    },

    /**
     * Create profile
     */
    async createProfile(profileData) {
        const response = await api.post('/profile', profileData);
        return response.data;
    },

    /**
     * Update profile
     */
    async updateProfile(profileData) {
        const response = await api.put('/profile', profileData);
        return response.data;
    },

    /**
     * Delete profile
     */
    async deleteProfile() {
        const response = await api.delete('/profile');
        return response.data;
    },
};

export default profileService;
