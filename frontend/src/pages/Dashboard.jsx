import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import api from '../services/api';
import DeadlinePopup from '../components/DeadlinePopup';
import { useTranslation } from 'react-i18next';
import { toBanglaNumber } from '../utils/bnUtils';
import './Dashboard.css';

const Dashboard = ({ user }) => {
    const { t, i18n } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [submissions, setSubmissions] = useState([]);
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const isBn = i18n.language === 'bn';
    const formatNumber = (num) => {
        const n = parseFloat(num).toLocaleString();
        return isBn ? toBanglaNumber(n) : n;
    };
    const formatInt = (num) => {
        const n = Number(num).toLocaleString();
        return isBn ? toBanglaNumber(n) : n;
    };
    const formatDate = (dateString) => {
        const d = new Date(dateString).toLocaleDateString();
        return isBn ? toBanglaNumber(d) : d;
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user?.role === 'admin') {
                    // Handled by Navigate below
                } else {
                    const [profileRes, submissionsRes, paymentsRes] = await Promise.all([
                        api.get('/profile').catch(() => ({ data: { profile: null } })),
                        api.get('/tax/submissions').catch(() => ({ data: { submissions: [] } })),
                        api.get('/payment/history').catch(() => ({ data: { payments: [] } }))
                    ]);

                    setProfile(profileRes.data.profile);
                    setSubmissions(submissionsRes.data.submissions || []);
                    setPayments(paymentsRes.data.payments || []);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user]);

    if (loading) {
        return <div className="dashboard-container"><div className="loader">{t('common.loading')}</div></div>;
    }

    if (user?.role === 'admin') {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const totalTaxPaid = payments.reduce((sum, p) => sum + p.amount, 0);
    const lastSubmission = submissions.length > 0 ? submissions[submissions.length - 1] : null;

    return (
        <div className="dashboard-container">
            <DeadlinePopup />
            <header className="dashboard-header">
                <div className="welcome-section">
                    <h1>{t('dashboard.hello')}, {profile?.name || user.email.split('@')[0]}!</h1>
                    <p>{t('dashboard.welcome_message')}</p>
                </div>
                {!profile && (
                    <Link to="/profile" className="btn btn-primary">
                        {t('dashboard.complete_profile')}
                    </Link>
                )}
            </header>

            <div className="stats-grid">
                <div className="stat-card">
                    <h3>{t('dashboard.total_paid')}</h3>
                    <p className="value">৳{formatNumber(totalTaxPaid)}</p>
                </div>
                <div className="stat-card">
                    <h3>{t('dashboard.tax_returns')}</h3>
                    <p className="value">{formatInt(submissions.length)}</p>
                </div>
                <div className="stat-card">
                    <h3>{t('dashboard.annual_income')}</h3>
                    <p className="value">
                        {profile?.annual_income ? `৳${formatNumber(profile.annual_income)}` : t('dashboard.not_set')}
                    </p>
                </div>
                <div className="stat-card">
                    <h3>{t('dashboard.last_filing')}</h3>
                    <p className="value">
                        {lastSubmission ? formatDate(lastSubmission.submitted_at) : '—'}
                    </p>
                </div>
            </div>

            <div className="content-grid">
                <div className="data-card">
                    <div className="card-header">
                        <h2>{t('dashboard.recent_filings')}</h2>
                        <Link to="/tax-form" className="btn btn-primary btn-sm">{t('dashboard.new_filing')}</Link>
                    </div>
                    {submissions.length === 0 ? (
                        <p className="empty-state">{t('dashboard.no_returns')}</p>
                    ) : (
                        <div className="table-responsive">
                            <table className="custom-table">
                                <thead>
                                    <tr>
                                        <th>{t('dashboard.date')}</th>
                                        <th>{t('dashboard.amount')}</th>
                                        <th>{t('dashboard.status')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {submissions.slice(0, 5).map(sub => (
                                        <tr key={sub.id}>
                                            <td>{formatDate(sub.submitted_at)}</td>
                                            <td>৳{formatNumber(sub.tax_amount)}</td>
                                            <td>
                                                <span className={`status-pill status-${sub.status?.toLowerCase() || 'pending'}`}>
                                                    {sub.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

                <div className="data-card">
                    <div className="card-header">
                        <h2>{t('dashboard.payment_history')}</h2>
                        <Link to="/payment" className="view-all">{t('dashboard.view_all')}</Link>
                    </div>
                    {payments.length === 0 ? (
                        <p className="empty-state">{t('dashboard.no_payments')}</p>
                    ) : (
                        <ul className="activity-list">
                            {payments.slice(0, 5).map(payment => (
                                <li key={payment.id} className="activity-item">
                                    <div className="activity-info">
                                        <span>{formatDate(payment.paid_at)}</span>
                                        <strong>{t('dashboard.tax_payment')}</strong>
                                    </div>
                                    <div className="activity-amount">-৳{formatNumber(payment.amount)}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
