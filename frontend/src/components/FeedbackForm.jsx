import { useState } from 'react';
import axios from 'axios';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const FeedbackForm = () => {
    const { t } = useTranslation();
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject.trim() || !message.trim()) {
            setError(t('feedback.fill_all'));
            return;
        }

        setLoading(true);
        setError('');
        setSuccess(false);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
            await axios.post(`${apiUrl}/feedback`, {
                subject: subject.trim(),
                message: message.trim()
            }, {
                withCredentials: true
            });

            setSuccess(true);
            setSubject('');
            setMessage('');

            setTimeout(() => setSuccess(false), 5000);
        } catch (err) {
            setError(err.response?.data?.error || t('feedback.error_msg'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-card">
            <div className="card-header-simple">
                <h3><Send size={18} /> {t('feedback.title')}</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '8px' }}>
                    {t('feedback.subtitle')}
                </p>
            </div>

            {success && (
                <div className="content-card mt-2" style={{ background: '#f0fdf4', border: '1px solid #86efac' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <CheckCircle size={20} style={{ color: '#16a34a' }} />
                        <span style={{ color: '#166534' }}>
                            <strong>{t('feedback.success_msg')}</strong>
                        </span>
                    </div>
                </div>
            )}

            {error && (
                <div className="content-card mt-2" style={{ background: '#fef2f2', border: '1px solid #fca5a5' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <AlertCircle size={20} style={{ color: '#dc2626' }} />
                        <span style={{ color: '#991b1b' }}>{error}</span>
                    </div>
                </div>
            )}

            <form onSubmit={handleSubmit} className="content-card mt-2">
                <div className="form-group-modern">
                    <label>{t('বিষয়')}</label>
                    <input
                        type="text"
                        className="modern-input"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        placeholder={t('feedback.subject_placeholder')}
                        maxLength={200}
                        disabled={loading}
                    />
                    <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                        {subject.length}/200 characters
                    </small>
                </div>

                <div className="form-group-modern">
                    <label>{t('বার্তা')}</label>
                    <textarea
                        className="modern-input"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder={t('feedback.message_placeholder')}
                        rows={6}
                        maxLength={1000}
                        disabled={loading}
                        style={{ resize: 'vertical', fontFamily: 'inherit' }}
                    />
                    <small style={{ color: '#6b7280', marginTop: '4px', display: 'block' }}>
                        {message.length}/1000 characters
                    </small>
                </div>

                <button
                    type="submit"
                    className="btn-primary"
                    disabled={loading || !subject.trim() || !message.trim()}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Send size={16} />
                    {loading ? t('feedback.submitting') : t('feedback.submit_btn')}
                </button>
            </form>


        </div>
    );
};

export default FeedbackForm;
