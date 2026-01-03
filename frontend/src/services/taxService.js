/**
 * Tax service
 * Handles tax calculations and submissions
 */
import api from './api';

const taxService = {
    /**
     * Calculate tax for given income
     */
    async calculateTax(annualIncome) {
        const response = await api.post('/tax/calculate', { annual_income: annualIncome });
        return response.data;
    },

    /**
     * Submit tax form
     */
    async submitTaxForm(totalIncome, incomeDetails) {
        const response = await api.post('/tax/submit', {
            total_income: totalIncome,
            income_details: incomeDetails,
        });
        return response.data;
    },

    /**
     * Get user's tax submissions
     */
    async getSubmissions() {
        const response = await api.get('/tax/submissions');
        return response.data;
    },

    /**
     * Get specific submission
     */
    async getSubmission(submissionId) {
        const response = await api.get(`/tax/submissions/${submissionId}`);
        return response.data;
    },

    /**
     * Get tax slabs
     */
    async getTaxSlabs() {
        const response = await api.get('/tax/slabs');
        return response.data;
    },
};

export default taxService;
