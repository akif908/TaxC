import React, { useState } from 'react';
import { Calculator, TrendingUp, Info, AlertCircle, CheckCircle, DollarSign, Users, Shield, Clock, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { toBanglaNumber } from '../utils/bnUtils';

const sanchayapatraSchemes = {
  '5-Year Bangladesh Sanchayapatra': {
    tenure: 5,
    rates: [
      { year: 1, rate: 9.35 },
      { year: 2, rate: 9.80 },
      { year: 3, rate: 10.30 },
      { year: 4, rate: 10.85 },
      { year: 5, rate: 11.28 },
    ],
    sourceTds: 10,
    description: 'Progressive interest rates increasing each year',
    minInvestment: 1000,
    maxInvestment: 5000000,
  },
  '3-Monthly Profit Bearing Sanchayapatra': {
    tenure: 3,
    rate: 11.04,
    sourceTds: 10,
    description: 'Quarterly profit payout option',
    minInvestment: 1000,
    maxInvestment: 5000000,
  },
  'Pensioner Sanchayapatra': {
    tenure: 5,
    rate: 11.76,
    sourceTds: 5,
    description: 'Exclusive for senior citizens (65+)',
    minInvestment: 1000,
    maxInvestment: 5000000,
  },
  'Poribar Sanchayapatra': {
    tenure: 5,
    rate: 11.52,
    sourceTds: 5,
    description: 'Family savings certificate',
    minInvestment: 1000,
    maxInvestment: 5000000,
  },
};

const SanchayapatraCalculator = () => {
  const { t, i18n } = useTranslation();
  const [scheme, setScheme] = useState(Object.keys(sanchayapatraSchemes)[0]);
  const [investment, setInvestment] = useState(100000);
  const [results, setResults] = useState(null);

  const isBn = i18n.language === 'bn';
  const formatNumber = (num) => {
    const n = parseFloat(num).toLocaleString();
    return isBn ? toBanglaNumber(n) : n;
  };

  const getSchemeName = (name) => {
    if (!isBn) return name;
    const map = {
      '5-Year Bangladesh Sanchayapatra': '৫-বছর মেয়াদী বাংলাদেশ সঞ্চয়পত্র',
      '3-Monthly Profit Bearing Sanchayapatra': '৩ মাস অন্তর মুনাফা ভিত্তিক সঞ্চয়পত্র',
      'Pensioner Sanchayapatra': 'পেনশনার সঞ্চয়পত্র',
      'Poribar Sanchayapatra': 'পরিবার সঞ্চয়পত্র'
    };
    return map[name] || name;
  };

  const calculateReturns = () => {
    const selectedScheme = sanchayapatraSchemes[scheme];
    let totalInterest = 0;
    let breakdown = [];
    const principal = investment;

    if (scheme === '5-Year Bangladesh Sanchayapatra') {
      let currentPrincipal = principal;
      for (let i = 0; i < selectedScheme.tenure; i++) {
        const yearRate = selectedScheme.rates[i];
        const interest = currentPrincipal * (yearRate.rate / 100);
        totalInterest += interest;
        breakdown.push({
          year: yearRate.year,
          principal: currentPrincipal.toFixed(2),
          interest: interest.toFixed(2),
          balance: (currentPrincipal + interest).toFixed(2),
        });
        currentPrincipal += interest;
      }
    } else if (scheme === '3-Monthly Profit Bearing Sanchayapatra') {
      const monthlyRate = selectedScheme.rate / 12 / 100;
      const totalMonths = selectedScheme.tenure * 12;
      totalInterest = principal * Math.pow(1 + monthlyRate, totalMonths) - principal;
    } else {
      totalInterest = principal * (selectedScheme.rate / 100) * selectedScheme.tenure;
    }

    const tax = totalInterest * (selectedScheme.sourceTds / 100);
    const netReturn = totalInterest - tax;
    const maturityAmount = principal + netReturn;

    setResults({
      totalInterest: totalInterest.toFixed(2),
      tax: tax.toFixed(2),
      netReturn: netReturn.toFixed(2),
      maturityAmount: maturityAmount.toFixed(2),
      breakdown,
    });
  };

  const selectedSchemeDetails = sanchayapatraSchemes[scheme];

  return (
    <div className="tool-card">
      <div className="card-header-simple">
        <h3><Calculator size={18} /> {t('calculators.sanchayapatra.title')}</h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '8px' }}>
          {t('calculators.sanchayapatra.subtitle')}
        </p>
      </div>

      {/* What is Sanchayapatra */}
      <div className="content-card mt-2" style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', backdropFilter: 'blur(10px)' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <Info size={24} style={{ color: '#60a5fa', flexShrink: 0 }} />
          <div>
            <h4 style={{ color: '#93c5fd', marginBottom: '8px' }}>{t('calculators.sanchayapatra.what_is_title')}</h4>
            <p style={{ color: '#bfdbfe', margin: 0, lineHeight: '1.6' }}>
              {t('calculators.sanchayapatra.what_is_desc')}
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Section */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ marginBottom: '16px', color: 'white' }}>{t('calculators.sanchayapatra.calc_title')}</h4>

        <div className="form-group-modern">
          <label style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.scheme_label')}</label>
          <select
            className="modern-input"
            style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
            value={scheme}
            onChange={(e) => setScheme(e.target.value)}
          >
            {Object.keys(sanchayapatraSchemes).map(s => (
              <option key={s} value={s} style={{ background: '#0a192f', color: 'white' }}>{getSchemeName(s)}</option>
            ))}
          </select>
          <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
            {scheme === '5-Year Bangladesh Sanchayapatra' && isBn ? 'ক্রমবর্ধমান সুদের হার প্রতি বছর বৃদ্ধি পায়' :
              scheme === '3-Monthly Profit Bearing Sanchayapatra' && isBn ? 'ত্রৈমাসিক মুনাফা প্রদানের বিকল্প' :
                scheme === 'Pensioner Sanchayapatra' && isBn ? 'শুধুমাত্র প্রবীণ নাগরিকদের জন্য (৬৫+)' :
                  scheme === 'Poribar Sanchayapatra' && isBn ? 'পারিবারিক সঞ্চয়ী বন্ড' :
                    selectedSchemeDetails.description}
          </small>
        </div>

        <div className="form-group-modern">
          <label style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.amount_label')}</label>
          <div className="input-wrapper">
            <span className="currency-symbol" style={{ color: '#64748b' }}>৳</span>
            <input
              type="number"
              className="modern-input"
              style={{ background: 'rgba(255, 255, 255, 0.03)', color: 'white', borderColor: 'rgba(255, 255, 255, 0.1)' }}
              value={investment}
              onChange={(e) => setInvestment(parseFloat(e.target.value) || 0)}
              placeholder="100000"
            />
          </div>
          <small style={{ color: '#64748b', marginTop: '4px', display: 'block' }}>
            Min: ৳{formatNumber(selectedSchemeDetails.minInvestment)} | Max: ৳{formatNumber(selectedSchemeDetails.maxInvestment)}
          </small>
        </div>

        <button className="btn-primary" style={{ width: '100%', marginTop: '8px' }} onClick={calculateReturns}>
          <Calculator size={16} style={{ marginRight: '8px' }} />
          {t('calculators.sanchayapatra.calc_btn')}
        </button>
      </div>

      {/* Results */}
      {results && (
        <>
          <div className="result-summary mt-2" style={{ gridTemplateColumns: 'repeat(2, 1fr)', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
            <div className="summary-item">
              <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.total_interest')}</span>
              <span className="value" style={{ color: 'white' }}>৳{formatNumber(results.totalInterest)}</span>
            </div>
            <div className="summary-item">
              <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.tax')} ({formatNumber(selectedSchemeDetails.sourceTds)}%)</span>
              <span className="value" style={{ color: '#ef4444' }}>৳{formatNumber(results.tax)}</span>
            </div>
            <div className="summary-item">
              <span className="label" style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.net_return')}</span>
              <span className="value" style={{ color: '#10b981' }}>৳{formatNumber(results.netReturn)}</span>
            </div>
            <div className="summary-item highlight" style={{ background: 'rgba(37, 99, 235, 0.1)', borderTop: '1px solid rgba(37, 99, 235, 0.2)' }}>
              <span className="label" style={{ color: '#93c5fd' }}>{t('calculators.sanchayapatra.maturity_amount')}</span>
              <span className="value" style={{ color: 'white' }}>৳{formatNumber(results.maturityAmount)}</span>
            </div>
          </div>

          {results.breakdown.length > 0 && (
            <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
              <h4 style={{ color: 'white' }}>{t('calculators.sanchayapatra.year')} ভিত্তিক বিবরণ</h4>
              <div className="table-responsive">
                <table className="modern-table">
                  <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
                    <tr>
                      <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.year')}</th>
                      <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.principal')} (৳)</th>
                      <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.interest')} (৳)</th>
                      <th style={{ color: '#94a3b8' }}>{t('calculators.sanchayapatra.balance')} (৳)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-color)]">
                    {results.breakdown.map(b => (
                      <tr key={b.year} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                        <td style={{ color: 'white' }}>{formatNumber(b.year)}</td>
                        <td style={{ color: 'white' }}>৳{formatNumber(b.principal)}</td>
                        <td style={{ color: 'white' }}>৳{formatNumber(b.interest)}</td>
                        <td style={{ color: 'white' }}>৳{formatNumber(b.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </>
      )}

      {/* Sanchayapatra Guide */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <Award size={18} style={{ color: '#fbbf24' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.types_title')}</h4>
          </div>
        </div>
        <div className="card-body">
          <div style={{ display: 'grid', gap: '12px' }}>
            <div style={{ padding: '12px', background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.1)', borderRadius: '8px' }}>
              <h5 style={{ color: '#34d399', marginBottom: '4px' }}>৫-বছর মেয়াদী বাংলাদেশ সঞ্চয়পত্র</h5>
              <p style={{ color: '#a7f3d0', fontSize: '0.9rem', margin: 0 }}>
                ক্রমবর্ধমান সুদের হার ({formatNumber(9.35)}% থেকে {formatNumber(11.28)}%)। দীর্ঘমেয়াদী সঞ্চয়ের জন্য আদর্শ।
              </p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(37, 99, 235, 0.05)', border: '1px solid rgba(37, 99, 235, 0.1)', borderRadius: '8px' }}>
              <h5 style={{ color: '#60a5fa', marginBottom: '4px' }}>৩ মাস অন্তর মুনাফা ভিত্তিক সঞ্চয়পত্র</h5>
              <p style={{ color: '#93c5fd', fontSize: '0.9rem', margin: 0 }}>
                {formatNumber(11.04)}% বার্ষিক হার এবং ত্রৈমাসিক মুনাফা প্রদান। যাদের নিয়মিত আয় প্রয়োজন তাদের জন্য উপযুক্ত।
              </p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.1)', borderRadius: '8px' }}>
              <h5 style={{ color: '#fbbf24', marginBottom: '4px' }}>পেনশনার সঞ্চয়পত্র</h5>
              <p style={{ color: '#fcd34d', fontSize: '0.9rem', margin: 0 }}>
                {formatNumber(11.76)}% হার শুধুমাত্র প্রবীণ নাগরিকদের জন্য (৬৫+)। TDS হার ৫%।
              </p>
            </div>
            <div style={{ padding: '12px', background: 'rgba(236, 72, 153, 0.05)', border: '1px solid rgba(236, 72, 153, 0.1)', borderRadius: '8px' }}>
              <h5 style={{ color: '#f472b6', marginBottom: '4px' }}>পরিবার সঞ্চয়পত্র</h5>
              <p style={{ color: '#f9a8d4', fontSize: '0.9rem', margin: 0 }}>
                {formatNumber(11.52)}% হার পারিবারিক সঞ্চয়ের জন্য। TDS হার ৫%। যৌথ পারিবারিক বিনিয়োগের জন্য আদর্শ।
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Key Features */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <Shield size={18} style={{ color: '#10b981' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.features_title')}</h4>
          </div>
        </div>
        <div className="card-body">
          <ul className="feature-list">
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>সরকারি গ্যারান্টি:</strong> ১০০% নিরাপদ কারণ এটি বাংলাদেশ সরকার কর্তৃক সমর্থিত</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>উচ্চ মুনাফা:</strong> সাধারণ সঞ্চয়ী হিসাবের তুলনায় ভালো সুদের হার</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>কর সুবিধা:</strong> অন্যান্য বিনিয়োগের তুলনায় কম TDS হার (৫-১০%)</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>নমনীয় মেয়াদ:</strong> আপনার প্রয়োজন অনুযায়ী ৩ থেকে ৫ বছরের বিকল্প</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>নমিনেশন সুবিধা:</strong> নিরাপত্তার জন্য সুবিধাভোগী মনোনীত করতে পারেন</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> <strong style={{ color: 'white' }}>লোন সুবিধা:</strong> সঞ্চয়পত্র সার্টিফিকেটের বিপরীতে লোন নেওয়া যায়</li>
          </ul>
        </div>
      </div>

      {/* Eligibility */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <Users size={18} style={{ color: '#60a5fa' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.eligibility_title')}</h4>
          </div>
        </div>
        <div className="card-body">
          <ul className="feature-list">
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> যেকোনো বয়সের বাংলাদেশী নাগরিক</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> নাবালক (অভিভাবকের মাধ্যমে)</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> প্রবীণ নাগরিক (বিশেষ স্কিম উপলব্ধ)</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> যৌথ হিসাব (স্বামী-স্ত্রী, পিতা-মাতা/সন্তান)</li>
            <li style={{ color: '#94a3b8' }}><CheckCircle size={16} style={{ color: '#10b981' }} /> সংস্থা এবং প্রতিষ্ঠান (সীমাবদ্ধতা সাপেক্ষে)</li>
          </ul>
        </div>
      </div>

      {/* How to Purchase */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <DollarSign size={18} style={{ color: '#10b981' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.purchase_title')}</h4>
          </div>
        </div>
        <div className="card-body">
          <ol style={{ marginLeft: '20px', color: '#94a3b8', lineHeight: '1.8' }}>
            <li>যেকোনো তফসিলি ব্যাংক বা বাংলাদেশ ডাকঘরে যান</li>
            <li>আপনার জাতীয় পরিচয়পত্র এবং টিন সার্টিফিকেট নিয়ে আসুন</li>
            <li>আবেদন ফর্ম পূরণ করুন</li>
            <li>বিনিয়োগের পরিমাণ জমা দিন (নগদ/চেক/ট্রান্সফার)</li>
            <li>আপনার সঞ্চয়পত্র সার্টিফিকেট গ্রহণ করুন</li>
          </ol>
          <div className="tip-box" style={{ marginTop: '12px', background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.2)', color: '#93c5fd', borderRadius: '8px', padding: '12px' }}>
            <Info size={16} /> টিপস: আপনার সার্টিফিকেট নিরাপদে রাখুন এবং রেকর্ডের জন্য একটি কপি সংরক্ষণ করুন।
          </div>
        </div>
      </div>

      {/* Important Notes */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <AlertCircle size={18} style={{ color: '#ef4444' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.notes_title')}</h4>
          </div>
        </div>
        <div className="card-body">
          <ul className="feature-list">
            <li style={{ color: '#94a3b8' }}><AlertCircle size={16} style={{ color: '#ef4444' }} /> <strong style={{ color: 'white' }}>মেয়াদপূর্ব নগদায়ন:</strong> সম্ভব কিন্তু সুদের হার কমে যাবে</li>
            <li style={{ color: '#94a3b8' }}><AlertCircle size={16} style={{ color: '#ef4444' }} /> <strong style={{ color: 'white' }}>বিনিয়োগ সীমা:</strong> জনপ্রতি সর্বোচ্চ ৫০ লক্ষ টাকা (স্কিম ভেদে ভিন্ন)</li>
            <li style={{ color: '#94a3b8' }}><AlertCircle size={16} style={{ color: '#ef4444' }} /> <strong style={{ color: 'white' }}>TDS কর্তন:</strong> উৎসে কর কর্তন (স্কিমের উপর ভিত্তি করে ৫-১০%)</li>
            <li style={{ color: '#94a3b8' }}><AlertCircle size={16} style={{ color: '#ef4444' }} /> <strong style={{ color: 'white' }}>হার পরিবর্তন:</strong> সরকারি নীতির উপর ভিত্তি করে সুদের হার পরিবর্তন হতে পারে</li>
          </ul>
        </div>
      </div>

      {/* Comparison with FDR */}
      <div className="content-card mt-2" style={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)' }}>
        <div className="card-header-flex">
          <div className="header-title">
            <TrendingUp size={18} style={{ color: '#60a5fa' }} />
            <h4 style={{ marginLeft: 8, color: 'white' }}>{t('calculators.sanchayapatra.compare_title')}</h4>
          </div>
        </div>
        <div className="table-responsive">
          <table className="modern-table">
            <thead style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
              <tr>
                <th style={{ color: '#94a3b8' }}>বৈশিষ্ট্য</th>
                <th style={{ color: '#94a3b8' }}>সঞ্চয়পত্র</th>
                <th style={{ color: '#94a3b8' }}>ব্যাংক FDR</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ color: '#94a3b8' }}>সুদের হার</td>
                <td style={{ color: 'white' }}>{formatNumber(9.35)}% - {formatNumber(11.76)}%</td>
                <td style={{ color: 'white' }}>{formatNumber(5)}% - {formatNumber(9)}%</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ color: '#94a3b8' }}>নিরাপত্তা</td>
                <td style={{ color: 'white' }}>সরকারি গ্যারান্টিযুক্ত</td>
                <td style={{ color: 'white' }}>ব্যাংক ব্যাকড</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ color: '#94a3b8' }}>ট্যাক্স কর্তন</td>
                <td style={{ color: 'white' }}>{formatNumber(5)}% - {formatNumber(10)}% TDS</td>
                <td style={{ color: 'white' }}>{formatNumber(10)}% - {formatNumber(15)}% TDS</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ color: '#94a3b8' }}>মেয়াদ</td>
                <td style={{ color: 'white' }}>{formatNumber(3)} - {formatNumber(5)} বছর</td>
                <td style={{ color: 'white' }}>১ মাস - ৫ বছর</td>
              </tr>
              <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                <td style={{ color: '#94a3b8' }}>তারল্য</td>
                <td style={{ color: 'white' }}>মাঝারি</td>
                <td style={{ color: 'white' }}>উচ্চ</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="content-card mt-2" style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-color)' }}>
        <div style={{ display: 'flex', alignItems: 'start', gap: '12px' }}>
          <Info size={20} style={{ color: '#64748b', flexShrink: 0 }} />
          <p style={{ color: '#94a3b8', margin: 0, fontSize: '0.85rem', lineHeight: '1.6' }}>
            <strong>দাবিত্যাগ:</strong> বাংলাদেশ ব্যাংক এবং অর্থ মন্ত্রণালয় দ্বারা সুদের হার এবং শর্তাবলী পরিবর্তন সাপেক্ষে। বিনিয়োগ করার আগে সর্বদা বর্তমান হার যাচাই করুন। এই ক্যালকুলেটর শুধুমাত্র অনুমানের উদ্দেশ্যে।
          </p>
        </div>
      </div>
    </div>
  );
};

export default SanchayapatraCalculator;