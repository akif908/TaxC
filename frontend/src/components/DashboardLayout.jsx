import { useState } from 'react';
import Sidebar from './Sidebar';
import { Menu, Bell, Search } from 'lucide-react';
import './DashboardLayout.css';

const DashboardLayout = ({ children, user, onLogout }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <div className="dashboard-layout">
            <Sidebar
                user={user}
                onLogout={onLogout}
                isOpen={isSidebarOpen}
                toggleSidebar={toggleSidebar}
            />

            <div className="main-content-wrapper">
                {/* Top Header */}
                <header className="top-header">
                    <div className="header-left">
                        <button className="menu-btn" onClick={toggleSidebar}>
                            <Menu size={24} />
                        </button>
                        <h2 className="page-title">
                            {/* Dynamic title could go here based on route */}
                            Welcome back, {user?.email?.split('@')[0]}
                        </h2>
                    </div>

                    <div className="header-right">
                        <div className="search-bar">
                            <Search size={18} />
                            <input type="text" placeholder="Search..." />
                        </div>
                        <button className="icon-btn">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                        <div className="user-profile-menu">
                            <div className="avatar-circle-sm">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main Content Area */}
                <main className="main-content">
                    <div className="content-container">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
