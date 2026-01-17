import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';
import './Login.css';

const Register = ({ onRegister }) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError(t('auth.register.password_mismatch'));
            return;
        }

        if (password.length < 6) {
            setError(t('auth.register.password_short'));
            return;
        }

        setLoading(true);

        try {
            const { user } = await authService.register(email, password);
            onRegister(user);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.error || t('auth.register.failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            {/* Background Effects */}
            <div className="auth-bg-gradient"></div>
            <div className="auth-bg-grid"></div>

            {/* Header */}
            <div className="auth-header">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <Logo size="md" />
                </Link>
                <LanguageSwitcher />
            </div>

            {/* Main Card */}
            <div className="auth-card">
                <div className="auth-card-header">
                    <h1>{t('auth.register.title')}</h1>
                    <p>{i18n.language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create your new account'}</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>{t('auth.register.email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={t('auth.register.email_placeholder')}
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('auth.register.password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder={t('auth.register.password_placeholder')}
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('auth.register.confirm_password')}</label>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            placeholder={t('auth.register.confirm_password_placeholder')}
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? t('auth.register.creating') : t('auth.register.btn')}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>{t('auth.register.have_account')} </span>
                    <Link to="/login">{t('auth.register.login_link')}</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
