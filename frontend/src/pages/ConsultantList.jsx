import { useState, useEffect } from 'react';
import { Search, MapPin, Award, Clock, ArrowRight, Star, Filter } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import consultantService from '../services/consultantService';
import RequestConsultationModal from './RequestConsultationModal';
import './ConsultantDashboard.css'; // Reusing some base styles

const ConsultantList = () => {
    const { t } = useTranslation();
    const [consultants, setConsultants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedConsultant, setSelectedConsultant] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchConsultants();
    }, []);

    const fetchConsultants = async () => {
        try {
            setLoading(true);
            const data = await consultantService.listConsultants();
            setConsultants(data.consultants);
        } catch (error) {
            console.error('Failed to fetch consultants:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredConsultants = consultants.filter(c =>
        c.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.qualification?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.bio?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRequest = (consultant) => {
        setSelectedConsultant(consultant);
        setIsModalOpen(true);
    };

    if (loading) {
        return <div className="loading-spinner-container"><div className="loading-spinner"></div></div>;
    }

    return (
        <div className="consultant-dashboard">
            <header className="dashboard-header">
                <div>
                    <h1>{t('consultant.list.title')} 🎓</h1>
                    <p>{t('consultant.list.subtitle')}</p>
                </div>
            </header>

            <div className="list-controls-bar">
                <div className="search-box-wrapper">
                    <Search className="search-icon" size={20} />
                    <input
                        type="text"
                        placeholder={t('consultant.list.search_placeholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="search-input"
                    />
                </div>
                <div className="filter-tags">
                    <span className="filter-tag active">{t('consultant.list.available_now')}</span>
                    <span className="filter-tag"><Filter size={14} /> {t('consultant.list.more_filters')}</span>
                </div>
            </div>

            <div className="consultants-grid">
                {filteredConsultants.length === 0 ? (
                    <div className="no-results-msg">
                        <p>{t('consultant.list.no_consultants')}</p>
                    </div>
                ) : (
                    filteredConsultants.map((c) => (
                        <div key={c.id} className="consultant-card-premium">
                            <div className="card-top">
                                <div className="consultant-avatar-lg">
                                    {c.full_name?.charAt(0) || 'C'}
                                </div>
                                <div className="consultant-badges">
                                    {c.is_available && <span className="badge-available">{t('consultant.list.available_now')}</span>}
                                    <span className="badge-verified"><Star size={12} fill="currentColor" /> {t('consultant.list.verified')}</span>
                                </div>
                            </div>

                            <div className="card-body">
                                <h3>{c.full_name}</h3>
                                <div className="qual-tags">
                                    <span className="qual-tag"><Award size={12} /> {c.qualification}</span>
                                </div>
                                <p className="consultant-bio-preview">
                                    {c.bio?.substring(0, 120)}...
                                </p>

                                <div className="consultant-stats-mini">
                                    <div className="mini-stat">
                                        <Clock size={14} />
                                        <span>{c.experience}</span>
                                    </div>
                                    <div className="mini-stat">
                                        <MapPin size={14} />
                                        <span>{t('consultant.list.location')}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="card-footer">
                                <button className="secondary-btn-outline">{t('consultant.list.view_profile')}</button>
                                <button
                                    className="primary-btn-sm"
                                    onClick={() => handleRequest(c)}
                                >
                                    {t('consultant.list.request_btn')} <ArrowRight size={14} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {selectedConsultant && (
                <RequestConsultationModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    consultant={selectedConsultant}
                />
            )}
        </div>
    );
};

export default ConsultantList;
