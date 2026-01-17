import React from 'react';
import { useTranslation } from 'react-i18next';

const Logo = ({ className = '', size = 'md' }) => {
    const { i18n } = useTranslation();

    const sizes = {
        sm: { icon: '2rem', text: '1.125rem', subtitle: '0.5rem' },
        md: { icon: '2.75rem', text: '1.5rem', subtitle: '0.625rem' },
        lg: { icon: '3.5rem', text: '2rem', subtitle: '0.75rem' }
    };

    const s = sizes[size] || sizes.md;

    return (
        <div className={`logo-wrapper ${className}`} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        }}>
            {/* Icon Box */}
            <div style={{
                width: s.icon,
                height: s.icon,
                background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
                borderRadius: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 6px 16px -4px rgba(59, 130, 246, 0.5)',
                flexShrink: 0
            }}>
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '55%', height: '55%' }}>
                    <path d="M12 2L3 7V17L12 22L21 17V7L12 2Z" fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12 22V12M21 7L12 12L3 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="12" r="2" fill="white" />
                </svg>
            </div>

            {/* Text */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{
                    fontSize: s.text,
                    fontWeight: '800',
                    color: '#ffffff',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2'
                }}>
                    TaxC
                </span>
                {size !== 'sm' && (
                    <span style={{
                        fontSize: s.subtitle,
                        color: '#94a3b8',
                        fontWeight: '500',
                        lineHeight: '1.2'
                    }}>
                        {i18n.language === 'bn' ? 'স্মার্ট ট্যাক্স ফাইলিং প্ল্যাটফর্ম' : 'Smart Tax Filing Platform'}
                    </span>
                )}
            </div>
        </div>
    );
};

export default Logo;
