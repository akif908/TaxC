import { Link, useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Navbar = ({ user, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await authService.logout();
            onLogout();
            navigate('/landing', { replace: true });
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-content">
                <Link to="/landing" className="navbar-logo">
                    <span className="logo-mark">TP</span>
                    <div className="logo-text">
                        <span className="logo-title">Tax Payment</span>
                        <span className="logo-subtitle">Smart Filing Hub</span>
                    </div>
                </Link>
                <div className="nav-links">
                    {user?.role !== 'admin' && (
                        <Link to="/landing">
                            <button className="btn btn-secondary">Home</button>
                        </Link>
                    )}
                    <Link to="/profile"><button className="btn btn-secondary">Profile</button></Link>
                    <Link to="/tax-form"><button className="btn btn-secondary">Tax Form</button></Link>
                    <Link to="/payment"><button className="btn btn-secondary">Payments</button></Link>
                    {user?.role === 'admin' && (
                        <>
                            <Link to="/admin/users"><button className="btn btn-primary">Manage Users</button></Link>
                            <Link to="/admin/slabs"><button className="btn btn-primary">Manage Tax Slabs</button></Link>
                        </>
                    )}
                    <button onClick={handleLogout} className="btn btn-danger">Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
