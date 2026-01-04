import { useEffect, useState } from 'react';
import axios from 'axios';
import { MessageSquare, User, Calendar, Filter, Edit2, CheckCircle, X } from 'lucide-react';
import './AdminDashboard.css';

const AdminFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [adminNotes, setAdminNotes] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');

    useEffect(() => {
        loadFeedback();
    }, [statusFilter]);

    const loadFeedback = async () => {
        try {
            setLoading(true);
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            const url = statusFilter ? `${apiUrl}/feedback?status=${statusFilter}` : `${apiUrl}/feedback`;
            const res = await axios.get(url, { withCredentials: true });
            setFeedbacks(res.data.feedbacks || []);
        } catch (err) {
            console.error('Failed to load feedback:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (feedbackId) => {
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.patch(`${apiUrl}/feedback/${feedbackId}`, {
                status: selectedStatus,
                admin_notes: adminNotes
            }, { withCredentials: true });

            setEditingId(null);
            setAdminNotes('');
            setSelectedStatus('');
            loadFeedback();
        } catch (err) {
            console.error('Failed to update feedback:', err);
            alert('Failed to update feedback');
        }
    };

    const startEditing = (feedback) => {
        setEditingId(feedback.id);
        setAdminNotes(feedback.admin_notes || '');
        setSelectedStatus(feedback.status);
    };

    const getStatusBadgeClass = (status) => {
        const classes = {
            pending: 'status-badge pending',
            reviewed: 'status-badge reviewed',
            resolved: 'status-badge completed'
        };
        return classes[status] || 'status-badge';
    };

    return (
        <div className="admin-container">
            <div className="page-header">
                <h1><MessageSquare size={24} /> User Feedback</h1>
                <p>Review and manage user feedback submissions</p>
            </div>

            <div className="content-card">
                <div className="card-header-flex">
                    <div className="header-title">
                        <Filter size={18} />
                        <h4>Filter by Status</h4>
                    </div>
                    <select
                        className="modern-input"
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        style={{ width: '200px' }}
                    >
                        <option value="">All Feedback</option>
                        <option value="pending">Pending</option>
                        <option value="reviewed">Reviewed</option>
                        <option value="resolved">Resolved</option>
                    </select>
                </div>

                {loading ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        Loading feedback...
                    </div>
                ) : feedbacks.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                        No feedback found
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>User</th>
                                    <th>Subject</th>
                                    <th>Message</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {feedbacks.map(feedback => (
                                    <tr key={feedback.id}>
                                        <td>
                                            <div className="user-cell">
                                                <div className="avatar-xs">
                                                    {feedback.user_name?.charAt(0).toUpperCase() || feedback.user_email?.charAt(0).toUpperCase()}
                                                </div>
                                                <div className="user-info">
                                                    <div className="user-email">{feedback.user_name}</div>
                                                    <div className="user-id">{feedback.user_email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td><span style={{ color: 'white', fontWeight: '600' }}>{feedback.subject}</span></td>
                                        <td style={{ maxWidth: '300px' }}>
                                            {editingId === feedback.id ? (
                                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                                    <div style={{ padding: '10px', background: 'rgba(255,255,255,0.05)', borderRadius: '8px', fontSize: '0.875rem' }}>
                                                        {feedback.message}
                                                    </div>
                                                    <textarea
                                                        className="modern-input"
                                                        value={adminNotes}
                                                        onChange={(e) => setAdminNotes(e.target.value)}
                                                        placeholder="Add your notes..."
                                                        rows={3}
                                                    />
                                                    <select
                                                        className="modern-input"
                                                        value={selectedStatus}
                                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                                    >
                                                        <option value="pending">Pending</option>
                                                        <option value="reviewed">Reviewed</option>
                                                        <option value="resolved">Resolved</option>
                                                    </select>
                                                </div>
                                            ) : (
                                                <div>
                                                    <div style={{ color: 'var(--text-muted)' }}>{feedback.message}</div>
                                                    {feedback.admin_notes && (
                                                        <div style={{ marginTop: '8px', padding: '8px', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.2)', color: '#f59e0b', borderRadius: '6px', fontSize: '0.85rem' }}>
                                                            <strong>Admin Notes:</strong> {feedback.admin_notes}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td>
                                            <span className={getStatusBadgeClass(feedback.status)}>
                                                {feedback.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                                                <Calendar size={14} />
                                                {new Date(feedback.created_at).toLocaleDateString()}
                                            </div>
                                        </td>
                                        <td className="text-right">
                                            {editingId === feedback.id ? (
                                                <div className="action-buttons-row">
                                                    <button
                                                        className="action-btn success"
                                                        onClick={() => handleUpdate(feedback.id)}
                                                        title="Save Changes"
                                                    >
                                                        <CheckCircle size={16} />
                                                    </button>
                                                    <button
                                                        className="action-btn danger"
                                                        onClick={() => setEditingId(null)}
                                                        title="Cancel"
                                                    >
                                                        <X size={16} />
                                                    </button>
                                                </div>
                                            ) : (
                                                <button
                                                    className="action-btn info"
                                                    onClick={() => startEditing(feedback)}
                                                    title="Edit Feedback"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminFeedback;
