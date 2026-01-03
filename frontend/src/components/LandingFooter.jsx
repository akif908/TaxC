import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const LandingFooter = () => {
    const { t } = useTranslation();

    return (
        <footer className="landing-footer">
            <div className="landing-footer__grid container">
                <div className="footer-col brand-col">
                    <div className="footer-brand">
                        <div className="logo-mark">TC</div>
                        <div>
                            <strong>TaxC</strong>
                            <p>{t('landing.footer.brand_desc')}</p>
                        </div>
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
                    <h4>{t('শর্তাবলী')}</h4>
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
