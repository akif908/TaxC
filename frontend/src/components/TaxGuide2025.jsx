import { useState, useEffect } from 'react';
import { BookOpen, Calendar, FileText, Info, CheckCircle, AlertCircle, ExternalLink, Lightbulb, DollarSign, TrendingUp, Users, Building2 } from 'lucide-react';
import taxService from '../services/taxService';
import { useTranslation } from 'react-i18next';

const TaxGuide2025 = () => {
    const { t } = useTranslation();
    const [slabs, setSlabs] = useState([]);

    useEffect(() => {
        const fetchSlabs = async () => {
            try {
                const res = await taxService.getTaxSlabs();
                setSlabs(res.slabs || []);
            } catch (e) {
                console.error(e);
            }
        };
        fetchSlabs();
    }, []);

    const taxFreeLimits = [
        { category: 'General Taxpayer (Male)', limit: '৳3,50,000', year: 'AY 2025-26' },
        { category: 'General Taxpayer (Female)', limit: '৳3,50,000', year: 'AY 2025-26' },
        { category: 'Senior Citizen (65+ years)', limit: '৳4,00,000', year: 'AY 2025-26' },
        { category: 'Disabled Person', limit: '৳4,75,000', year: 'AY 2025-26' },
        { category: 'Gazetted War-wounded Freedom Fighter', limit: '৳5,00,000', year: 'AY 2025-26' }
    ];

    return (
        <div className="tool-card">
            <div className="card-header-simple">
                <h3><BookOpen size={18} /> {t('tax_guide.title')}</h3>
                <p style={{ fontSize: '0.9rem', color: '#6b7280', marginTop: '8px' }}>
                    {t('tax_guide.subtitle')}
                </p>
            </div>

            {/* Tax Day Reminder */}
            <div className="content-card mt-2" style={{ background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '1px solid #fbbf24' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <Calendar size={24} style={{ color: '#d97706', flexShrink: 0 }} />
                    <div>
                        <h4 style={{ color: '#92400e', marginBottom: '8px' }}>{t('tax_guide.reminder.title')}</h4>
                        <p style={{ color: '#78350f', margin: 0 }}>
                            {t('tax_guide.reminder.text')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Tax-Free Income Limits */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <DollarSign size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.tax_free_limits.title')}</h4>
                    </div>
                    <span className="header-subtitle">{t('tax_guide.tax_free_limits.subtitle')}</span>
                </div>
                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>{t('tax_guide.tax_free_limits.category')}</th>
                                <th>{t('tax_guide.tax_free_limits.limit')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {taxFreeLimits.map((item, idx) => (
                                <tr key={idx}>
                                    <td>{item.category}</td>
                                    <td><strong>{item.limit}</strong></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Tax Rates (Current Slabs) */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <TrendingUp size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.tax_rates.title')}</h4>
                    </div>
                    <span className="header-subtitle">{t('tax_guide.tax_rates.subtitle')}</span>
                </div>
                <div className="table-responsive">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>{t('tax_guide.tax_rates.range')}</th>
                                <th>{t('tax_guide.tax_rates.rate')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slabs.map((s) => (
                                <tr key={s.id || `${s.min_income}-${s.tax_rate}`}>
                                    <td>
                                        ৳{Number(s.min_income).toLocaleString()} - {s.max_income ? `৳${Number(s.max_income).toLocaleString()}` : '∞'}
                                    </td>
                                    <td><strong>{Number(s.tax_rate)}%</strong></td>
                                </tr>
                            ))}
                            {slabs.length === 0 && (
                                <tr>
                                    <td colSpan={2} style={{ textAlign: 'center', color: '#6b7280' }}>No slabs configured</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <p className="note-text mt-1">
                    {t('tax_guide.tax_rates.note')}
                </p>
            </div>

            {/* Minimum Tax */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <Info size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.min_tax.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <p>{t('tax_guide.min_tax.desc')}</p>
                    <ul className="feature-list">
                        <li><CheckCircle size={16} /> {t('tax_guide.min_tax.list.1')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.min_tax.list.2')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.min_tax.list.3')}</li>
                    </ul>
                    <div className="tip-box">
                        <Lightbulb size={16} /> {t('tax_guide.min_tax.tip')}
                    </div>
                </div>
            </div>

            {/* Net Wealth Surcharge */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <Building2 size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.wealth_surcharge.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <p>{t('tax_guide.wealth_surcharge.desc')}</p>
                    <ul className="feature-list">
                        <li><Info size={16} /> {t('tax_guide.wealth_surcharge.list.1')}</li>
                        <li><Info size={16} /> {t('tax_guide.wealth_surcharge.list.2')}</li>
                        <li><Info size={16} /> {t('tax_guide.wealth_surcharge.list.3')}</li>
                        <li><Info size={16} /> {t('tax_guide.wealth_surcharge.list.4')}</li>
                        <li><Info size={16} /> {t('tax_guide.wealth_surcharge.list.5')}</li>
                    </ul>
                </div>
            </div>

            {/* Environmental Surcharge */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <AlertCircle size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.env_surcharge.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <p>{t('tax_guide.env_surcharge.desc')}</p>
                    <ul className="feature-list">
                        <li><Info size={16} /> {t('tax_guide.env_surcharge.list.1')}</li>
                        <li><Info size={16} /> {t('tax_guide.env_surcharge.list.2')}</li>
                        <li><Info size={16} /> {t('tax_guide.env_surcharge.list.3')}</li>
                        <li><Info size={16} /> {t('tax_guide.env_surcharge.list.4')}</li>
                        <li><Info size={16} /> {t('tax_guide.env_surcharge.list.5')}</li>
                    </ul>
                </div>
            </div>

            {/* Corporate Tax Rates */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <Building2 size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.corporate_tax.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="feature-list">
                        <li><CheckCircle size={16} /> {t('tax_guide.corporate_tax.list.1')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.corporate_tax.list.2')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.corporate_tax.list.3')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.corporate_tax.list.4')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.corporate_tax.list.5')}</li>
                    </ul>
                    <p className="note-text mt-1">
                        {t('tax_guide.corporate_tax.note')}
                    </p>
                </div>
            </div>

            {/* Investment Tax Rebate */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <DollarSign size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.rebate.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <p>{t('tax_guide.rebate.desc')}</p>
                    <ol style={{ marginLeft: '20px', marginTop: '12px', color: '#374151' }}>
                        <li>{t('tax_guide.rebate.calc_list.1')}</li>
                        <li>{t('tax_guide.rebate.calc_list.2')}</li>
                        <li>{t('tax_guide.rebate.calc_list.3')}</li>
                    </ol>

                    <h5 style={{ marginTop: '16px', marginBottom: '8px', color: '#111827' }}>{t('tax_guide.rebate.sectors_title')}</h5>
                    <ul className="feature-list">
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.1')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.2')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.3')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.4')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.5')}</li>
                        <li><CheckCircle size={16} /> {t('tax_guide.rebate.sectors_list.6')}</li>
                    </ul>
                </div>
            </div>

            {/* Required Documents */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <FileText size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.documents.title')}</h4>
                    </div>
                    <span className="header-subtitle">{t('tax_guide.documents.subtitle')}</span>
                </div>
                <div className="card-body">
                    <div style={{ marginBottom: '16px' }}>
                        <h5 style={{ color: '#111827', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} />
                            {t('tax_guide.documents.list.1.title')}
                        </h5>
                        <p style={{ color: '#6b7280', marginLeft: '24px', fontSize: '0.9rem' }}>{t('tax_guide.documents.list.1.desc')}</p>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <h5 style={{ color: '#111827', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} />
                            {t('tax_guide.documents.list.2.title')}
                        </h5>
                        <p style={{ color: '#6b7280', marginLeft: '24px', fontSize: '0.9rem' }}>{t('tax_guide.documents.list.2.desc')}</p>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <h5 style={{ color: '#111827', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} />
                            {t('tax_guide.documents.list.3.title')}
                        </h5>
                        <p style={{ color: '#6b7280', marginLeft: '24px', fontSize: '0.9rem' }}>{t('tax_guide.documents.list.3.desc')}</p>
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <h5 style={{ color: '#111827', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <CheckCircle size={16} style={{ color: '#10b981' }} />
                            {t('tax_guide.documents.list.4.title')}
                        </h5>
                        <p style={{ color: '#6b7280', marginLeft: '24px', fontSize: '0.9rem' }}>{t('tax_guide.documents.list.4.desc')}</p>
                    </div>
                </div>
            </div>

            {/* Filing Deadlines */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <Calendar size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.deadlines.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="feature-list">
                        <li><Info size={16} /> {t('tax_guide.deadlines.list.1')}</li>
                        <li><Info size={16} /> {t('tax_guide.deadlines.list.2')}</li>
                        <li><Info size={16} /> {t('tax_guide.deadlines.list.3')}</li>
                        <li><Info size={16} /> {t('tax_guide.deadlines.list.4')}</li>
                    </ul>
                    <div className="warning-box">
                        <AlertCircle size={16} /> {t('tax_guide.deadlines.warning')}
                    </div>
                </div>
            </div>

            {/* Helpful Links */}
            <div className="content-card mt-2">
                <div className="card-header-flex">
                    <div className="header-title">
                        <ExternalLink size={18} />
                        <h4 style={{ marginLeft: 8 }}>{t('tax_guide.links.title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="link-list">
                        <li>
                            <a className="link-text" href="https://nbr.gov.bd/taxtypes/income-tax/income-tax-paripatra/eng" target="_blank" rel="noreferrer">
                                {t('tax_guide.links.nbr_paripatra_en')}
                            </a>
                        </li>
                        <li>
                            <a className="link-text" href="https://nbr.gov.bd/taxtypes/income-tax/income-tax-paripatra/ban" target="_blank" rel="noreferrer">
                                {t('tax_guide.links.nbr_paripatra_bn')}
                            </a>
                        </li>
                        <li>
                            <a className="link-text" href="https://nbr.gov.bd/uploads/paripatra/Income-tax_Paripatra_2025-2026.pdf" target="_blank" rel="noreferrer">
                                {t('tax_guide.links.paripatra_pdf')}
                            </a>
                        </li>
                        <li>
                            <a className="link-text" href="https://nbr.gov.bd/" target="_blank" rel="noreferrer">
                                {t('tax_guide.links.nbr_website')}
                            </a>
                        </li>
                        <li>
                            <a className="link-text" href="https://etaxnbr.gov.bd/" target="_blank" rel="noreferrer">
                                {t('tax_guide.links.ereturn')}
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="content-card mt-2" style={{ background: '#f9fafb', border: '1px solid #e5e7eb' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <Info size={20} style={{ color: '#6b7280', flexShrink: 0 }} />
                    <p style={{ color: '#6b7280', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <strong>{t('tax_guide.disclaimer')}</strong>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default TaxGuide2025;
