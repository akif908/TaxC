import React, { useState, useEffect } from 'react';
import { CreditCard, CheckCircle, Search, AlertCircle, X, Download, ShieldCheck } from 'lucide-react';
import api from '../services/api';
import { useTranslation } from 'react-i18next';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { toBanglaNumber } from '../utils/bnUtils';
import './Payment.css';

const Payment = () => {
    const { t, i18n } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [pendingSubmission, setPendingSubmission] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    const isBn = i18n.language === 'bn';
    const formatNumber = (num) => {
        const n = parseFloat(num).toLocaleString();
        return isBn ? toBanglaNumber(n) : n;
    };
    const formatDate = (dateString) => {
        const d = new Date(dateString).toLocaleDateString();
        return isBn ? toBanglaNumber(d) : d;
    };


    const paymentMethods = [
        { id: 'bkash', name: 'bKash', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766151485701.png?width=8000&height=8000&resize=contain' },
        { id: 'nagad', name: 'Nagad', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766151508055.png?width=8000&height=8000&resize=contain' },
        { id: 'brac_bank', name: 'BRAC Bank', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766151447882.png?width=8000&height=8000&resize=contain' },
        { id: 'city_bank', name: 'City Bank', logo: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/render/image/public/document-uploads/image-1766151469890.png?width=8000&height=8000&resize=contain' }
    ];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [historyRes, submissionsRes] = await Promise.all([
                api.get('/payment/history'),
                api.get('/tax/submissions')
            ]);
            setTransactions(historyRes.data.payments || []);
            const pending = submissionsRes.data.submissions.find(s => s.status === 'pending');
            setPendingSubmission(pending || null);
        } catch (error) {
            console.error("Error fetching data:", error);
        } finally {
            setLoading(false);
        }
    };

    const handlePayment = async (e) => {
        e.preventDefault();
        if (!pendingSubmission || !paymentMethod) return;

        setLoading(true);
        setMessage(null);

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            await api.post('/payment/process', {
                submission_id: pendingSubmission.id,
                payment_method: paymentMethod
            });
            setMessage({ type: 'success', text: t('payment.success') });
            setPendingSubmission(null);
            setShowPaymentModal(false);
            setPaymentMethod('');
            fetchData();
        } catch (error) {
            console.error("Payment Error:", error);
            setMessage({ type: 'error', text: t('payment.failed') });
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = (tx) => {
        const doc = new jsPDF();

        // Header
        doc.setFillColor(15, 23, 42); // bg-slate-900
        doc.rect(0, 0, 210, 40, 'F');
        doc.setTextColor(255, 255, 255);
        doc.setFontSize(22);
        doc.text('Tax Payment Receipt', 105, 25, { align: 'center' });

        // Info
        doc.setTextColor(0, 0, 0);
        doc.setFontSize(12);
        doc.text(`Transaction ID: ${tx.transaction_id}`, 14, 55);
        doc.text(`Date: ${new Date(tx.paid_at).toLocaleDateString()}`, 14, 62);
        doc.text(`Payment Method: ${tx.payment_method?.toUpperCase() || 'ONLINE'}`, 14, 69);

        // Amount
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        doc.text(`Amount Paid: ${parseFloat(tx.amount).toLocaleString()} BDT`, 14, 85);

        // Footer
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        doc.text('This is a computer-generated receipt.', 105, 280, { align: 'center' });

        doc.save(`Tax_Receipt_${tx.transaction_id}.pdf`);
    };

    const filteredTransactions = transactions.filter(tx =>
        tx.transaction_id && tx.transaction_id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="payment-container">
            <header className="payment-header">
                <h1>
                    <CreditCard className="w-8 h-8 text-blue-500" />
                    {t('payment.title')}
                </h1>
                <p>{t('payment.subtitle')}</p>
            </header>

            {/* Pending Payment Alert */}
            {pendingSubmission && !loading && (
                <div className="pending-payment-alert animate-fade-in">
                    <div className="alert-info flex gap-5 items-center">
                        <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                            <AlertCircle className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-white">{t('payment.due_title')}</h2>
                            <p className="text-slate-400 text-sm">{t('payment.fy_return')}</p>
                        </div>
                    </div>

                    <div className="alert-amount flex items-center gap-6">
                        <div className="text-right">
                            <p className="text-xs text-slate-400 uppercase font-semibold">{t('payment.total_payable')}</p>
                            <p className="text-2xl font-bold text-white">৳{formatNumber(pendingSubmission.tax_amount)}</p>
                        </div>
                        <button
                            onClick={() => setShowPaymentModal(true)}
                            className="btn-primary flex items-center gap-2"
                        >
                            {t('payment.pay_now')}
                            <ShieldCheck className="w-4 h-4 opacity-80" />
                        </button>
                    </div>
                </div>
            )}

            {!pendingSubmission && !loading && (
                <div className="no-pending-card animate-fade-in">
                    <div className="icon-wrap">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h2>{t('payment.no_pending')}</h2>
                    <p>{t('payment.no_pending_desc')}</p>
                </div>
            )}

            {/* Transaction History */}
            <div className="history-section">
                <div className="history-header">
                    <h2>{t('payment.history_title')}</h2>
                    <div className="search-wrap">
                        <Search className="w-4 h-4" />
                        <input
                            type="text"
                            placeholder={t('payment.receipt_id') + '...'}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className="table-container shadow-2xl">
                    <table className="modern-table">
                        <thead>
                            <tr>
                                <th>{t('payment.receipt_id')}</th>
                                <th>{t('payment.date')}</th>
                                <th>{t('payment.method')}</th>
                                <th>{t('payment.status')}</th>
                                <th style={{ textAlign: 'right' }}>{t('payment.amount')}</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredTransactions.map((tx) => (
                                <tr key={tx.id}>
                                    <td className="font-mono text-sm">{tx.transaction_id}</td>
                                    <td>{formatDate(tx.paid_at)}</td>
                                    <td className="capitalize">{tx.payment_method || 'Online'}</td>
                                    <td>
                                        <span className="status-badge paid">
                                            {tx.status}
                                        </span>
                                    </td>
                                    <td className="amount-cell" style={{ textAlign: 'right' }}>
                                        ৳{formatNumber(tx.amount)}
                                    </td>
                                    <td style={{ textAlign: 'right' }}>
                                        <button
                                            onClick={() => handleDownloadPDF(tx)}
                                            className="p-2 text-slate-500 hover:text-blue-500 transition-colors"
                                            title="Download Receipt"
                                        >
                                            <Download className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {filteredTransactions.length === 0 && (
                                <tr>
                                    <td colSpan="6" className="text-center py-12 text-slate-500">
                                        {t('payment.no_history')}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && pendingSubmission && (
                <div className="modal-overlay animate-fade-in">
                    <div className="modal-content animate-slide-up">
                        <div className="modal-header">
                            <h3 className="text-lg font-semibold text-white">{t('payment.select_method')}</h3>
                            <button onClick={() => setShowPaymentModal(false)} className="p-1.5 hover:bg-slate-800 rounded-md transition-colors">
                                <X className="w-5 h-5 text-slate-400" />
                            </button>
                        </div>

                        <div className="modal-body">
                            <div className="summary-card">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-slate-400">{t('payment.total_payable')}</span>
                                    <span className="text-xl font-bold text-white">৳{formatNumber(pendingSubmission.tax_amount)}</span>
                                </div>
                            </div>

                            <p className="text-xs font-semibold text-slate-500 mb-4 uppercase tracking-wider">
                                {t('payment.select_method')}
                            </p>
                            
                            <div className="payment-grid">
                                {paymentMethods.map((method) => (
                                    <div
                                        key={method.id}
                                        onClick={() => setPaymentMethod(method.id)}
                                        className={`payment-card ${paymentMethod === method.id ? 'selected' : ''}`}
                                    >
                                        <div className="logo-wrap">
                                            {method.logo ? (
                                                <img src={method.logo} alt={method.name} />
                                            ) : (
                                                <CreditCard className={`w-8 h-8 ${paymentMethod === method.id ? 'text-blue-500' : 'text-slate-400'}`} />
                                            )}
                                        </div>
                                        <span className="name">{method.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button
                                onClick={() => setShowPaymentModal(false)}
                                className="btn-secondary"
                            >
                                {t('payment.cancel')}
                            </button>
                            <button
                                onClick={handlePayment}
                                disabled={!paymentMethod || loading}
                                className="btn-primary"
                            >
                                {loading ? t('payment.processing') : t('payment.confirm_pay')}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {message && message.text && !showPaymentModal && (
                <div className="fixed bottom-6 right-6 z-50">
                    <div className={`p-4 rounded-xl shadow-2xl flex items-center gap-3 text-white ${
                        message.type === 'success' ? 'bg-emerald-600' : 'bg-red-600'
                    }`}>
                        {message.type === 'success' ? <CheckCircle className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
                        <span className="font-semibold">{message.text}</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Payment;
