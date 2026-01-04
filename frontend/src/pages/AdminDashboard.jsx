import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminService from '../services/adminService';
import { Users, Shield, CreditCard, FileText, Activity } from 'lucide-react';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [recentPayments, setRecentPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadDashboardData();
    }, []);

    const loadDashboardData = async () => {
        try {
            const data = await adminService.getDashboardStats();
            setStats(data.stats);
            setRecentPayments(data.recent_payments || []);
        } catch (error) {
            console.error('Failed to load admin stats:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner">Loading admin dashboard...</div>;
    }

    return (
        <div className="admin-dashboard-container">
            <div className="page-header">
                <h1>Admin Overview 🛡️</h1>
                <p>System statistics and recent activity monitoring.</p>
            </div>

            {/* Stats Grid */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon bg-blue">
                        <Users size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Total Users</h3>
                        <p className="stat-value">{stats?.total_users || 0}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-purple">
                        <Shield size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Admins</h3>
                        <p className="stat-value">{stats?.total_admins || 0}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-green">
                        <CreditCard size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Total Payments</h3>
                        <p className="stat-value">{stats?.total_payments || 0}</p>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon bg-orange">
                        <FileText size={24} />
                    </div>
                    <div className="stat-info">
                        <h3>Pending Returns</h3>
                        <p className="stat-value">{stats?.pending_submissions || 0}</p>
                    </div>
                </div>
            </div>

            <div className="dashboard-content-grid">
                {/* Recent Payments Table */}
                <div className="content-card full-width">
                    <div className="card-header-flex">
                        <h2><Activity size={20} /> Recent Payments</h2>
                        <Link to="/admin/payments" className="link-text">View All</Link>
                    </div>

                    {recentPayments.length === 0 ? (
                        <div className="empty-state">
                            <p>No recent payments found.</p>
                        </div>
                    ) : (
                        <div className="table-responsive">
                            <table className="modern-table">
                                <thead>
                                    <tr>
                                        <th>User Email</th>
                                        <th>Transaction ID</th>
                                        <th>Amount</th>
                                        <th>Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentPayments.map(payment => (
                                        <tr key={payment.id}>
                                            <td>
                                                <div className="user-cell">
                                                    <div className="avatar-xs">
                                                        {payment.user_email?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <span>{payment.user_email}</span>
                                                </div>
                                            </td>
                                            <td className="font-mono">{payment.transaction_id}</td>
                                            <td className="font-bold">৳{payment.amount?.toLocaleString()}</td>
                                            <td>{new Date(payment.paid_at).toLocaleDateString()}</td>
                                            <td>
                                                <span className="status-badge success">Completed</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
