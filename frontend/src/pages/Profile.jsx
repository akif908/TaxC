import { useState, useEffect } from 'react';
import profileService from '../services/profileService';
import { User, Phone, CreditCard, MapPin, Briefcase, DollarSign, Save, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import './Profile.css';

const Profile = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        nid: '',
        tin: '',
        address: '',
        occupation: '',
        annual_income: ''
    });
    const [message, setMessage] = useState({ type: '', text: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const { profile } = await profileService.getProfile();
            setProfile(profile);
            setFormData({
                name: profile.name || '',
                phone: profile.phone || '',
                nid: profile.nid || '',
                tin: profile.tin || '',
                address: profile.address || '',
                occupation: profile.occupation || '',
                annual_income: profile.annual_income || ''
            });
        } catch (error) {
            console.log('No profile yet');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            if (profile) {
                await profileService.updateProfile(formData);
                setMessage({ type: 'success', text: t('profile.success_update') });
            } else {
                await profileService.createProfile(formData);
                setMessage({ type: 'success', text: t('profile.success_create') });
            }
            loadProfile();
        } catch (error) {
            setMessage({ type: 'error', text: error.response?.data?.error || 'Operation failed' });
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="profile-container">
            <div className="page-header">
                <h1>{t('profile.title')}</h1>
                <p>{t('profile.subtitle')}</p>
            </div>

            <div className="profile-card">
                <div className="card-header-simple">
                    <h2>{profile ? t('profile.edit_title') : t('profile.create_title')}</h2>
                </div>

                {message.text && (
                    <div className={`alert-banner ${message.type}`}>
                        {message.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                        <span>{message.text}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="profile-form">
                    <div className="form-grid">
                        {/* Personal Info */}
                        <div className="form-section">
                            <h3>{t('profile.personal_info')}</h3>

                            <div className="form-group-modern">
                                <label>{t('profile.full_name')} *</label>
                                <div className="input-wrapper">
                                    <User size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('profile.enter_name')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-modern">
                                <label>{t('profile.phone')} *</label>
                                <div className="input-wrapper">
                                    <Phone size={18} className="input-icon" />
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('profile.enter_phone')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-modern">
                                <label>{t('profile.address')} *</label>
                                <div className="input-wrapper">
                                    <MapPin size={18} className="input-icon" />
                                    <textarea
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                        rows="3"
                                        placeholder={t('profile.enter_address')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Tax Info */}
                        <div className="form-section">
                            <h3>{t('profile.tax_details')}</h3>

                            <div className="form-group-modern">
                                <label>{t('profile.nid')} *</label>
                                <div className="input-wrapper">
                                    <CreditCard size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="nid"
                                        value={formData.nid}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('profile.enter_nid')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-modern">
                                <label>{t('profile.tin')}</label>
                                <div className="input-wrapper">
                                    <CreditCard size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="tin"
                                        value={formData.tin}
                                        onChange={handleChange}
                                        placeholder={t('profile.enter_tin')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-modern">
                                <label>{t('profile.occupation')} *</label>
                                <div className="input-wrapper">
                                    <Briefcase size={18} className="input-icon" />
                                    <input
                                        type="text"
                                        name="occupation"
                                        value={formData.occupation}
                                        onChange={handleChange}
                                        required
                                        placeholder={t('profile.enter_occupation')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>

                            <div className="form-group-modern">
                                <label>{t('profile.annual_income')} (৳)</label>
                                <div className="input-wrapper">
                                    <DollarSign size={18} className="input-icon" />
                                    <input
                                        type="number"
                                        name="annual_income"
                                        value={formData.annual_income}
                                        onChange={handleChange}
                                        placeholder={t('profile.enter_income')}
                                        className="modern-input with-icon"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button
                            type="submit"
                            className="btn-primary-lg"
                            disabled={loading}
                        >
                            {loading ? t('profile.saving') : (
                                <>
                                    <Save size={20} /> {profile ? t('profile.update_btn') : t('profile.save_btn')}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
