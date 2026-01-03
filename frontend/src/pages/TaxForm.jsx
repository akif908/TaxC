import React, { useState, useEffect } from 'react';
import { FileText, Calculator, Send, AlertCircle, CheckCircle, Info, Table, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toBanglaNumber } from '../utils/bnUtils';

const TaxForm = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const [income, setIncome] = useState('');
    const [taxResult, setTaxResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [taxSlabs, setTaxSlabs] = useState([]);

    const isBn = i18n.language === 'bn';
    const formatNumber = (num) => {
        const n = parseFloat(num).toLocaleString();
        return isBn ? toBanglaNumber(n) : n;
    };
    const formatRate = (rate) => {
        return isBn ? toBanglaNumber(rate) : rate;
    };

    useEffect(() => {
        fetchTaxSlabs();
    }, []);

    const fetchTaxSlabs = async () => {
        try {
            const response = await api.get('/tax/slabs');
            setTaxSlabs(response.data.slabs || []);
        } catch (error) {
            console.error("Failed to fetch tax slabs:", error);
        }
    };

    const handleCalculate = async (e) => {
        e.preventDefault();
        setMessage(null);

        if (!income || isNaN(income) || income < 0) {
            setMessage({ type: 'error', text: t('tax_form.messages.enter_income') });
            return;
        }

        setLoading(true);

        try {
            const response = await api.post('/tax/calculate', {
                annual_income: parseFloat(income)
            });

            setTaxResult(response.data);
            setMessage(null);
        } catch (error) {
            console.error("Calculation Error:", error);
            const errorMsg = error.response?.data?.error || t('tax_form.messages.calc_failed');
            setMessage({ type: 'error', text: errorMsg });

            if (error.response?.status === 401) {
                setTimeout(() => navigate('/login'), 2000);
            }
        } finally {
            setLoading(false);
        }
    };

    const handleSubmitReturn = async () => {
        if (!taxResult) {
            setMessage({ type: 'error', text: t('tax_form.messages.calc_first') });
            return;
        }

        setLoading(true);
        try {
            await api.post('/tax/submit', {
                total_income: parseFloat(income),
                income_details: { source: 'salary', amount: parseFloat(income) }
            });

            setMessage({ type: 'success', text: t('tax_form.messages.success') });

            setTimeout(() => {
                navigate('/payment');
            }, 1500);

            setIncome('');
            setTaxResult(null);
        } catch (error) {
            console.error("Submission Error:", error);
            const errorMsg = error.response?.data?.error || t('tax_form.messages.submit_failed');
            setMessage({ type: 'error', text: errorMsg });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[var(--border)] pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-[var(--primary)] flex items-center gap-2">
                        <FileText className="w-8 h-8 text-[var(--accent)]" />
                        {t('tax_form.title')}
                    </h1>
                    <p className="text-[var(--text-muted)] mt-2">{t('tax_form.subtitle')} ({t('tax_form.fiscal_year')})</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-[var(--bg-muted)] rounded-full text-sm font-medium text-[var(--text-muted)]">
                    <ShieldCheck className="w-4 h-4 text-[var(--success)]" />
                    {t('tax_form.official_calc')}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Input and Tax Slabs Info (5 cols) */}
                <div className="lg:col-span-5 space-y-6">
                    {/* Input Section */}
                    <div className="card shadow-xl border border-white/10 relative overflow-hidden group" style={{ background: 'rgba(10, 25, 47, 0.7)', backdropFilter: 'blur(10px)' }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        
                        <div className="card-header bg-white/5 border-b border-white/10 p-5">
                            <h2 className="flex items-center gap-3 text-white text-xl font-bold m-0">
                                <div className="p-2 bg-blue-500/20 rounded-lg">
                                    <Calculator className="w-5 h-5 text-blue-400" />
                                </div>
                                {t('tax_form.income_details')}
                            </h2>
                        </div>

                        <form onSubmit={handleCalculate} className="space-y-6 p-6 relative z-10">
                            <div className="form-group">
                                <label className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-3 block">
                                    {t('tax_form.annual_income_label')}
                                </label>
                                <div className="relative group/input">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <span className="text-blue-400 font-bold text-xl">৳</span>
                                    </div>
                                    <input
                                        type="number"
                                        value={income}
                                        onChange={(e) => setIncome(e.target.value)}
                                        className="pl-12 h-14 text-xl font-semibold border-2 border-white/10 focus:border-blue-500/50 rounded-xl w-full transition-all bg-white/5 text-white placeholder:text-gray-600 focus:bg-white/10 focus:ring-4 focus:ring-blue-500/10 outline-none"
                                        placeholder="0.00"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-3 flex items-center gap-2 italic">
                                    <Info className="w-3.5 h-3.5 text-blue-400/50" />
                                    {t('tax_form.helper_text')}
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full h-14 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 transition-all transform hover:-translate-y-0.5 active:scale-[0.98] flex items-center justify-center gap-3 border border-white/10"
                            >
                                {loading ? (
                                    <span className="loading loading-spinner loading-md"></span>
                                ) : (
                                    <>
                                        <Calculator className="w-6 h-6" />
                                        {t('tax_form.calculate_btn')}
                                    </>
                                )}
                            </button>
                        </form>

                        {message && (
                            <div className={`mx-6 mb-6 p-4 rounded-xl flex items-start gap-4 animate-in fade-in slide-in-from-top-2 duration-300 border ${message.type === 'success'
                                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                                : 'bg-red-500/10 text-red-400 border-red-500/20'
                                }`}>
                                {message.type === 'success' ? (
                                    <div className="p-1 bg-emerald-500/20 rounded-full">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                ) : (
                                    <div className="p-1 bg-red-500/20 rounded-full">
                                        <AlertCircle className="w-5 h-5" />
                                    </div>
                                )}
                                <span className="font-semibold text-sm pt-0.5">{message.text}</span>
                            </div>
                        )}
                    </div>

                    {/* Tax Slabs Reference Card */}
                    {taxSlabs.length > 0 && (
                        <div className="card border border-white/5 overflow-hidden shadow-2xl" style={{ background: 'rgba(10, 25, 47, 0.4)', backdropFilter: 'blur(10px)' }}>
                            <div className="p-4 border-b border-white/10 bg-white/5 flex items-center justify-between">
                                <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
                                    <Table className="w-4 h-4" />
                                    {t('tax_form.tax_rules_title')}
                                </h3>
                                <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-400 rounded-md border border-blue-500/20 font-bold">FY 2024-25</span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead className="bg-white/5 text-gray-400">
                                        <tr>
                                            <th className="px-5 py-4 text-left font-bold uppercase tracking-tighter text-[10px]">{t('tax_form.income_range')}</th>
                                            <th className="px-5 py-4 text-right font-bold uppercase tracking-tighter text-[10px]">{t('tax_form.rate')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {taxSlabs.map((slab) => (
                                            <tr key={slab.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-5 py-4 text-gray-300 font-medium">
                                                    {slab.max_income
                                                        ? <div className="flex items-center gap-2">
                                                            <span className="text-blue-400 font-bold">৳</span>
                                                            <span>{formatNumber(slab.min_income)}</span>
                                                            <span className="text-gray-600">—</span>
                                                            <span>{formatNumber(slab.max_income)}</span>
                                                          </div>
                                                        : <div className="flex items-center gap-2">
                                                            <span className="text-gray-500">{t('tax_form.above')}</span>
                                                            <span className="text-blue-400 font-bold">৳</span>
                                                            <span>{formatNumber(slab.min_income)}</span>
                                                          </div>
                                                    }
                                                </td>
                                                <td className="px-5 py-4 text-right">
                                                    <span className="px-2 py-1 bg-blue-500/10 text-blue-400 rounded-lg font-black text-xs border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                                        {formatRate(slab.tax_rate)}%
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column: Statement Result (7 cols) */}
                <div className="lg:col-span-7 h-full">
                    {taxResult ? (
                        <div className="card h-full animate-fade-in border-0 shadow-2xl overflow-hidden flex flex-col" style={{ background: 'var(--card-bg)' }}>
                            {/* Statement Header */}
                            <div className="text-white p-8" style={{ background: 'rgba(255, 255, 255, 0.03)', borderBottom: '1px solid var(--border-color)' }}>
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            <FileText className="w-6 h-6 text-emerald-400" />
                                            {t('tax_form.calc_result')}
                                        </h2>
                                        <p className="text-gray-400 text-sm mt-1">Ref: TX-{Math.floor(Math.random() * 1000000)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-400 text-sm">{t('tax_form.fiscal_year').split(' ')[0]}</p>
                                        <p className="text-xl font-bold text-white">{t('tax_form.fiscal_year').split(' ')[1]}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-8 mt-6 pt-6 border-t border-[var(--border-color)]">
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">{t('tax_form.total_taxable_income')}</p>
                                        <p className="text-2xl font-bold text-white">৳{formatNumber(income)}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-emerald-400 text-sm mb-1 font-semibold uppercase tracking-wide">{t('tax_form.net_tax_payable')}</p>
                                        <p className="text-4xl font-bold text-white tracking-tight">৳{formatNumber(taxResult.tax_amount)}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Statement Body */}
                            <div className="flex-1 p-8" style={{ background: 'var(--card-bg)' }}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="font-bold text-white text-lg">{t('tax_form.calc_breakdown')}</h3>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm font-medium border border-blue-500/20">
                                        {t('tax_form.effective_rate')}: {formatRate(taxResult.effective_rate.toFixed(2))}%
                                    </span>
                                </div>

                                <div className="border border-[var(--border-color)] rounded-lg overflow-hidden mb-8">
                                    <table className="w-full">
                                        <thead className="bg-white/5 border-b border-[var(--border-color)]">
                                            <tr>
                                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('tax_form.slab_range')}</th>
                                                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('tax_form.rate')}</th>
                                                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">{t('tax_form.tax_amount')}</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-[var(--border-color)]">
                                            {taxResult.breakdown.map((slab, index) => (
                                                <tr key={index} className="hover:bg-white/5 transition-colors">
                                                    <td className="py-3 px-4 text-sm font-medium text-white">
                                                        {slab.slab}
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-center text-gray-400">
                                                        {formatRate(slab.rate)}%
                                                    </td>
                                                    <td className="py-3 px-4 text-sm text-right font-mono text-white">
                                                        ৳{formatNumber(slab.tax)}
                                                    </td>
                                                </tr>
                                            ))}
                                            <tr className="bg-white/5 font-bold border-t-2 border-[var(--border-color)]">
                                                <td className="py-4 px-4 text-white" colSpan="2">{t('tax_form.total_tax_liability')}</td>
                                                <td className="py-4 px-4 text-right text-emerald-400 text-lg">
                                                    ৳{formatNumber(taxResult.tax_amount)}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>

                                <div className="flex gap-4">
                                    <button
                                        className="flex-1 h-14 text-lg font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl flex items-center justify-center"
                                        onClick={handleSubmitReturn}
                                        disabled={loading}
                                    >
                                        <Send className="w-5 h-5 mr-2" />
                                        {t('tax_form.submit_btn')}
                                    </button>
                                </div>
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    {t('tax_form.disclaimer')}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="card h-full flex flex-col items-center justify-center p-12 text-center border-dashed border-2 border-[var(--border-color)] bg-white/5">
                            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
                                <Calculator className="w-10 h-10 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-2">{t('tax_form.ready_title')}</h3>
                            <p className="text-gray-400 max-w-md mx-auto mb-8">
                                {t('tax_form.ready_desc')}
                            </p>
                            <div className="flex gap-2 text-sm text-gray-500">
                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t('common.secure')}</span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t('common.accurate')}</span>
                                <span className="mx-2">•</span>
                                <span className="flex items-center gap-1"><CheckCircle className="w-4 h-4" /> {t('common.instant')}</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TaxForm;
