import React, { useState } from 'react';
import { Calculator, TrendingUp, Info, AlertCircle, CheckCircle, DollarSign, Building2, Shield, Clock, Award, Percent } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toBanglaNumber } from '../utils/bnUtils';

const FDRCalculator = () => {
    const { t, i18n } = useTranslation();
    const [principal, setPrincipal] = useState(200000);
    const [rate, setRate] = useState(9);
    const [years, setYears] = useState(3);
    const [freq, setFreq] = useState(4); // 1=annual, 4=quarterly, 12=monthly
    const [ait, setAit] = useState(10); // Advance Income Tax percentage
    const [showResults, setShowResults] = useState(false);

    const isBn = i18n.language === 'bn';
    const formatNumber = (num, decimals = 2) => {
        // Handle undefined or null
        if (num === undefined || num === null) return '';
        // If it's already a string with commas, strip them if re-formatting, but usually we pass raw numbers
        // Format to standard English locale first
        const n = Number(num).toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
        return isBn ? toBanglaNumber(n) : n;
    };

    // Simple format for integers or inputs
    const formatInt = (num) => {
        const n = Number(num).toLocaleString('en-US');
        return isBn ? toBanglaNumber(n) : n;
    };


    const calculateFDR = () => {
        setShowResults(true);
    };

    // Calculate maturity amount
    const maturity = principal * Math.pow(1 + (rate / 100) / freq, freq * years);
    const totalInterest = maturity - principal;

    // Calculate AIT (Advance Income Tax)
    const aitAmount = totalInterest * (ait / 100);
    const netInterest = totalInterest - aitAmount;
    const netMaturity = principal + netInterest;

    // Year-wise breakdown
    const yearlyBreakdown = [];
    for (let i = 1; i <= years; i++) {
        const yearMaturity = principal * Math.pow(1 + (rate / 100) / freq, freq * i);
        const yearInterest = yearMaturity - principal;
        yearlyBreakdown.push({
            year: i,
            amount: yearMaturity,
            interest: yearInterest
        });
    }

    const compoundingFrequency = {
        1: isBn ? 'বার্ষিক' : 'Annual',
        4: isBn ? 'ত্রৈমাসিক' : 'Quarterly',
        12: isBn ? 'মাসিক' : 'Monthly'
    };

    return (
        <div className="tool-card">
            <div className="card-header-simple">
                <h3><Calculator size={18} /> {t('calculators.fdr.title')}</h3>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                    {t('calculators.fdr.subtitle')}
                </p>
            </div>

            {/* What is FDR */}
            <div className="content-card mt-2" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(10px)' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
                    <div>
                        <h4 style={{ color: '#93c5fd', marginBottom: '8px' }}>{t('calculators.fdr.what_is_title')}</h4>
                        <p style={{ color: '#bfdbfe', margin: 0, lineHeight: '1.6' }}>
                            {t('calculators.fdr.what_is_desc')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Calculator Section */}
            <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <h4 style={{ marginBottom: '16px', color: 'white' }}>{t('calculators.fdr.calc_title')}</h4>

                <div className="form-group-modern">
                    <label style={{ color: '#94a3b8' }}>{t('calculators.fdr.principal_label')}</label>
                    <div className="input-wrapper">
                        <span className="currency-symbol" style={{ color: '#64748b' }}>৳</span>
                        <input
                            type="number"
                            className="modern-input"
                            style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            value={principal}
                            onChange={(e) => setPrincipal(parseFloat(e.target.value) || 0)}
                            placeholder="200000"
                        />
                    </div>
                    <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Minimum: ৳{formatInt(10000)} | Typical range: ৳{formatInt(50000)} - ৳{formatInt(5000000)}
                    </small>
                </div>

                <div className="form-group-modern">
                    <label style={{ color: '#94a3b8' }}>{t('calculators.fdr.rate_label')}</label>
                    <div className="input-wrapper">
                        <Percent size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                        <input
                            type="number"
                            className="modern-input"
                            style={{ paddingLeft: '36px', background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value) || 0)}
                            placeholder="9"
                            step="0.1"
                        />
                    </div>
                    <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Typical range: {formatInt(5)}% - {formatInt(9)}% per annum
                    </small>
                </div>

                <div className="form-group-modern">
                    <label style={{ color: '#94a3b8' }}>{t('calculators.fdr.tenure_label')}</label>
                    <div className="input-wrapper">
                        <Clock size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                        <input
                            type="number"
                            className="modern-input"
                            style={{ paddingLeft: '36px', background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            value={years}
                            onChange={(e) => setYears(parseFloat(e.target.value) || 0)}
                            placeholder="3"
                            step="0.5"
                        />
                    </div>
                </div>

                <div className="form-group-modern">
                    <label style={{ color: '#94a3b8' }}>{t('calculators.fdr.freq_label')}</label>
                    <select
                        className="modern-input"
                        style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                        value={freq}
                        onChange={(e) => setFreq(Number(e.target.value))}
                    >
                        <option value={1}>{compoundingFrequency[1]}</option>
                        <option value={4}>{compoundingFrequency[4]}</option>
                        <option value={12}>{compoundingFrequency[12]}</option>
                    </select>
                </div>

                <div className="form-group-modern">
                    <label style={{ color: '#94a3b8' }}>{t('calculators.fdr.ait_label')}</label>
                    <div className="input-wrapper">
                        <Percent size={16} style={{ position: 'absolute', left: '12px', color: '#64748b' }} />
                        <input
                            type="number"
                            className="modern-input"
                            style={{ paddingLeft: '36px', background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
                            value={ait}
                            onChange={(e) => setAit(parseFloat(e.target.value) || 0)}
                            placeholder="10"
                            step="0.1"
                        />
                    </div>
                    <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
                        Banks deduct {formatInt(10)}-{formatInt(15)}% AIT on interest
                    </small>
                </div>

                <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={calculateFDR}>
                    <Calculator size={16} style={{ marginRight: '8px' }} />
                    {t('calculators.fdr.calc_btn')}
                </button>
            </div>

            {/* Results */}
            {showResults && (
                <>
                    <div className="result-summary mt-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
                        <div className="summary-item">
                            <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.fdr.principal_label')}</span>
                            <span className="value" style={{ color: 'white' }}>৳{formatNumber(principal, 0)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.total_interest')}</span>
                            <span className="value" style={{ color: 'white' }}>৳{formatNumber(totalInterest)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label" style={{ color: '#94a3b8' }}>AIT ({formatInt(ait)}%)</span>
                            <span className="value" style={{ color: '#ef4444' }}>-৳{formatNumber(aitAmount)}</span>
                        </div>
                        <div className="summary-item">
                            <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.fdr.net_interest')}</span>
                            <span className="value" style={{ color: '#10b981' }}>৳{formatNumber(netInterest)}</span>
                        </div>
                        <div className="summary-item highlight" style={{ gridColumn: 'span 2', background: 'rgba(37, 99, 235, 0.1)', borderTop: '1px solid rgba(37, 99, 235, 0.2)' }}>
                            <span className="label" style={{ color: '#93c5fd' }}>{t('calculators.fdr.net_maturity')}</span>
                            <span className="value" style={{ color: 'white' }}>৳{formatNumber(netMaturity)}</span>
                        </div>
                    </div>

                    {/* Calculation Details */}
                    <div className="content-card mt-2" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)' }}>
                        <h4 style={{ color: '#34d399', marginBottom: '8px' }}>{t('calculators.fdr.details_title')}</h4>
                        <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                            <strong>Formula:</strong> A = P × (1 + r/n)^(n×t)<br />
                            <strong>Where:</strong> P = ৳{formatNumber(principal, 0)}, r = {formatInt(rate)}%, n = {formatInt(freq)} ({compoundingFrequency[freq]}), t = {formatInt(years)} years
                        </p>
                    </div>

                    {/* Year-wise Breakdown */}
                    <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                        <h4 style={{ color: 'white' }}>{t('calculators.fdr.growth_title')}</h4>
                        <div className="table-responsive">
                            <table className="modern-table">
                                <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                                    <tr>
                                        <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.year')}</th>
                                        <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.maturity_amount')} (৳)</th>
                                        <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.interest')} (৳)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {yearlyBreakdown.map(item => (
                                        <tr key={item.year} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                                            <td style={{ color: 'white' }}>{formatInt(item.year)}</td>
                                            <td style={{ color: 'white' }}>৳{formatNumber(item.amount)}</td>
                                            <td style={{ color: 'white' }}>৳{formatNumber(item.interest)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}

            {/* Example Banks */}
            <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="card-header-flex">
                    <div className="header-title">
                        <Building2 size={18} style={{ color: '#60a5fa' }} />
                        <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.fdr.banks_title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <div style={{ display: 'grid', gap: '12px' }}>
                        <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
                            <h5 style={{ color: '#34d399', marginBottom: '4px' }}>🏦 ব্যাংক এশিয়া লিমিটেড</h5>
                            <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                                ১ মাস থেকে ৫ বছর মেয়াদী FDR অফার করে
                            </p>
                        </div>
                        <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.1)', borderRadius: '8px' }}>
                            <h5 style={{ color: '#60a5fa', marginBottom: '4px' }}>💼 মার্কেন্টাইল ব্যাংক পিএলসি</h5>
                            <p style={{ color: '#93c5fd', fontSize: '0.9rem', margin: 0 }}>
                                ন্যূনতম জমা ৳১০,০০০, একাধিক মেয়াদ বিকল্প উপলব্ধ
                            </p>
                        </div>
                        <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
                            <h5 style={{ color: '#fbbf24', marginBottom: '4px' }}>🏛️ আইএফআইসি ব্যাংক পিএলসি</h5>
                            <p style={{ color: '#fcd34d', fontSize: '0.9rem', margin: 0 }}>
                                ১ মাস থেকে ৫ বছর পর্যন্ত নমনীয় মেয়াদ
                            </p>
                        </div>
                        <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.1)', borderRadius: '8px' }}>
                            <h5 style={{ color: '#f472b6', marginBottom: '4px' }}>🏢 ইস্টার্ন ব্যাংক পিএলসি</h5>
                            <p style={{ color: '#f9a8d4', fontSize: '0.9rem', margin: 0 }}>
                                আকর্ষণীয় সুদের হারের সাথে টার্ম ডিপোজিট
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Key Features */}
            <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="card-header-flex">
                    <div className="header-title">
                        <Award size={18} style={{ color: '#fbbf24' }} />
                        <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.fdr.features_title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="feature-list">
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>নিশ্চিত মুনাফা:</strong> সম্পূর্ণ মেয়াদের জন্য ফিক্সড সুদের হার</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>নমনীয় মেয়াদ:</strong> ১ মাস থেকে ৫+ বছরের বিকল্প</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>নমনীয় পেমেন্ট:</strong> মাসিক, ত্রৈমাসিক, বার্ষিক বা মেয়াদান্তে</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>FDR লোন:</strong> FDR-এর বিপরীতে লোন নেওয়ার সুবিধা</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>অটো-রিনিউয়াল:</strong> মেয়াদান্তে স্বয়ংক্রিয়ভাবে নবায়নের সুবিধা</li>
                    </ul>
                </div>
            </div>

            {/* Benefits */}
            <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
                <div className="card-header-flex">
                    <div className="header-title">
                        <Shield size={18} style={{ color: '#10b981' }} />
                        <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.fdr.benefits_title')}</h4>
                    </div>
                </div>
                <div className="card-body">
                    <ul className="feature-list">
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> ব্যাংকের মাধ্যমে নিরাপদ বিনিয়োগ</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> সাধারণ সঞ্চয়ী হিসাবের চেয়ে বেশি মুনাফা</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> নিশ্চিত আয়ের উৎস</li>
                        <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> কোনো মার্কেট ঝুঁকি নেই - নিশ্চিত মূলধন এবং মুনাফা</li>
                    </ul>
                </div>
            </div>

            {/* Disclaimer */}
            <div className="content-card mt-2" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
                    <Info size={20} style={{ color: '#64748b', flexShrink: 0 }} />
                    <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
                        <strong>দাবিত্যাগ:</strong> সুদের হার এবং শর্তাবলী ব্যাংকভেদে ভিন্ন হতে পারে এবং পরিবর্তন সাপেক্ষে। বিনিয়োগ করার আগে সর্বদা আপনার ব্যাংকের সাথে বর্তমান হার যাচাই করুন। এই ক্যালকুলেটর শুধুমাত্র অনুমানের উদ্দেশ্যে।
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FDRCalculator;
