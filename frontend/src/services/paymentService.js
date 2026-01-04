/**
 * Payment service
 * Handles payment processing and history
 */
import api from './api';

const paymentService = {
    /**
     * Process payment for a submission
     */
    async processPayment(submissionId, paymentMethod = 'online') {
        const response = await api.post('/payment/process', {
            submission_id: submissionId,
            payment_method: paymentMethod,
        });
        return response.data;
    },

    /**
     * Get payment history
     */
    async getPaymentHistory() {
        const response = await api.get('/payment/history');
        return response.data;
    },

    /**
     * Get specific payment
     */
    async getPayment(paymentId) {
        const response = await api.get(`/payment/${paymentId}`);
        return response.data;
    },

    /**
     * Download receipt PDF
     */
    downloadReceipt(paymentId) {
        window.open(`http://localhost:5000/api/receipt/${paymentId}`, '_blank');
    },
};

export default paymentService;
