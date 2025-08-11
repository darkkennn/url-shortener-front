import React from 'react';
import { logout } from '../store/authActions';
import { useDispatch } from '../store';

const Navbar = ({ isAuthenticated, onLogout, setRoute }) => {
  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    logout(dispatch);
  };

  return (
    <nav className="navbar">
      <div className="nav-brand">URL Shortener</div>
      <div className="navbar-nav">
        {!isAuthenticated ? (
          <>
            <button onClick={() => setRoute('auth')} className="nav-button">Login/Register</button>
          </>
        ) : (
          <>
            <button onClick={() => setRoute('shortener')} className="nav-button">Shorten</button>
            <button onClick={handleLogoutClick} className="nav-button">Logout</button> {/* Changed to handleLogoutClick */}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;