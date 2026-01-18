import { useState, useEffect } from 'react';
import { Clock, CheckCircle, XCircle, User, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import consultantService from '../services/consultantService';
import './ConsultantDashboard.css';
import './ChatStyles.css';

const ConsultantRequests = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadRequests();
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const data = await consultantService.getRequests();
            setRequests(data.requests);
        } catch (error) {
            console.error('Failed to load requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (requestId, newStatus) => {
        try {
            await consultantService.updateRequestStatus(requestId, newStatus);
            // Update local state
            setRequests(requests.map(req =>
                req.id === requestId ? { ...req, status: newStatus } : req
            ));
        } catch (error) {
            alert('Failed to update status. Please try again.');
        }
    };

    const filteredRequests = requests.filter(req =>
        filter === 'all' ? true : req.status === filter
    );

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <h1>{t('consultant.requests.title')} 📬</h1>
                <p>{t('consultant.requests.subtitle')}</p>
            </header>

            <div className="requests-container bg-panel">
                <div className="table-controls">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            {t('consultant.requests.all')} ({requests.length})
                        </button>
                        <button
                            className={`tab-btn ${filter === 'pending' ? 'active' : ''}`}
                            onClick={() => setFilter('pending')}
                        >
                            {t('consultant.requests.pending')}
                        </button>
                        <button
                            className={`tab-btn ${filter === 'accepted' ? 'active' : ''}`}
                            onClick={() => setFilter('accepted')}
                        >
                            {t('consultant.requests.accepted')}
                        </button>
                        <button
                            className={`tab-btn ${filter === 'completed' ? 'active' : ''}`}
                            onClick={() => setFilter('completed')}
                        >
                            {t('consultant.requests.history')}
                        </button>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>{t('consultant.requests.applicant')}</th>
                                <th>{t('consultant.requests.subject')}</th>
                                <th>{t('consultant.requests.date_requested')}</th>
                                <th>{t('consultant.requests.status')}</th>
                                <th>{t('consultant.requests.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="empty-cell">
                                        {t('consultant.requests.no_requests')}
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-xs">
                                                    {req.user_name ? req.user_name.charAt(0) : <User size={14} />}
                                                </div>
                                                <div className="user-info-text">
                                                    <span className="user-name">{req.user_name || t('consultant.requests.taxpayer')}</span>
                                                    <span className="user-email-xs">{req.user_email}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="topic-cell">
                                                <span className="topic-main">{req.topic}</span>
                                                <p className="topic-preview">{req.message?.substring(0, 40)}...</p>
                                            </div>
                                        </td>
                                        <td>{new Date(req.created_at).toLocaleDateString()}</td>
                                        <td>
                                            <span className={`status-badge ${req.status}`}>{req.status}</span>
                                        </td>
                                        <td className="actions-cell">
                                            {req.status === 'pending' && (
                                                <div className="action-group">
                                                    <button
                                                        className="action-btn accept"
                                                        onClick={() => handleStatusUpdate(req.id, 'accepted')}
                                                        title={t('consultant.requests.accept')}
                                                    >
                                                        <CheckCircle size={18} />
                                                    </button>
                                                    <button
                                                        className="action-btn reject"
                                                        onClick={() => handleStatusUpdate(req.id, 'rejected')}
                                                        title={t('consultant.requests.reject')}
                                                    >
                                                        <XCircle size={18} />
                                                    </button>
                                                </div>
                                            )}
                                            {req.status === 'accepted' && (
                                                <div className="action-group">
                                                    <button
                                                        className="action-btn chat"
                                                        onClick={() => navigate(`/consultant/chat/${req.id}`)}
                                                    >
                                                        <MessageSquare size={18} /> Open Chat
                                                    </button>
                                                    <button
                                                        className="action-btn complete"
                                                        onClick={() => handleStatusUpdate(req.id, 'completed')}
                                                    >
                                                        {t('consultant.requests.complete_session')}
                                                    </button>
                                                </div>
                                            )}
                                            {req.status === 'completed' && (
                                                <span className="completed-text">{t('consultant.requests.archived')}</span>
                                            )}
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

export default ConsultantRequests;
