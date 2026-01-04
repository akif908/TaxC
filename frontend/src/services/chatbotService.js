/**
 * Chatbot service
 * Handles chatbot conversations
 */
import api from './api';

const chatbotService = {
    /**
     * Send message to chatbot
     */
    async sendMessage(message) {
        const response = await api.post('/chatbot', {
            message,
            timestamp: new Date().toISOString(),
        });
        return response.data;
    },
};

export default chatbotService;
