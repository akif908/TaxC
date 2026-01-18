/**
 * Chatbot service
 * Handles chatbot conversations
 */
import api from './api';

const chatbotService = {
    /**
     * Send message to chatbot
     */
    async sendMessage(message, history = []) {
        const response = await api.post('/chatbot', {
            message,
            history,
            timestamp: new Date().toISOString(),
        });
        return response.data;
    },
};

export default chatbotService;
