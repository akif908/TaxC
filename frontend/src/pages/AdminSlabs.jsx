import { useState, useEffect } from 'react';
import adminService from '../services/adminService';
import { Layers, Plus, Edit2, Trash2, Save, X, CheckCircle, AlertCircle } from 'lucide-react';
import './AdminDashboard.css';

const AdminSlabs = () => {
    const [slabs, setSlabs] = useState([]);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [editingSlab, setEditingSlab] = useState(null);
    const [formData, setFormData] = useState({
        min_income: '',
        max_income: '',
        tax_rate: ''
    });

    useEffect(() => {
        loadSlabs();
    }, []);

    const loadSlabs = async () => {
        try {
            const { slabs } = await adminService.getTaxSlabs();
            setSlabs(slabs || []);
        } catch (error) {
            console.error('Failed to load slabs:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage({ type: '', text: '' });

        try {
            if (editingSlab) {
                await adminService.updateTaxSlab(editingSlab.id, formData);
                setMessage({ type: 'success', text: 'Tax slab updated successfully!' });
            } else {
                await adminService.createTaxSlab(formData);
                setMessage({ type: 'success', text: 'Tax slab created successfully!' });
            }
            setEditingSlab(null);
            setFormData({ min_income: '', max_income: '', tax_rate: '' });
            loadSlabs();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Operation failed' });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this slab?')) return;

        try {
            await adminService.deleteTaxSlab(id);
            setMessage({ type: 'success', text: 'Tax slab deleted successfully!' });
            loadSlabs();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Delete failed' });
        }
    };

    const startEdit = (slab) => {
        setEditingSlab(slab);
        setFormData({
            min_income: slab.min_income,
            max_income: slab.max_income || '',
            tax_rate: slab.tax_rate
        });
    };

    const cancelEdit = () => {
        setEditingSlab(null);
        setFormData({ min_income: '', max_income: '', tax_rate: '' });
    };

    return (
        <div className="admin-slabs-container">
            <div className="page-header">
                <h1>Tax Slabs Management 📊</h1>
                <p>Configure tax brackets and rates for the system.</p>
            </div>

            {message.text && (
                <div className={`alert-banner ${message.type}`}>
                    {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                    <span>{message.text}</span>
                </div>
            )}

            <div className="content-grid">
                {/* Form Section */}
                <div className="form-card">
                    <div className="card-header-simple">
                        <h2>{editingSlab ? 'Edit Tax Slab' : 'Add New Slab'}</h2>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className="form-group-modern">
                            <label>Minimum Income (৳)</label>
                            <input
                                type="number"
                                value={formData.min_income}
                                onChange={(e) => setFormData({ ...formData, min_income: e.target.value })}
                                required
                                placeholder="e.g. 0"
                                className="modern-input"
                            />
                        </div>

                        <div className="form-group-modern">
                            <label>Maximum Income (৳)</label>
                            <input
                                type="number"
                                value={formData.max_income}
                                onChange={(e) => setFormData({ ...formData, max_income: e.target.value })}
                                placeholder="Leave empty for unlimited"
                                className="modern-input"
                            />
                            <small className="helper-text">Leave blank for the highest slab (e.g. 1600000+)</small>
                        </div>

                        <div className="form-group-modern">
                            <label>Tax Rate (%)</label>
                            <input
                                type="number"
                                step="0.1"
                                value={formData.tax_rate}
                                onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
                                required
                                placeholder="e.g. 5"
                                className="modern-input"
                            />
                        </div>

                        <div className="form-actions">
                            {editingSlab && (
                                <button type="button" onClick={cancelEdit} className="btn-secondary">
                                    <X size={18} /> Cancel
                                </button>
                            )}
                            <button type="submit" className="btn-primary">
                                {editingSlab ? <Save size={18} /> : <Plus size={18} />}
                                {editingSlab ? 'Update Slab' : 'Add Slab'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* List Section */}
                <div className="list-card">
                    <div className="card-header-simple">
                        <h2><Layers size={20} /> Current Tax Slabs</h2>
                    </div>

                    <div className="table-responsive">
                        <table className="modern-table">
                            <thead>
                                <tr>
                                    <th>Income Range</th>
                                    <th>Tax Rate</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slabs.map((slab) => (
                                    <tr key={slab.id}>
                                        <td>
                                            <span className="range-badge">
                                                ৳{slab.min_income?.toLocaleString()}
                                                {slab.max_income ? ` - ৳${slab.max_income?.toLocaleString()}` : '+'}
                                            </span>
                                        </td>
                                        <td>
                                            <span className="rate-badge">{slab.tax_rate}%</span>
                                        </td>
                                        <td className="text-right">
                                            <div className="action-buttons-row">
                                                <button
                                                    onClick={() => startEdit(slab)}
                                                    className="action-btn info"
                                                    title="Edit Slab"
                                                >
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(slab.id)}
                                                    className="action-btn danger"
                                                    title="Delete Slab"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminSlabs;
