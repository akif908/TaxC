import { useState, useEffect } from 'react';
import { X, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toBanglaNumber } from '../utils/bnUtils';

const DeadlinePopup = () => {
    const { t, i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const [daysRemaining, setDaysRemaining] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if popup was dismissed in this session
        const dismissed = sessionStorage.getItem('taxDeadlineDismissed');

        if (!dismissed) {
            calculateTimeRemaining();
            // Show popup after a short delay for better UX
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const calculateTimeRemaining = () => {
        const deadline = new Date('2025-12-31T23:59:59');
        const now = new Date();
        const diffTime = deadline - now;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setDaysRemaining(diffDays > 0 ? diffDays : 0);
    };

    const handleDismiss = () => {
        setIsVisible(false);
        // Save dismissal to sessionStorage (cleared on tab close or logout)
        sessionStorage.setItem('taxDeadlineDismissed', 'true');
    };

    const handleFileNow = () => {
        setIsVisible(false);
        navigate('/tax-form');
    };

    if (!isVisible || daysRemaining <= 0) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
            <div className="bg-[#0a192f] rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-white/10" style={{ background: '#0a192f', borderRadius: '24px', maxWidth: '440px', width: '100%', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
                {/* Header */}
                <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 p-6 border-b border-white/5" style={{ background: 'linear-gradient(to right, rgba(239, 68, 68, 0.15), rgba(249, 115, 22, 0.15))', padding: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.05)', display: 'flex', alignItems: 'start', gap: '16px' }}>
                    <div className="p-3 bg-red-500/20 rounded-2xl" style={{ background: 'rgba(239, 68, 68, 0.2)', padding: '12px', borderRadius: '16px' }}>
                        <AlertTriangle className="text-red-500" size={24} style={{ color: '#ef4444' }} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-white" style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                            {t('deadline_popup.title')}
                        </h3>
                        <p className="text-red-400/80 text-sm mt-1" style={{ color: 'rgba(248, 113, 113, 0.8)', fontSize: '0.875rem', marginTop: '4px' }}>
                            {t('deadline_popup.subtitle')}
                        </p>
                    </div>
                    <button
                        onClick={handleDismiss}
                        className="text-white/20 hover:text-white transition-colors"
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255, 255, 255, 0.3)' }}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="p-8" style={{ padding: '32px' }}>
                    <div className="text-center mb-8">
                        <p className="text-gray-400 mb-6 leading-relaxed">
                            {t('deadline_popup.message', {
                                days: i18n.language === 'bn' ? toBanglaNumber(daysRemaining) : daysRemaining,
                                year: i18n.language === 'bn' ? toBanglaNumber('2025-2026') : '2025-2026'
                            })}
                        </p>

                        <div className="inline-flex items-center justify-center gap-4 bg-white/5 px-8 py-4 rounded-2xl border border-white/10">
                            <Clock className="text-red-500" size={24} style={{ color: '#ef4444' }} />
                            <div className="flex flex-col items-start">
                                <span className="text-3xl font-bold text-white">
                                    {i18n.language === 'bn' ? toBanglaNumber(daysRemaining) : daysRemaining} {t('deadline_popup.days')}
                                </span>
                                <span className="text-red-500 text-xs font-bold uppercase tracking-widest">{t('deadline_popup.remaining')}</span>
                            </div>
                        </div>

                        <p className="text-sm text-gray-500 mt-6 font-medium">
                            {t('deadline_popup.deadline_date', { date: i18n.language === 'bn' ? '৩১ ডিসেম্বর, ২০২৫' : '31 Dec, 2025' })}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <button
                            onClick={handleFileNow}
                            className="w-full h-14 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-600/20"
                            style={{ width: '100%', height: '56px', background: '#dc2626', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                        >
                            {t('deadline_popup.file_now')} <ArrowRight size={20} />
                        </button>
                        <button
                            onClick={handleDismiss}
                            className="w-full h-12 text-gray-400 hover:text-white transition-colors font-medium"
                            style={{ width: '100%', height: '48px', color: '#94a3b8', background: 'transparent', border: 'none', fontWeight: '500', cursor: 'pointer' }}
                        >
                            {t('deadline_popup.remind_later')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeadlinePopup;
