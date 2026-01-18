import { useState, useEffect } from 'react';
import { User, Mail, Award, BookOpen, Clock, Save, CheckCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import consultantService from '../services/consultantService';
import './ConsultantDashboard.css';

const ConsultantProfile = () => {
    const { t } = useTranslation();
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        qualification: '',
        experience: '',
        bio: '',
        is_available: true
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState(null);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        try {
            const data = await consultantService.getProfile();
            setProfile({
                full_name: data.profile.full_name || '',
                email: data.profile.email || '',
                qualification: data.profile.qualification || '',
                experience: data.profile.experience || '',
                bio: data.profile.bio || '',
                is_available: data.profile.is_available ?? true
            });
        } catch (error) {
            console.error('Failed to load profile:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setSaving(true);
            await consultantService.updateProfile(profile);
            setMessage({ type: 'success', text: t('consultant.profile.update_success') });
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            setMessage({ type: 'error', text: t('consultant.profile.update_error') });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <h1>{t('consultant.profile.title')} 🔐</h1>
                <p>{t('consultant.profile.subtitle')}</p>
            </header>

            <div className="profile-grid">
                <form className="profile-form bg-panel" onSubmit={handleSubmit}>
                    <div className="form-section">
                        <h3>{t('consultant.profile.basics')}</h3>
                        <div className="form-group">
                            <label><User size={16} /> {t('consultant.profile.full_name')}</label>
                            <input
                                type="text"
                                name="full_name"
                                value={profile.full_name}
                                disabled
                                className="disabled-input"
                            />
                            <small>{t('consultant.profile.name_note')}</small>
                        </div>
                        <div className="form-group">
                            <label><Mail size={16} /> {t('consultant.profile.email')}</label>
                            <input
                                type="email"
                                name="email"
                                value={profile.email}
                                disabled
                                className="disabled-input"
                            />
                        </div>
                    </div>

                    <div className="form-section">
                        <h3>{t('consultant.profile.professional_details')}</h3>
                        <div className="form-group">
                            <label><Award size={16} /> {t('consultant.profile.qualifications')}</label>
                            <input
                                type="text"
                                name="qualification"
                                value={profile.qualification}
                                onChange={handleChange}
                                placeholder={t('consultant.profile.qualifications_placeholder')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><Clock size={16} /> {t('consultant.profile.experience')}</label>
                            <input
                                type="text"
                                name="experience"
                                value={profile.experience}
                                onChange={handleChange}
                                placeholder={t('consultant.profile.experience_placeholder')}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label><BookOpen size={16} /> {t('consultant.profile.bio')}</label>
                            <textarea
                                name="bio"
                                value={profile.bio}
                                onChange={handleChange}
                                rows="5"
                                placeholder={t('consultant.profile.bio_placeholder')}
                            ></textarea>
                        </div>
                    </div>

                    <div className="form-section settings">
                        <h3>{t('consultant.profile.availability_settings')}</h3>
                        <div className="toggle-group">
                            <div className="toggle-text">
                                <span className="toggle-label">{t('consultant.profile.accepting_requests')}</span>
                                <p>{t('consultant.profile.availability_note')}</p>
                            </div>
                            <label className="switch">
                                <input
                                    type="checkbox"
                                    name="is_available"
                                    checked={profile.is_available}
                                    onChange={handleChange}
                                />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    </div>

                    <div className="form-actions">
                        {message && <div className={`form-message ${message.type}`}>{message.text}</div>}
                        <button type="submit" className="save-btn" disabled={saving}>
                            {saving ? t('consultant.profile.saving') : <><Save size={18} /> {t('consultant.profile.save_changes')}</>}
                        </button>
                    </div>
                </form>

                <aside className="profile-preview-card">
                    <div className="preview-header">
                        <div className="avatar-lg">
                            {profile.full_name.charAt(0)}
                        </div>
                        <h2>{profile.full_name}</h2>
                        <span className="preview-qual">{profile.qualification || t('consultant.profile.preview_name')}</span>
                    </div>

                    <div className="preview-content">
                        <div className="preview-stat">
                            <span className="label">{t('consultant.profile.status')}</span>
                            <span className={`status-text ${profile.is_available ? 'online' : 'offline'}`}>
                                {profile.is_available ? t('consultant.profile.available') : t('consultant.profile.unavailable')}
                            </span>
                        </div>
                        <div className="preview-bio">
                            <h4>{t('consultant.profile.bio')}</h4>
                            <p>{profile.bio || t('consultant.profile.bio_default')}</p>
                        </div>
                    </div>

                    <div className="preview-verification">
                        <div className="verify-icon"><CheckCircle size={20} /></div>
                        <span>{t('consultant.profile.verified')}</span>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default ConsultantProfile;
