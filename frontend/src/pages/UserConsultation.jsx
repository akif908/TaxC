import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Send, ArrowLeft, UserCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConsultantDashboard.css';
import './ChatStyles.css';

const UserConsultation = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();
    const messagesEndRef = useRef(null);

    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [sending, setSending] = useState(false);
    const [consultation, setConsultation] = useState(null);
    const [currentUserId, setCurrentUserId] = useState(null);

    useEffect(() => {
        fetchConsultation();
        fetchMessages();

        // Poll for new messages every 3 seconds
        const interval = setInterval(() => {
            fetchMessages();
        }, 3000);

        return () => clearInterval(interval);
    }, [id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const fetchConsultation = async () => {
        try {
            // Fetch user's consultation requests
            const response = await axios.get('http://localhost:5000/api/consultant/user/requests', {
                withCredentials: true
            });
            const currentConsultation = response.data.requests.find(r => r.id === parseInt(id));
            setConsultation(currentConsultation);

            // Get current user ID
            const userResponse = await axios.get('http://localhost:5000/api/auth/me', {
                withCredentials: true
            });
            setCurrentUserId(userResponse.data.user.id);
        } catch (error) {
            console.error('Failed to fetch consultation:', error);
        }
    };

    const fetchMessages = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/consultant/chat/${id}`, {
                withCredentials: true
            });
            setMessages(response.data.messages);
            setLoading(false);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            setLoading(false);
        }
    };

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || sending) return;

        setSending(true);
        try {
            await axios.post(`http://localhost:5000/api/consultant/chat/${id}`,
                { message: newMessage },
                { withCredentials: true }
            );
            setNewMessage('');
            await fetchMessages();
        } catch (error) {
            console.error('Failed to send message:', error);
            alert(t('consultant.chat.send_error'));
        } finally {
            setSending(false);
        }
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <div className="chat-container">
                <div className="chat-header">
                    <button className="back-btn-icon" onClick={() => navigate('/dashboard')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="chat-header-info">
                        <div className="user-avatar-chat consultant-avatar">
                            <UserCircle size={24} />
                        </div>
                        <div>
                            <h2>{consultation?.consultant_name || 'Consultant'}</h2>
                            <p className="chat-subtitle">
                                <strong>{t('consultant.chat.topic')}:</strong> {consultation?.topic}
                            </p>
                        </div>
                    </div>
                    <div className="chat-status-badge">
                        <CheckCircle size={16} />
                        {consultation?.status}
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="no-messages">
                            <p>{t('consultant.chat.no_messages')}</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`message-bubble ${msg.sender_id === currentUserId ? 'sent' : 'received'}`}
                            >
                                <div className="message-content">{msg.message}</div>
                                <div className="message-time">
                                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={messagesEndRef} />
                </div>

                <form className="chat-input-form" onSubmit={handleSendMessage}>
                    <input
                        type="text"
                        placeholder={t('consultant.chat.type_message')}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        className="chat-input"
                        disabled={sending}
                    />
                    <button type="submit" className="send-btn" disabled={sending || !newMessage.trim()}>
                        <Send size={20} />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default UserConsultation;
