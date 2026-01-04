/**
 * Admin service
 * Handles admin-specific operations
 */
import api from './api';

const adminService = {
    /**
     * Get dashboard statistics
     */
    async getDashboardStats() {
        const response = await api.get('/admin/dashboard');
        return response.data;
    },

    /**
     * Get all users
     */
    async getAllUsers(role = null, isActive = null) {
        const params = {};
        if (role) params.role = role;
        if (isActive !== null) params.is_active = isActive;

        const response = await api.get('/admin/users', { params });
        return response.data;
    },

    /**
     * Activate/deactivate user
     */
    async toggleUserActivation(userId, isActive) {
        const response = await api.put(`/admin/users/${userId}/activate`, { is_active: isActive });
        return response.data;
    },

    /**
     * Change user role
     */
    async changeUserRole(userId, role) {
        const response = await api.put(`/admin/users/${userId}/role`, { role });
        return response.data;
    },

    /**
     * Reset user password
     */
    async resetUserPassword(userId, newPassword) {
        const response = await api.post(`/admin/users/${userId}/reset-password`, { new_password: newPassword });
        return response.data;
    },

    /**
     * Get all payments
     */
    async getAllPayments() {
        const response = await api.get('/admin/payments');
        return response.data;
    },

    /**
     * Get tax slabs
     */
    async getTaxSlabs() {
        const response = await api.get('/admin/slabs');
        return response.data;
    },

    /**
     * Create tax slab
     */
    async createTaxSlab(slabData) {
        const response = await api.post('/admin/slabs', slabData);
        return response.data;
    },

    /**
     * Update tax slab
     */
    async updateTaxSlab(slabId, slabData) {
        const response = await api.put(`/admin/slabs/${slabId}`, slabData);
        return response.data;
    },

    /**
     * Delete tax slab
     */
    async deleteTaxSlab(slabId) {
        const response = await api.delete(`/admin/slabs/${slabId}`);
        return response.data;
    },
};

export default adminService;
