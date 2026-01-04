import React from 'react';
import { useTranslation } from 'react-i18next';

const Logo = ({ className = '', size = 'md' }) => {
    const { t } = useTranslation();

    const sizes = {
        sm: { icon: '1.5rem', text: '1rem', p: '0.25rem' },
        md: { icon: '2.5rem', text: '1.5rem', p: '0.5rem' },
        lg: { icon: '3.5rem', text: '2.5rem', p: '0.75rem' }
    };

    const currentSize = sizes[size] || sizes.md;

    return (
        <div className={`modern-logo ${className}`} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="logo-graphic" style={{
                width: currentSize.icon,
                height: currentSize.icon,
                background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 16px -4px rgba(37, 99, 235, 0.4)',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '60%', height: '60%' }}>
                    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M21 7L12 12L3 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="3" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1" />
                </svg>
                <div className="logo-glow"></div>
            </div>
            <div className="logo-text-wrapper" style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="logo-title-main" style={{
                    fontSize: currentSize.text,
                    fontWeight: '800',
                    letterSpacing: '-0.03em',
                    lineHeight: '1',
                    background: 'linear-gradient(to right, #fff 0%, #94a3b8 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                    Tax<span style={{ color: '#3b82f6', WebkitTextFillColor: '#3b82f6' }}>C</span>
                </span>
                {size !== 'sm' && (
                    <span className="logo-subtitle-main" style={{
                        fontSize: '0.7rem',
                        color: '#64748b',
                        textTransform: 'uppercase',
                        fontWeight: '700',
                        letterSpacing: '0.1em',
                        marginTop: '0.25rem'
                    }}>
                        {t('common.smart_filing_hub')}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Logo;
