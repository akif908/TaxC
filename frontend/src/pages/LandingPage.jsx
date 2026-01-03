import { Link } from 'react-router-dom';
import { useState } from 'react';
import LandingHeader from '../components/LandingHeader';
import LandingFooter from '../components/LandingFooter';
import { useTranslation } from 'react-i18next';

const LandingPage = () => {
    const { t } = useTranslation();
    const [openFaq, setOpenFaq] = useState('eligibility');

    const stats = [
        { label: t('landing.stats.active_filers'), value: '12K+', detail: t('landing.stats.active_filers_detail') },
        { label: t('landing.stats.processing'), value: '2m 14s', detail: t('landing.stats.processing_detail') },
        { label: t('landing.stats.success'), value: '99.4%', detail: t('landing.stats.success_detail') },
    ];

    const featureCards = [
        { icon: '🧮', title: t('landing.features.cards.1.title'), copy: t('landing.features.cards.1.copy') },
        { icon: '🗂️', title: t('landing.features.cards.2.title'), copy: t('landing.features.cards.2.copy') },
        { icon: '🤖', title: t('landing.features.cards.3.title'), copy: t('landing.features.cards.3.copy') },
        { icon: '🧾', title: t('landing.features.cards.4.title'), copy: t('landing.features.cards.4.copy') },
    ];

    const workflow = [
        { step: '01', title: t('landing.workflow.steps.1.title'), detail: t('landing.workflow.steps.1.detail') },
        { step: '02', title: t('landing.workflow.steps.2.title'), detail: t('landing.workflow.steps.2.detail') },
        { step: '03', title: t('landing.workflow.steps.3.title'), detail: t('landing.workflow.steps.3.detail') },
        { step: '04', title: t('landing.workflow.steps.4.title'), detail: t('landing.workflow.steps.4.detail') },
    ];

    const benefits = [
        { title: t('landing.benefits.1.title'), detail: t('landing.benefits.1.detail') },
        { title: t('landing.benefits.2.title'), detail: t('landing.benefits.2.detail') },
        { title: t('landing.benefits.3.title'), detail: t('landing.benefits.3.detail') },
    ];

    const faqs = [
        { id: 'eligibility', question: t('landing.faq.items.eligibility.q'), answer: t('landing.faq.items.eligibility.a') },
        { id: 'security', question: t('landing.faq.items.security.q'), answer: t('landing.faq.items.security.a') },
        { id: 'pricing', question: t('landing.faq.items.pricing.q'), answer: t('landing.faq.items.pricing.a') },
        { id: 'support', question: t('landing.faq.items.support.q'), answer: t('landing.faq.items.support.a') },
    ];

    return (
        <>
            <LandingHeader />
            <div className="landing-modern">
                <section className="lp-hero" id="hero">
                    <div className="hero-inner">
                        <div className="hero-text">
                            <p className="eyebrow">{t('landing.hero.eyebrow')}</p>
                            <h1>{t('landing.hero.title')}</h1>
                            <p className="supporting">{t('landing.hero.subtitle')}</p>
                            <div className="cta-row">
                                <Link to="/register"><button className="btn btn-primary">{t('landing.hero.get_started')}</button></Link>
                                <Link to="/login"><button className="btn btn-ghost">{t('landing.hero.have_account')}</button></Link>
                            </div>
                            <div className="badge-row">
                                <span>{t('landing.hero.badges.iso')}</span>
                                <span>{t('landing.hero.badges.gdpr')}</span>
                                <span>{t('landing.hero.badges.ledger')}</span>
                            </div>
                        </div>
                        <div className="hero-panel">
                            <div className="panel-header">
                                <p>{t('landing.hero.panel.filing_year')}</p>
                                <strong>{t('landing.hero.panel.due_in')}</strong>
                            </div>
                            <div className="panel-body">
                                <div>
                                    <p>{t('landing.hero.panel.est_dues')}</p>
                                    <h2>৳12,500</h2>
                                </div>
                                <div>
                                    <p>{t('landing.hero.panel.savings')}</p>
                                    <h3 className="positive">৳1,500</h3>
                                </div>
                                <div className="progress">
                                    <span>{t('landing.hero.panel.documentation')}</span>
                                    <div className="track"><div className="fill" /></div>
                                </div>
                                <Link to="/register">
                                    <button className="panel-btn">{t('landing.hero.panel.review_submit')}</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="stats-grid">
                        {stats.map(stat => (
                            <div key={stat.label} className="stat-card">
                                <p className="stat-label">{stat.label}</p>
                                <p className="stat-value">{stat.value}</p>
                                <p className="stat-detail">{stat.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="lp-feature-cluster" id="features">
                    <div className="section-heading">
                        <p className="eyebrow">{t('landing.features.eyebrow')}</p>
                        <h2>{t('landing.features.title')}</h2>
                        
                    </div>
                    <div className="feature-grid">
                        {featureCards.map(card => (
                            <article key={card.title} className="feature-tile">
                                <span className="tile-icon">{card.icon}</span>
                                <h3>{card.title}</h3>
                                <p>{card.copy}</p>
                            </article>
                        ))}
                    </div>
                </section>

                <section className="lp-benefits" id="about">
                    <div className="benefit-container">
                        <div className="benefit-content">
                            {benefits.map(item => (
                                <div key={item.title} className="benefit-item">
                                    <h3>{item.title}</h3>
                                    <p>{item.detail}</p>
                                </div>
                            ))}
                        </div>
                        <div className="benefit-visual">
                            {/* Visual element or illustration */}
                            <div className="visual-glow" />
                        </div>
                    </div>
                </section>

                <section className="lp-workflow">
                    <div className="section-heading">
                        <p className="eyebrow">{t('landing.workflow.eyebrow')}</p>
                        <h2>{t('landing.workflow.title')}</h2>
                    </div>
                    <div className="workflow-track">
                        {workflow.map(item => (
                            <div key={item.step} className="workflow-card">
                                <span>{item.step}</span>
                                <h3>{item.title}</h3>
                                <p>{item.detail}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="lp-faq" id="faq">
                    <div className="container faq-container">
                        <div className="faq-intro">
                            <p className="eyebrow">{t('landing.faq.eyebrow')}</p>
                            <h2>{t('landing.faq.title')}</h2>
                            <p>{t('landing.faq.subtitle')}</p>
                            <Link to="/contact" className="contact-link">{t('landing.faq.contact')}</Link>
                        </div>
                        <div className="faq-list">
                            {faqs.map(item => (
                                <div
                                    key={item.id}
                                    className={`faq-item ${openFaq === item.id ? 'open' : ''}`}
                                    onClick={() => setOpenFaq(prev => (prev === item.id ? '' : item.id))}
                                >
                                    <div className="faq-question">
                                        <h3>{item.question}</h3>
                                        <span className="faq-toggle">{openFaq === item.id ? '−' : '+'}</span>
                                    </div>
                                    <div className="faq-answer-wrapper">
                                        <p className="faq-answer">{item.answer}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="lp-cta">
                    <div className="cta-card">
                        <h2>{t('landing.cta.title')}</h2>
                        <p>{t('landing.cta.subtitle')}</p>
                        <div className="cta-actions">
                            <Link to="/register"><button className="btn btn-primary">{t('landing.cta.btn_primary')}</button></Link>
                            <Link to="/login"><button className="btn btn-ghost">{t('landing.cta.btn_secondary')}</button></Link>
                        </div>
                    </div>
                </section>
            </div>
            <LandingFooter />
        </>
    );
};

export default LandingPage;
