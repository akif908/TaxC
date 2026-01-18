import { useState } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import consultantService from '../services/consultantService';

const RequestConsultationModal = ({ isOpen, onClose, consultant }) => {
    const { t } = useTranslation();
    const [topic, setTopic] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    if (!isOpen) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            await consultantService.requestConsultation({
                consultant_id: consultant.id,
                topic,
                message
            });
            setSuccess(true);
            setTimeout(() => {
                onClose();
                setSuccess(false);
                setTopic('');
                setMessage('');
            }, 2000);
        } catch (err) {
            setError(t('consultant.request_modal.error'));
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content-glass animated-fade-in">
                <div className="modal-header">
                    <h2>{t('consultant.request_modal.title')}</h2>
                    <button className="close-btn" onClick={onClose}><X size={20} /></button>
                </div>

                {success ? (
                    <div className="success-view">
                        <div className="success-icon-wrapper">
                            <Send className="success-icon" />
                        </div>
                        <h3>{t('consultant.request_modal.success')}</h3>
                    </div>
                ) : (
                    <div className="modal-body">
                        <div className="consultant-mini-info">
                            <div className="avatar-sm">
                                {consultant.full_name?.charAt(0)}
                            </div>
                            <div className="info-text">
                                <p>{t('consultant.request_modal.subtitle', { name: consultant.full_name })}</p>
                                <span className="qual">{consultant.qualification}</span>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="request-form">
                            <div className="form-group">
                                <label>{t('consultant.request_modal.topic_label')}</label>
                                <input
                                    type="text"
                                    placeholder={t('consultant.request_modal.topic_placeholder')}
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label>{t('consultant.request_modal.message_label')}</label>
                                <textarea
                                    placeholder={t('consultant.request_modal.message_placeholder')}
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    rows="4"
                                    required
                                ></textarea>
                            </div>

                            {error && (
                                <div className="error-msg">
                                    <AlertCircle size={16} /> {error}
                                </div>
                            )}

                            <div className="modal-actions">
                                <button type="button" className="secondary-btn" onClick={onClose}>
                                    {t('consultant.request_modal.cancel_btn')}
                                </button>
                                <button type="submit" className="primary-btn" disabled={submitting}>
                                    {submitting ? t('consultant.request_modal.sending') : <><Send size={18} /> {t('consultant.request_modal.submit_btn')}</>}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RequestConsultationModal;
