import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, CheckCircle, XCircle, MessageSquare, UserCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConsultantDashboard.css';
import './ChatStyles.css';

const MyConsultations = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        loadRequests();

        // Poll for status updates every 5 seconds
        const interval = setInterval(() => {
            loadRequests();
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const loadRequests = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/consultant/user/requests', {
                withCredentials: true
            });
            setRequests(response.data.requests);
        } catch (error) {
            console.error('Failed to load requests:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredRequests = requests.filter(req =>
        filter === 'all' ? true : req.status === filter
    );

    const getStatusIcon = (status) => {
        switch (status) {
            case 'pending': return <Clock size={16} />;
            case 'accepted': return <CheckCircle size={16} />;
            case 'rejected': return <XCircle size={16} />;
            case 'completed': return <CheckCircle size={16} />;
            default: return <AlertCircle size={16} />;
        }
    };

    if (loading && requests.length === 0) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <h1>{t('dashboard.my_consultations')} 💬</h1>
                <p>{t('dashboard.consultations_subtitle')}</p>
            </header>

            <div className="requests-container bg-panel">
                <div className="table-controls">
                    <div className="tabs">
                        <button
                            className={`tab-btn ${filter === 'all' ? 'active' : ''}`}
                            onClick={() => setFilter('all')}
                        >
                            All ({requests.length})
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
                            Accepted
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
                                <th>Consultant</th>
                                <th>Topic</th>
                                <th>Date Requested</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredRequests.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="empty-cell">
                                        {filter === 'all'
                                            ? t('dashboard.no_consultations')
                                            : `No ${filter} consultations`}
                                    </td>
                                </tr>
                            ) : (
                                filteredRequests.map((req) => (
                                    <tr key={req.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-xs consultant-avatar">
                                                    <UserCircle size={14} />
                                                </div>
                                                <div className="user-info-text">
                                                    <span className="user-name">{req.consultant_name}</span>
                                                    <span className="user-email-xs">{req.consultant_qualification}</span>
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
                                            <span className={`status-badge ${req.status}`}>
                                                {getStatusIcon(req.status)}
                                                {req.status}
                                            </span>
                                        </td>
                                        <td className="actions-cell">
                                            {req.status === 'pending' && (
                                                <span className="pending-text">
                                                    <Clock size={16} /> Waiting for response...
                                                </span>
                                            )}
                                            {req.status === 'accepted' && (
                                                <button
                                                    className="action-btn chat"
                                                    onClick={() => navigate(`/user/consultation/${req.id}`)}
                                                >
                                                    <MessageSquare size={18} /> Open Chat
                                                </button>
                                            )}
                                            {req.status === 'rejected' && (
                                                <span className="rejected-text">
                                                    <XCircle size={16} /> Request declined
                                                </span>
                                            )}
                                            {req.status === 'completed' && (
                                                <span className="completed-text">Completed</span>
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

export default MyConsultations;
