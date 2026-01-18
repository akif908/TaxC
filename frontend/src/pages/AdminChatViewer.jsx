import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, User, UserCircle, Eye, Calendar, MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConsultantDashboard.css';
import './ChatStyles.css';

const AdminChatViewer = () => {
    const { t } = useTranslation();
    const { id } = useParams();
    const navigate = useNavigate();

    const [session, setSession] = useState(null);
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadChatData();
    }, [id]);

    const loadChatData = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`http://localhost:5000/api/consultant/admin/chat/${id}`, {
                withCredentials: true
            });
            setSession(response.data.session);
            setMessages(response.data.messages);
        } catch (error) {
            console.error('Failed to load chat:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    if (!session) {
        return <div className="consultant-dashboard">
            <div className="error-message">Session not found</div>
        </div>;
    }

    return (
        <div className="consultant-dashboard">
            <div className="chat-container">
                <div className="chat-header">
                    <button className="back-btn-icon" onClick={() => navigate('/admin/sessions')}>
                        <ArrowLeft size={20} />
                    </button>
                    <div className="chat-header-info">
                        <div className="session-participants">
                            <div className="participant">
                                <User size={18} />
                                <span><strong>User:</strong> {session.user_name}</span>
                            </div>
                            <div className="participant">
                                <UserCircle size={18} />
                                <span><strong>Consultant:</strong> {session.consultant_name}</span>
                            </div>
                        </div>
                        <div className="session-meta">
                            <span><strong>Topic:</strong> {session.topic}</span>
                        </div>
                    </div>
                    <div className="chat-status-badge">
                        <Eye size={16} />
                        Admin View (Read-Only)
                    </div>
                </div>

                <div className="admin-session-info">
                    <div className="info-item">
                        <Calendar size={16} />
                        <span>Started: {new Date(session.created_at).toLocaleString()}</span>
                    </div>
                    <div className="info-item">
                        <MessageSquare size={16} />
                        <span>{messages.length} Messages</span>
                    </div>
                    <div className="info-item">
                        <span className={`status-badge ${session.status}`}>{session.status}</span>
                    </div>
                </div>

                <div className="chat-messages">
                    {messages.length === 0 ? (
                        <div className="no-messages">
                            <p>No messages in this consultation yet</p>
                        </div>
                    ) : (
                        messages.map((msg) => (
                            <div key={msg.id} className="admin-message-item">
                                <div className="message-header">
                                    <span className="sender-name">
                                        {msg.sender_id === session.user_id ? (
                                            <><User size={14} /> {session.user_name}</>
                                        ) : (
                                            <><UserCircle size={14} /> {session.consultant_name}</>
                                        )}
                                    </span>
                                    <span className="message-time">
                                        {new Date(msg.timestamp).toLocaleString()}
                                    </span>
                                </div>
                                <div className="message-content-admin">
                                    {msg.message}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <div className="admin-chat-footer">
                    <p>📌 This is a read-only view for administrative purposes</p>
                </div>
            </div>
        </div>
    );
};

export default AdminChatViewer;
