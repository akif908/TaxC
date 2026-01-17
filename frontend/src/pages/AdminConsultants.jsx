import { useState, useEffect } from 'react';
import { Users, Award, Clock, CheckCircle, BarChart3 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import './ConsultantDashboard.css';

const AdminConsultants = () => {
    const { t } = useTranslation();
    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadConsultants();
    }, []);

    const loadConsultants = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/consultant/admin/consultants', {
                withCredentials: true
            });
            setConsultants(response.data.consultants);
        } catch (error) {
            console.error('Failed to load consultants:', error);
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
                <h1><Users size={28} /> All Consultants ({consultants.length})</h1>
                <p>Monitor and track all tax consultants in the system</p>
            </header>

            <div className="consultants-grid">
                {consultants.map((consultant) => (
                    <div key={consultant.id} className="consultant-card-premium">
                        <div className="card-top">
                            <div className="consultant-avatar-lg">
                                {consultant.full_name?.charAt(0) || 'C'}
                            </div>
                            <div className="consultant-badges">
                                {consultant.is_available ? (
                                    <span className="badge-available">Available</span>
                                ) : (
                                    <span className="badge-unavailable">Offline</span>
                                )}
                            </div>
                        </div>

                        <div className="card-body">
                            <h3>{consultant.full_name}</h3>
                            <p className="consultant-email">{consultant.email}</p>

                            <div className="qual-tags">
                                <span className="qual-tag">
                                    <Award size={12} /> {consultant.qualification}
                                </span>
                            </div>

                            <div className="consultant-stats-grid">
                                <div className="stat-mini">
                                    <BarChart3 size={16} />
                                    <div>
                                        <span className="stat-value">{consultant.total_sessions}</span>
                                        <span className="stat-label">Total Sessions</span>
                                    </div>
                                </div>
                                <div className="stat-mini">
                                    <Clock size={16} />
                                    <div>
                                        <span className="stat-value">{consultant.active_sessions}</span>
                                        <span className="stat-label">Active</span>
                                    </div>
                                </div>
                                <div className="stat-mini">
                                    <CheckCircle size={16} />
                                    <div>
                                        <span className="stat-value">{consultant.completed_sessions}</span>
                                        <span className="stat-label">Completed</span>
                                    </div>
                                </div>
                                <div className="stat-mini">
                                    <BarChart3 size={16} />
                                    <div>
                                        <span className="stat-value">{consultant.completion_rate.toFixed(1)}%</span>
                                        <span className="stat-label">Success Rate</span>
                                    </div>
                                </div>
                            </div>

                            {consultant.bio && (
                                <p className="consultant-bio-preview">{consultant.bio}</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminConsultants;
