import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    FileText,
    CreditCard,
    User,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    MessageSquare
} from 'lucide-react';
import { useState } from 'react';
import './DashboardLayout.css';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';

const Sidebar = ({ user, onLogout, isOpen, toggleSidebar }) => {
    const location = useLocation();
    const { t } = useTranslation();

    const isActive = (path) => location.pathname === path;

    const userLinks = [
        { path: '/dashboard', icon: <LayoutDashboard size={20} />, label: t('sidebar.dashboard') },
        { path: '/account', icon: <FileText size={20} />, label: t('sidebar.account') },
        { path: '/tax-form', icon: <FileText size={20} />, label: t('sidebar.tax_form') },
        { path: '/payment', icon: <CreditCard size={20} />, label: t('sidebar.payment') },
        { path: '/profile', icon: <User size={20} />, label: 'Profile' },
    ];

    const adminLinks = [
        { path: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: t('sidebar.dashboard') },
        { path: '/admin/users', icon: <Users size={20} />, label: t('sidebar.users') },
        { path: '/admin/slabs', icon: <Settings size={20} />, label: t('sidebar.tax_slabs') },
        { path: '/admin/feedback', icon: <MessageSquare size={20} />, label: t('sidebar.feedback') },
    ];

    const links = user?.role === 'admin' ? adminLinks : userLinks;

    return (
        <>
            {/* Mobile Overlay */}
            <div
                className={`sidebar-overlay ${isOpen ? 'open' : ''}`}
                onClick={toggleSidebar}
            />

            {/* Sidebar */}
            <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <Link to="/" className="logo-container">
                        <img src="/logo.png" alt="TaxC" />
                        <span className="logo-text">TaxC</span>
                    </Link>
                    <button className="close-btn" onClick={toggleSidebar}>
                        <X size={24} />
                    </button>
                </div>

                <div className="user-info-mini">
                    <div className="avatar-circle">
                        {user?.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="user-details">
                        <span className="user-email">{user?.email}</span>
                        <span className="user-role">{user?.role}</span>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    <ul>
                        {links.map((link) => (
                            <li key={link.path}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                                    onClick={() => window.innerWidth < 768 && toggleSidebar()}
                                >
                                    <span className="nav-icon">{link.icon}</span>
                                    <span className="nav-label">{link.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="sidebar-footer">
                    <LanguageSwitcher />
                    <button onClick={onLogout} className="logout-btn">
                        <LogOut size={20} />
                        <span>{t('sidebar.logout')}</span>
                    </button>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;
