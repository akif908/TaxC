import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import authService from '../services/authService';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from '../components/LanguageSwitcher';

const Login = ({ onLogin }) => {
    const { t } = useTranslation();
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
        <div className="container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', top: '20px', right: '20px' }}>
                <LanguageSwitcher />
            </div>
            <div className="card" style={{ maxWidth: '450px', width: '100%', position: 'relative' }}>
                <div className="card-header" style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <Link to="/" style={{ position: 'absolute', top: '0', left: '0', textDecoration: 'none', color: 'var(--text-light)', display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.9rem' }}>
                        ← {t('auth.login.back')}
                    </Link>
                    <h2 style={{ fontSize: '2rem', fontWeight: '800' }}>{t('auth.login.title')}</h2>
                </div>
                {error && <div className="alert alert-error">{error}</div>}
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>{t('auth.login.email')}</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder={t('auth.login.email_placeholder')}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                            autoComplete="off"
                            autoCapitalize="none"
                        />
                    </div>
                    <div className="form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-light)' }}>{t('auth.login.password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder={t('auth.login.password_placeholder')}
                            style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border-color)', color: 'white' }}
                            autoComplete="new-password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', padding: '1rem' }}>
                        {loading ? t('auth.login.logging_in') : t('auth.login.login_btn')}
                    </button>
                </form>
                <p style={{ marginTop: '1.5rem', textAlign: 'center', color: 'var(--text-light)' }}>
                    {t('auth.login.no_account')} <Link to="/register" style={{ color: 'var(--primary-color)', fontWeight: '600' }}>{t('auth.login.register_link')}</Link>
                </p>
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '0.75rem', border: '1px solid var(--border-color)', fontSize: '0.875rem' }}>
                    <strong style={{ color: 'var(--text-light)' }}>{t('auth.login.demo_creds')}</strong><br />
                    <span style={{ opacity: 0.8 }}>Admin: admin@tax.com / admin123</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
