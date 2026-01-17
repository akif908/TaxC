import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, User, UserCircle, Eye, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConsultantDashboard.css';

const AdminSessions = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadSessions();
    }, [filter]);

    const loadSessions = async () => {
        try {
            setLoading(true);
            const params = filter !== 'all' ? `?status=${filter}` : '';
            const response = await axios.get(`http://localhost:5000/api/consultant/admin/sessions${params}`, {
                withCredentials: true
            });
            setSessions(response.data.sessions);
        } catch (error) {
            console.error('Failed to load sessions:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <h1><MessageSquare size={28} /> Consultation Sessions ({sessions.length})</h1>
                <p>Monitor all consultation sessions and conversations</p>
            </header>

            <div className="requests-container bg-panel">
                <div className="table-controls">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({sessions.length})
                        </button>
                        <button
                            className={`tab-btn ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            Pending
                        </button>
                        <button
                            className={`tab-btn ${filter === 'accepted' ? 'active' : ''}`}
                            onClick={() => setFilter('accepted')}
                        >
                            Active
                        </button>
                        <button
                            className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            Completed
                        </button>
                    </div>
                </div>

                <div className="table-wrapper">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Consultant</th>
                                <th>Topic</th>
                                <th>Messages</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sessions.length === 0 ? (
                                <tr>
                                    <td colSpan="7" className="empty-cell">
                                        No sessions found
                                    </td>
                                </tr>
                            ) : (
                                sessions.map((session) => (
                                    <tr key={session.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-xs">
                                                    <User size={14} />
                                                </div>
                                                <div className="user-info-text">
                                                    <span className="user-name">{session.user_name}</span>
                                                    <span className="user-email-xs">{session.user_email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-xs consultant-avatar">
                                                    <UserCircle size={14} />
                                                </div>
                                                <div className="user-info-text">
                                                    <span className="user-name">{session.consultant_name}</span>
                                                    <span className="user-email-xs">{session.consultant_qualification}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="topic-cell">
                                                <span className="topic-main">{session.topic}</span>
                                            </div>
                                        </td>
                                        <td>
                                            <span className="message-count-badge">{session.message_count} msgs</span>
                                        </td>
                                        <td>{new Date(session.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge ${session.status}`}>{session.status}</span>
                                        </td>
                                        <td className="actions-cell">
                                            <button
                                                className="action-btn chat"
                                                onClick={() => navigate(`/admin/chat/${session.id}`)}
                                            >
                                                <Eye size={18} /> View Chat
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminSessions;
