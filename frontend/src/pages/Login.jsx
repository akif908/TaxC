import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';
import Logo from '../components/Logo';
import './Login.css';

const Login = ({ onLogin }) => {
    const { t, i18n } = useTranslation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setEmail('');
        setPassword('');
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { user } = await authService.login(email, password);
            onLogin(user);
            if (user.role === 'admin') {
                navigate('/admin/dashboard');
            } else if (user.role === 'consultant') {
                navigate('/consultant/dashboard');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.error || t('auth.login.failed'));
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
                    <h1>{t('auth.login.title')}</h1>
                    <p>{i18n.language === 'bn' ? 'আপনার অ্যাকাউন্টে সাইন ইন করুন' : 'Sign in to your account'}</p>
                </div>

                {error && (
                    <div className="auth-error">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="form-group">
                        <label>{t('auth.login.email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={t('auth.login.email_placeholder')}
                            autoComplete="off"
                        />
                    </div>

                    <div className="form-group">
                        <label>{t('auth.login.password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder={t('auth.login.password_placeholder')}
                            autoComplete="new-password"
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? t('auth.login.logging_in') : t('auth.login.login_btn')}
                    </button>
                </form>

                <div className="auth-footer">
                    <span>{t('auth.login.no_account')} </span>
                    <Link to="/register">{t('auth.login.register_link')}</Link>
                </div>

                <div className="demo-creds">
                    <strong>{t('auth.login.demo_creds')}</strong>
                    <span>Admin: admin@tax.com / admin123</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
