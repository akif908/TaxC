import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const LandingHeader = () => {
    const { t } = useTranslation();

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <header className="landing-header">
            <div className="landing-header__inner container">
                <Link to="/" className="landing-header__brand">
                    <div className="logo-box">
                        <img src="/logos/taxc-logo.png" alt="TaxC" />
                    </div>
                    <div className="logo-text">
                        <h3>{t('landing.header.title')}</h3>
                        <p>{t('landing.header.subtitle')}</p>
                    </div>
                </Link>
                <nav className="landing-nav">
                    <Link to="/login">{t('landing.header.login')}</Link>
                    <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>{t('landing.header.about')}</a>
                    <a href="#features" onClick={(e) => { e.preventDefault(); scrollToSection('features'); }}>{t('landing.header.features')}</a>
                    <div className="nav-switcher">
                        <LanguageSwitcher />
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default LandingHeader;
