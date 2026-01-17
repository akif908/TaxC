import { useState, useEffect } from 'react';
import { MessageSquare, Clock, CheckCircle, TrendingUp, User, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import consultantService from '../services/consultantService';
import './ConsultantDashboard.css';

const ConsultantDashboard = () => {
    const { t } = useTranslation();
    const [stats, setStats] = useState(null);
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [statsData, requestsData] = await Promise.all([
                    consultantService.getDashboardStats(),
                    consultantService.getRequests()
                ]);
                setStats(statsData.stats);
                setRequests(requestsData.requests.slice(0, 5)); // Just the first few
            } catch (error) {
                console.error('Failed to fetch consultant data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>{t('consultant.dashboard.title')} 🧑‍💼</h1>
                    <p>{t('consultant.dashboard.subtitle')}</p>
                </div>
            </header>

            <div className="stats-container">
                <div className="stat-card pending">
                    <div className="stat-icon-wrapper">
                        <Clock className="stat-icon" />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">{t('consultant.dashboard.pending_requests')}</span>
                        <h2 className="stat-value">{stats?.pending_requests || 0}</h2>
                    </div>
                </div>

                <div className="stat-card active">
                    <div className="stat-icon-wrapper">
                        <MessageSquare className="stat-icon" />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">{t('consultant.dashboard.active_chats')}</span>
                        <h2 className="stat-value">{stats?.active_consultations || 0}</h2>
                    </div>
                </div>

                <div className="stat-card completed">
                    <div className="stat-icon-wrapper">
                        <CheckCircle className="stat-icon" />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">{t('consultant.dashboard.completed')}</span>
                        <h2 className="stat-value">{stats?.completed_consultations || 0}</h2>
                    </div>
                </div>

                <div className="stat-card performance">
                    <div className="stat-icon-wrapper">
                        <TrendingUp className="stat-icon" />
                    </div>
                    <div className="stat-details">
                        <span className="stat-label">{t('consultant.dashboard.total_activity')}</span>
                        <h2 className="stat-value">{stats?.total_activity || 0}</h2>
                    </div>
                </div>
            </div>

            <div className="dashboard-main-grid">
                <section className="recent-requests-section">
                    <div className="section-header">
                        <h2>{t('consultant.dashboard.recent_requests')}</h2>
                        <button className="view-all-btn">{t('consultant.dashboard.view_all')} <ArrowRight size={16} /></button>
                    </div>

                    {requests.length === 0 ? (
                        <div className="empty-requests">
                            <Clock size={40} className="empty-icon" />
                            <p>{t('consultant.dashboard.no_requests')}</p>
                            <span>{t('consultant.dashboard.no_requests_desc')}</span>
                        </div>
                    ) : (
                        <div className="requests-list">
                            {requests.map((req) => (
                                <div key={req.id} className="request-item">
                                    <div className="request-user-info">
                                        <div className="user-avatar">
                                            {req.user_name ? req.user_name.charAt(0) : <User size={18} />}
                                        </div>
                                        <div className="user-text">
                                            <span className="user-name">{req.user_name || req.user_email}</span>
                                            <span className="request-topic">{req.topic}</span>
                                        </div>
                                    </div>
                                    <div className="request-meta">
                                        <span className={`status-badge ${req.status}`}>{req.status}</span>
                                        <span className="request-date">{new Date(req.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <button className="action-btn-circle">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                <aside className="dashboard-sidebar">
                    <div className="sidebar-card profile-preview">
                        <h3>{t('consultant.dashboard.your_profile')}</h3>
                        <div className="profile-status">
                            <div className="status-indicator online"></div>
                            <span>{t('consultant.dashboard.online_available')}</span>
                        </div>
                        <button className="edit-profile-btn">{t('consultant.dashboard.edit_profile')}</button>
                    </div>

                    <div className="sidebar-card help-card">
                        <div className="help-icon">💡</div>
                        <h4>{t('consultant.dashboard.quick_support')}</h4>
                        <p>{t('consultant.dashboard.support_desc')}</p>
                        <button className="secondary-btn">{t('consultant.dashboard.open_resources')}</button>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ConsultantDashboard;
