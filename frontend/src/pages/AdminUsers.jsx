import { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { Users, Search, Shield, UserCheck, UserX, CheckCircle, AlertCircle } from 'lucide-react';
import './AdminDashboard.css';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const { users } = await adminService.getAllUsers();
            setUsers(users || []);
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const toggleActivation = async (userId, currentStatus) => {
        try {
            await adminService.toggleUserActivation(userId, !currentStatus);
            setMessage({ type: 'success', text: `User ${!currentStatus ? 'activated' : 'deactivated'} successfully!` });
            loadUsers();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Update failed' });
        }
    };

    const changeRole = async (userId, newRole) => {
        try {
            await adminService.changeUserRole(userId, newRole);
            setMessage({ type: 'success', text: 'User role updated successfully!' });
            loadUsers();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Update failed' });
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-users-container">
            <div className="page-header">
                <h1>User Management 👥</h1>
                <p>Manage user accounts, roles, and access permissions.</p>
            </div>

            {message.text && (
                <div className={`alert-banner ${message.type}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="content-card full-width">
                <div className="card-header-flex">
                    <h2><Users size={20} /> All Users ({users.length})</h2>
                    <div className="search-box">
                        <Search size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>User</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th>Joined Date</th>
                                <th className="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map(user => (
                                <tr key={user.id}>
                                    <td>
                                        <div className="user-cell">
                                            <div className="avatar-sm">
                                                {user.email.charAt(0).toUpperCase()}
                                            </div>
                                            <div className="user-info">
                                                <span className="user-email">{user.email}</span>
                                                <span className="user-id">ID: {user.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <select
                                            value={user.role}
                                            onChange={(e) => changeRole(user.id, e.target.value)}
                                            className={`role-select ${user.role}`}
                                        >
                                            <option value="user">User</option>
                                            <option value="admin">Admin</option>
                                        </select>
                                    </td>
                                    <td>
                                        <span className={`status-badge ${user.is_active ? 'success' : 'danger'}`}>
                                            {user.is_active ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td>{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="text-right">
                                        <button
                                            onClick={() => toggleActivation(user.id, user.is_active)}
                                            className={`action-btn ${user.is_active ? 'danger' : 'success'}`}
                                            title={user.is_active ? 'Deactivate User' : 'Activate User'}
                                        >
                                            {user.is_active ? <UserX size={18} /> : <UserCheck size={18} />}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminUsers;
