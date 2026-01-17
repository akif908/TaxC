import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Logo from './Logo';
import './LandingFooter.css';

const LandingFooter = () => {
    const { t } = useTranslation();

    return (
        <footer className="landing-footer">
            <div className="landing-footer__grid container">
                <div className="footer-col brand-col">
                    <div className="footer-brand">
                        <Logo size="md" />
                        <p style={{ marginTop: '1rem', color: '#94a3b8', fontSize: '0.875rem', lineHeight: '1.6' }}>
                            {t('landing.footer.brand_desc')}
                        </p>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>{t('landing.footer.quick_links')}</h4>
                    <ul className="footer-list">
                        <li><a href="#features">{t('landing.footer.features')}</a></li>
                        <li><a href="#about">{t('landing.footer.about')}</a></li>
                        <li><Link to="/login">{t('landing.footer.login')}</Link></li>
                        <li><Link to="/register">{t('landing.hero.get_started')}</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t('landing.footer.support')}</h4>
                    <ul className="footer-list">
                        <li><a href="#faq">{t('landing.faq.title')}</a></li>
                        <li><a href="#support">{t('landing.footer.help_center')}</a></li>
                        <li><a href="#contact">{t('landing.footer.contact_nbr')}</a></li>
                        <li><a href="#status">{t('landing.footer.status')}</a></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>{t('landing.footer.terms') || 'Legal'}</h4>
                    <ul className="footer-list">
                        <li><a href="#privacy">{t('landing.footer.privacy')}</a></li>
                        <li><a href="#terms">{t('landing.footer.terms')}</a></li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container footer-bottom-inner">
                    <p>{t('landing.footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default LandingFooter;
