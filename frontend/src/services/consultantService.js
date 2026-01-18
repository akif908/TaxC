import axios from 'axios';

const API_URL = 'http://localhost:5000/api/consultant';

const consultantService = {
    getDashboardStats: async () => {
        const response = await axios.get(`${API_URL}/dashboard`, { withCredentials: true });
        return response.data;
    },

    getRequests: async () => {
        const response = await axios.get(`${API_URL}/requests`, { withCredentials: true });
        return response.data;
    },

    updateRequestStatus: async (requestId, status) => {
        const response = await axios.put(`${API_URL}/requests/${requestId}`, { status }, { withCredentials: true });
        return response.data;
    },

    getChatMessages: async (consultationId) => {
        const response = await axios.get(`${API_URL}/chat/${consultationId}`, { withCredentials: true });
        return response.data;
    },

    sendMessage: async (consultationId, message) => {
        const response = await axios.post(`${API_URL}/chat/${consultationId}`, { message }, { withCredentials: true });
        return response.data;
    },

    getProfile: async () => {
        const response = await axios.get(`${API_URL}/profile`, { withCredentials: true });
        return response.data;
    },

    updateProfile: async (profileData) => {
        const response = await axios.put(`${API_URL}/profile`, profileData, { withCredentials: true });
        return response.data;
    },

    listConsultants: async () => {
        const response = await axios.get(`${API_URL}/list`, { withCredentials: true });
        return response.data;
    },

    requestConsultation: async (requestData) => {
        const response = await axios.post(`${API_URL}/request`, requestData, { withCredentials: true });
        return response.data;
    }
};

export default consultantService;
