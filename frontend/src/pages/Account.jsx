import { useEffect, useState } from 'react';
import taxService from '../services/taxService';
import paymentService from '../services/paymentService';
import documentService from '../services/documentService';
import { Calculator, FileText, BookOpen, Download, Info } from 'lucide-react';
import './Account.css';
import taxRules from './taxRulesConfig';
import SanchayapatraCalculator from '../components/SanchayapatraCalculator';
import FDRCalculator from '../components/FDRCalculator.jsx';
import TaxGuide2025 from '../components/TaxGuide2025.jsx';
import FeedbackForm from '../components/FeedbackForm.jsx';
import { useTranslation } from 'react-i18next';
import { toBanglaNumber } from '../utils/bnUtils';

const NumberInput = ({ label, value, onChange, suffix, formatNumber }) => (
  <div className="form-group-modern">
    <label>{label}</label>
    <div className="input-wrapper">
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        placeholder="0"
        className="modern-input"
      />
      {suffix && <span className="currency-symbol">{suffix}</span>}
    </div>
  </div>
);

const TaxCalculatorCard = () => {
  const { t, i18n } = useTranslation();

  // 1. Taxpayer Profile State
  const [profile, setProfile] = useState({
    category: 'general',
    location: 'dhaka_ctg_nganj',
    parentOfDisabledChild: false
  });

  // 2. Salary & Income State
  const [salaryIncome, setSalaryIncome] = useState({
    basic: '',
    houseRent: '',
    medical: '',
    conveyance: '',
    bonuses: '',
    overtime: '',
    other: ''
  });

  // 3. Investment State
  const [investments, setInvestments] = useState({
    lifeInsurance: '',
    dps: '',
    sanchayapatra: '',
    providentFund: '',
    stocks: '',
    zakat: ''
  });

  // 4. Adjustments State
  const [adjustments, setAdjustments] = useState({
    netWealth: '',
    ait: ''
  });

  const [result, setResult] = useState(null);
  const [breakdown, setBreakdown] = useState([]);
  const [loading, setLoading] = useState(false);

  const isBn = i18n.language === 'bn';
  const formatNumber = (num) => {
    const n = parseFloat(num).toLocaleString();
    return isBn ? toBanglaNumber(n) : n;
  };
  const formatInt = (num) => {
    const n = Number(num).toLocaleString();
    return isBn ? toBanglaNumber(n) : n;
  };

  const handleIncomeChange = (field, value) => {
    setIncomeDetails(prev => ({ ...prev, [field]: value }));
  };

  const getExemptionLimit = (cat) => {
    switch (cat) {
      case 'woman_senior': return 400000;
      case 'disabled': return 475000;
      case 'freedom_fighter': return 500000;
      default: return 350000; // general
    }
  };

  const generateSlabs = (exemptionLimit) => {
    return [
      { limit: exemptionLimit, rate: 0 },
      { limit: 100000, rate: 5 },
      { limit: 400000, rate: 10 },
      { limit: 500000, rate: 15 },
      { limit: 500000, rate: 20 },
      { limit: 2000000, rate: 25 },
      { limit: Infinity, rate: 30 }
    ];
  };

  const calculate = () => {
    setLoading(true);

    // --- 1. INCOME CALCULATION ---
    const basic = Number(salaryIncome.basic) || 0;
    const houseRent = Number(salaryIncome.houseRent) || 0;
    const medical = Number(salaryIncome.medical) || 0;
    const conveyance = Number(salaryIncome.conveyance) || 0;
    const bonuses = Number(salaryIncome.bonuses) || 0;
    const overtime = Number(salaryIncome.overtime) || 0;
    const otherSalaryIncome = Number(salaryIncome.other) || 0;

    // Exemptions (Simplified NBR rules)
    const houseRentExemption = Math.min(houseRent, basic * 0.3333, 300000);
    const medicalExemption = Math.min(medical, basic * 0.1, 120000);
    const conveyanceExemption = Math.min(conveyance, 30000);

    const taxableSalary = (basic) +
      Math.max(0, houseRent - houseRentExemption) +
      Math.max(0, medical - medicalExemption) +
      Math.max(0, conveyance - conveyanceExemption) +
      bonuses + overtime + otherSalaryIncome;

    const totalTaxableIncome = taxableSalary; // Assuming only salary for this detailed form for now

    // --- 2. TAX LIABILITY CALCULATION ---
    let exemptionLimit = 350000;
    if (profile.category === 'woman_senior') exemptionLimit = 400000;
    else if (profile.category === 'disabled') exemptionLimit = 475000;
    else if (profile.category === 'freedom_fighter') exemptionLimit = 500000;

    // Extra exemption for parent of disabled child
    if (profile.parentOfDisabledChild) exemptionLimit += 50000;

    const slabs = [
      { limit: exemptionLimit, rate: 0 },
      { limit: 100000, rate: 5 },
      { limit: 400000, rate: 10 },
      { limit: 500000, rate: 15 },
      { limit: 500000, rate: 20 },
      { limit: 1200000, rate: 25 },
      { limit: Infinity, rate: 30 }
    ];

    let remainingTaxable = totalTaxableIncome;
    let totalTaxLiability = 0;
    const newBreakdown = [];

    for (const slab of slabs) {
      if (remainingTaxable <= 0) break;
      const taxableInSlab = Math.min(remainingTaxable, slab.limit);
      const taxInSlab = taxableInSlab * (slab.rate / 100);

      if (taxableInSlab > 0) {
        newBreakdown.push({
          range: slab.rate === 0 ? t('tax_guide.tax_free_limits.limit') : `৳${slab.limit.toLocaleString()}`,
          rate: slab.rate,
          portion: taxableInSlab,
          tax: taxInSlab
        });
        totalTaxLiability += taxInSlab;
        remainingTaxable -= taxableInSlab;
      }
    }

    // --- 3. INVESTMENT REBATE ---
    const lifeIns = Number(investments.lifeInsurance) || 0;
    const dps = Math.min(Number(investments.dps) || 0, 120000);
    const sanchayapatra = Math.min(Number(investments.sanchayapatra) || 0, 500000);
    const pf = Number(investments.providentFund) || 0;
    const stocks = Number(investments.stocks) || 0;
    const zakat = Number(investments.zakat) || 0;

    const totalInvestment = lifeIns + dps + sanchayapatra + pf + stocks + zakat;

    // Rebate = 15% of total investment
    const rebate = totalInvestment * 0.15;

    // --- 4. SURCHARGE ---
    const netWealth = Number(adjustments.netWealth) || 0;
    let surchargeRate = 0;
    if (netWealth > 40000000 && netWealth <= 100000000) surchargeRate = 0.1;
    else if (netWealth > 100000000 && netWealth <= 200000000) surchargeRate = 0.2;
    else if (netWealth > 200000000 && netWealth <= 500000000) surchargeRate = 0.3;
    else if (netWealth > 500000000) surchargeRate = 0.35;

    const surcharge = totalTaxLiability * surchargeRate;

    // --- 5. FINAL CALCULATION ---
    const ait = Number(adjustments.ait) || 0;
    let netTax = Math.max(0, totalTaxLiability - rebate);

    // Minimum Tax based on Location
    let minTaxValue = 3000;
    if (profile.location === 'dhaka_ctg_nganj') minTaxValue = 5000;
    else if (profile.location === 'other_city') minTaxValue = 4000;

    if (totalTaxableIncome > exemptionLimit && netTax < minTaxValue) {
      netTax = minTaxValue;
    }

    const finalTaxPayable = netTax + surcharge - ait;

    setBreakdown(newBreakdown);
    setResult({
      total_income: (basic + houseRent + medical + conveyance + bonuses + overtime + otherSalaryIncome),
      taxable_income: totalTaxableIncome,
      tax_before_rebate: Math.round(totalTaxLiability),
      investment_rebate: Math.round(rebate),
      surcharge: Math.round(surcharge),
      ait: ait,
      tax_amount: Math.round(finalTaxPayable),
      effective_rate: totalTaxableIncome ? (finalTaxPayable / totalTaxableIncome) * 100 : 0
    });

    setLoading(false);
  };

  return (
    <div className="tool-card">
      <div className="card-header-simple">
        <h3><Calculator size={18} /> {t('account.calculator.title_2025')}</h3>
      </div>

      {/* TAXPAYER PROFILE */}
      <div className="content-card mb-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          👤 {t('account.calculator.taxpayer_profile_title')}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          <div className="form-group-modern">
            <label>{t('account.calculator.category_label')}</label>
            <select
              className="modern-input"
              value={profile.category}
              onChange={(e) => setProfile(prev => ({ ...prev, category: e.target.value }))}
            >
              <option value="general">{t('account.calculator.category_general')}</option>
              <option value="woman_senior">{t('account.calculator.category_woman_senior')}</option>
              <option value="disabled">{t('account.calculator.category_disabled')}</option>
              <option value="freedom_fighter">{t('account.calculator.category_freedom_fighter')}</option>
            </select>
          </div>
          <div className="form-group-modern">
            <label>{t('account.calculator.residential_location_label')}</label>
            <select
              className="modern-input"
              value={profile.location}
              onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
            >
              <option value="dhaka_ctg_nganj">{t('account.calculator.location_dhaka_ctg_nganj')}</option>
              <option value="other_city">{t('account.calculator.location_other_city')}</option>
              <option value="other_areas">{t('account.calculator.location_other_areas')}</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontWeight: '500' }}>
            <input
              type="checkbox"
              checked={profile.parentOfDisabledChild}
              onChange={(e) => setProfile(prev => ({ ...prev, parentOfDisabledChild: e.target.checked }))}
              style={{ width: '18px', height: '18px', cursor: 'pointer' }}
            />
            {t('account.calculator.parent_of_disabled_child_label')}
          </label>
        </div>
      </div>

      {/* SALARY & INCOME */}
      <div className="content-card mb-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          💼 {t('account.calculator.salary_income_title')}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <NumberInput
            label={t('account.calculator.basic_salary_label')}
            value={salaryIncome.basic}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, basic: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.house_rent_label')}
            value={salaryIncome.houseRent}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, houseRent: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.medical_allowance_label')}
            value={salaryIncome.medical}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, medical: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.conveyance_allowance_label')}
            value={salaryIncome.conveyance}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, conveyance: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.bonuses_label')}
            value={salaryIncome.bonuses}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, bonuses: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.overtime_label')}
            value={salaryIncome.overtime}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, overtime: v }))}
            suffix="৳"
          />
        </div>
        <div style={{ marginTop: '16px' }}>
          <NumberInput
            label={t('account.calculator.salary_other_income_label')}
            value={salaryIncome.other}
            onChange={(v) => setSalaryIncome(prev => ({ ...prev, other: v }))}
            suffix="৳"
          />
          <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.salary_other_income_hint')}</small>
        </div>
      </div>

      {/* INVESTMENT & REBATE */}
      <div className="content-card mb-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          📉 {t('account.calculator.investment_rebate_title')}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <NumberInput
            label={t('account.calculator.life_insurance_label')}
            value={investments.lifeInsurance}
            onChange={(v) => setInvestments(prev => ({ ...prev, lifeInsurance: v }))}
            suffix="৳"
          />
          <div>
            <NumberInput
              label={t('account.calculator.dps_label')}
              value={investments.dps}
              onChange={(v) => setInvestments(prev => ({ ...prev, dps: v }))}
              suffix="৳"
            />
            <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.dps_hint')}</small>
          </div>
          <div>
            <NumberInput
              label={t('account.calculator.sanchayapatra_label')}
              value={investments.sanchayapatra}
              onChange={(v) => setInvestments(prev => ({ ...prev, sanchayapatra: v }))}
              suffix="৳"
            />
            <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.sanchayapatra_hint')}</small>
          </div>
          <NumberInput
            label={t('account.calculator.provident_fund_label')}
            value={investments.providentFund}
            onChange={(v) => setInvestments(prev => ({ ...prev, providentFund: v }))}
            suffix="৳"
          />
          <NumberInput
            label={t('account.calculator.stocks_label')}
            value={investments.stocks}
            onChange={(v) => setInvestments(prev => ({ ...prev, stocks: v }))}
            suffix="৳"
          />
          <div>
            <NumberInput
              label={t('account.calculator.zakat_label')}
              value={investments.zakat}
              onChange={(v) => setInvestments(prev => ({ ...prev, zakat: v }))}
              suffix="৳"
            />
            <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.zakat_hint')}</small>
          </div>
        </div>
      </div>

      {/* OTHER ADJUSTMENTS */}
      <div className="content-card mb-4" style={{ background: 'var(--bg-surface)', border: '1px solid var(--border)' }}>
        <h4 style={{ fontSize: '0.9rem', marginBottom: '16px', color: 'var(--primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          ⚙️ {t('account.calculator.other_adjustments_title')}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <NumberInput
              label={t('account.calculator.net_wealth_label')}
              value={adjustments.netWealth}
              onChange={(v) => setAdjustments(prev => ({ ...prev, netWealth: v }))}
              suffix="৳"
            />
            <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.net_wealth_hint')}</small>
          </div>
          <div>
            <NumberInput
              label={t('account.calculator.ait_label')}
              value={adjustments.ait}
              onChange={(v) => setAdjustments(prev => ({ ...prev, ait: v }))}
              suffix="৳"
            />
            <small style={{ color: 'var(--text-muted)' }}>{t('account.calculator.ait_hint')}</small>
          </div>
        </div>
      </div>

      <button className="btn-primary" onClick={calculate} disabled={loading} style={{ width: '100%', padding: '16px', fontSize: '1.1rem' }}>
        {loading ? t('account.calculator.calculating') : t('account.calculator.calculate_btn')}
      </button>

      {result && (
        <div className="result-summary mt-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '16px' }}>
          <div className="summary-item">
            <span className="label">{t('account.calculator.gross_income')}</span>
            <span className="value">৳{formatNumber(result.total_income)}</span>
          </div>
          <div className="summary-item">
            <span className="label">{t('account.calculator.taxable_income')}</span>
            <span className="value">৳{formatNumber(result.taxable_income)}</span>
          </div>
          <div className="summary-item">
            <span className="label">{t('account.calculator.tax_before_rebate')}</span>
            <span className="value">৳{formatNumber(result.tax_before_rebate)}</span>
          </div>
          {result.investment_rebate > 0 && (
            <div className="summary-item highlight">
              <span className="label">{t('account.calculator.rebate_applied')}</span>
              <span className="value">-৳{formatNumber(result.investment_rebate)}</span>
            </div>
          )}
          {result.surcharge > 0 && (
            <div className="summary-item highlight" style={{ background: '#fef2f2', borderColor: '#fecaca' }}>
              <span className="label" style={{ color: '#991b1b' }}>Surcharge</span>
              <span className="value" style={{ color: '#991b1b' }}>+৳{formatNumber(result.surcharge)}</span>
            </div>
          )}
          {result.ait > 0 && (
            <div className="summary-item highlight">
              <span className="label">AIT Deducted</span>
              <span className="value">-৳{formatNumber(result.ait)}</span>
            </div>
          )}
          <div className="summary-item highlight" style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '20px' }}>
            <span className="label" style={{ fontSize: '1rem' }}>{t('account.calculator.net_tax_payable')}</span>
            <span className="value" style={{ fontSize: '1.8rem' }}>৳{formatNumber(result.tax_amount)}</span>
          </div>
        </div>
      )}

      {result && result.investment_rebate > 0 && (
        <div className="content-card mt-2" style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
          <p style={{ margin: 0, color: '#10b981', fontSize: '0.9rem' }}>
            🎉 {t('account.calculator.rebate_applied')}: <strong>৳{formatNumber(result.investment_rebate)}</strong>
          </p>
        </div>
      )}

      {breakdown.length > 0 && (
        <div className="content-card mt-2">
          <h4>{t('account.calculator.breakdown_title')}</h4>
          <div className="table-responsive">
            <table className="modern-table">
              <thead>
                <tr>
                  <th>{t('account.calculator.slab_header')}</th>
                  <th>{t('account.calculator.rate_header')}</th>
                  <th>{t('account.calculator.taxable_amount_header')}</th>
                  <th>{t('account.calculator.tax_header')}</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.map((row, idx) => (
                  <tr key={idx}>
                    {/* Translating slab descriptions nicely is hard, but mapping range is doable if consistent */}
                    <td>{row.range}</td>
                    <td>{formatInt(row.rate)}%</td>
                    <td>৳{formatNumber(row.portion)}</td>
                    <td>৳{formatNumber(Math.round(row.tax))}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-2">
        <a className="link-text" href="https://nbr.gov.bd/uploads/paripatra/Income-tax_Paripatra_2025-20261.pdf" target="_blank" rel="noreferrer">
          {t('account.calculator.nbr_link')}
        </a>
      </div>
    </div>
  );
};

const LoanEMICard = () => {
  const { t, i18n } = useTranslation();
  const [principal, setPrincipal] = useState(500000);
  const [rate, setRate] = useState(10);
  const [months, setMonths] = useState(60);

  const isBn = i18n.language === 'bn';
  const formatNumber = (num) => {
    if (!isFinite(num)) return '—';
    const n = num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return isBn ? toBanglaNumber(n) : n;
  };

  const r = rate / 12 / 100;
  const n = months;
  const emi = r === 0 ? principal / n : (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - principal;

  return (
    <div className="tool-card">
      <div className="card-header-simple">
        <h3><Calculator size={18} /> {t('calculators.loan.title')}</h3>
      </div>
      <NumberInput label={t('calculators.loan.principal')} value={principal} onChange={setPrincipal} />
      <NumberInput label={t('calculators.loan.rate')} value={rate} onChange={setRate} />
      <NumberInput label={t('calculators.loan.tenure')} value={months} onChange={setMonths} />
      <div className="result-summary mt-2">
        <div className="summary-item">
          <span className="label">{t('calculators.loan.monthly_emi')}</span>
          <span className="value">৳{formatNumber(emi)}</span>
        </div>
        <div className="summary-item">
          <span className="label">{t('calculators.loan.total_interest')}</span>
          <span className="value">৳{formatNumber(totalInterest)}</span>
        </div>
        <div className="summary-item">
          <span className="label">{t('calculators.loan.total_payment')}</span>
          <span className="value">৳{formatNumber(totalPayment)}</span>
        </div>
      </div>
    </div>
  );
};

const DocumentsCard = () => {
  const { t, i18n } = useTranslation();
  const [submissions, setSubmissions] = useState([]);
  const [payments, setPayments] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [subs, pays, docs] = await Promise.all([
          taxService.getSubmissions().catch(() => ({ submissions: [] })),
          paymentService.getPaymentHistory().catch(() => ({ payments: [] })),
          documentService.getDocuments().then((res) => res.data).catch(() => ({ documents: [] }))
        ]);
        setSubmissions(subs.submissions || []);
        setPayments(pays.payments || []);
        setDocuments(docs.documents || []);
      } catch (e) {
        console.error(e);
      }
    };
    load();
  }, []);

  const isBn = i18n.language === 'bn';
  const formatNumber = (num) => {
    const n = Number(num).toLocaleString();
    return isBn ? toBanglaNumber(n) : n;
  };
  const formatDate = (dateString) => {
    const d = new Date(dateString).toLocaleDateString();
    // Simple digit conversion for date
    return isBn ? toBanglaNumber(d) : d;
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const response = await documentService.uploadDocument(selectedFile);
      setDocuments([response.data.document, ...documents]);
      setSelectedFile(null);
      const el = document.getElementById('file-upload-input');
      if (el) el.value = '';
    } catch (error) {
      console.error('File upload failed:', error);
      alert('File upload failed. Please try again.');
    }
  };

  const handleDelete = async (documentId) => {
    if (!window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await documentService.deleteDocument(documentId);
      setDocuments(documents.filter((doc) => doc.id !== documentId));
    } catch (error) {
      console.error('Failed to delete document:', error);
      alert('Failed to delete document.');
    }
  };

  return (
    <div className="tool-card">
      <div className="card-header-simple">
        <h3><FileText size={18} /> {t('account.documents.title')}</h3>
      </div>
      <div className="content-card">
        <h4>Manage uploads</h4>
        <div className="upload-section" style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
          <input type="file" id="file-upload-input" onChange={handleFileChange} className="file-input" />
          <button className="btn-primary" onClick={handleUpload} disabled={!selectedFile}>
            Upload
          </button>
        </div>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>Filename</th>
                <th>{t('dashboard.date')}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id}>
                  <td>{doc.filename}</td>
                  <td>{formatDate(doc.uploaded_at)}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => documentService.downloadDocument(doc.id)}>
                      <Download size={16} />
                    </button>
                    <button className="btn-danger" onClick={() => handleDelete(doc.id)} style={{ marginLeft: '8px' }}>
                      &#10005;
                    </button>
                  </td>
                </tr>
              ))}
              {documents.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center' }}>No uploads</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
      <div className="content-card">
        <h4>{t('account.documents.submissions_title')}</h4>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>{t('dashboard.date')}</th>
                <th>{t('dashboard.amount')}</th>
                <th>{t('dashboard.status')}</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr key={s.id}>
                  <td>{formatDate(s.submitted_at)}</td>
                  <td>৳{formatNumber(s.tax_amount)}</td>
                  <td><span className={`status-badge ${String(s.status).toLowerCase()}`}>{s.status}</span></td>
                </tr>
              ))}
              {submissions.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center' }}>{t('account.documents.no_submissions')}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      <div className="content-card mt-2">
        <h4>{t('account.documents.payments_title')}</h4>
        <div className="table-responsive">
          <table className="modern-table">
            <thead>
              <tr>
                <th>{t('dashboard.date')}</th>
                <th>{t('dashboard.amount')}</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id}>
                  <td>{formatDate(p.paid_at)}</td>
                  <td>৳{formatNumber(p.amount)}</td>
                  <td>
                    <button className="btn-secondary" onClick={() => paymentService.downloadReceipt(p.id)}>
                      <Download size={16} /> {t('account.documents.receipt_btn')}
                    </button>
                  </td>
                </tr>
              ))}
              {payments.length === 0 && <tr><td colSpan={3} style={{ textAlign: 'center' }}>{t('account.documents.no_payments')}</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const Account = () => {
  const { t } = useTranslation();
  const [tab, setTab] = useState('tools');
  const [activeCalc, setActiveCalc] = useState('tax');

  return (
    <div className="account-container">
      <div className="page-header">
        <h1>{t('account.title')}</h1>
        <p>{t('account.subtitle')}</p>
      </div>

      <div className="tabs">
        <button className={`tab-btn ${tab === 'tools' ? 'active' : ''}`} onClick={() => setTab('tools')}>{t('account.tabs.calculators')}</button>
        <button className={`tab-btn ${tab === 'guide' ? 'active' : ''}`} onClick={() => setTab('guide')}>{t('account.tabs.guide')}</button>
        <button className={`tab-btn ${tab === 'docs' ? 'active' : ''}`} onClick={() => setTab('docs')}>{t('account.tabs.documents')}</button>
        <button className={`tab-btn ${tab === 'feedback' ? 'active' : ''}`} onClick={() => setTab('feedback')}>{t('account.tabs.feedback')}</button>
      </div>

      {tab === 'tools' && (
        <div>
          <div className="form-group-modern" style={{ maxWidth: '320px' }}>
            <label>{t('account.calculator.select_label')}</label>
            <div className="input-wrapper">
              <select className="modern-input" value={activeCalc} onChange={(e) => setActiveCalc(e.target.value)}>
                <option value="tax">{t('account.calculator.tax_calculator')}</option>
                <option value="loan">{t('calculators.loan.title')}</option>
                <option value="fdr">{t('calculators.fdr.title')}</option>
                <option value="sanchayapatra">{t('calculators.sanchayapatra.title')}</option>
              </select>
            </div>
          </div>

          <div className="content-grid" style={{ gridTemplateColumns: '1fr' }}>
            {activeCalc === 'tax' && <TaxCalculatorCard />}
            {activeCalc === 'loan' && <LoanEMICard />}
            {activeCalc === 'fdr' && <FDRCalculator />}
            {activeCalc === 'sanchayapatra' && <SanchayapatraCalculator />}
          </div>
        </div>
      )}

      {tab === 'guide' && <TaxGuide2025 />}
      {tab === 'docs' && <DocumentsCard />}
      {tab === 'feedback' && <FeedbackForm />}
    </div>
  );
};

export default Account;