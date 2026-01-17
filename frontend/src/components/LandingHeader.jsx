import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import Logo from './Logo';

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
                <Link to="/" className="landing-header__brand" style={{ textDecoration: 'none' }}>
                    <Logo size="md" />
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
