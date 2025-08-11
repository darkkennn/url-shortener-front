import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from 'configs/firebase';
import { StoreProvider, useDispatch, useSelector } from './store';
import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from './store/authActions';
import Navbar from './layouts/Navbar';
import AuthPage from './pages/AuthPage';
import ShortenerPage from './pages/ShortenerPage';
import './App.css';

const App = () => {
  const [route, setRoute] = useState('shortener');
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector(state => state.authState);
  const [firebaseInitLoading, setFirebaseInitLoading] = useState(true);

  useEffect(() => {
    const initializeCanvasAuth = async () => {
      const initialAuthToken = typeof window.__initial_auth_token !== 'undefined' ? window.__initial_auth_token : null;
      const firebaseInitialConfig = typeof window.__firebase_config !== 'undefined' ? JSON.parse(window.__firebase_config) : null;

      if (initialAuthToken) {
        try {
          const { signInWithCustomToken } = await import('firebase/auth');
          await signInWithCustomToken(auth, initialAuthToken);
        } catch (error) {
          console.error("Firebase custom token sign-in failed:", error);
          dispatch({ type: AUTH_FAILURE, payload: error.message });
        }
      }
      setFirebaseInitLoading(false);
    };

    initializeCanvasAuth();

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: AUTH_SUCCESS, payload: currentUser });
        if (route !== 'shortener') {
          setRoute('shortener');
        }
      } else {
        dispatch({ type: LOGOUT });
        setRoute('auth');
      }
    });
    return () => unsubscribe();
  }, [dispatch, route]);

  const handleLogout = () => {
    const { logout } = require('./store/authActions');
    logout(dispatch);
  };

  const renderRoute = () => {
    if (firebaseInitLoading) {
      return <div className="loading-container">Loading application...</div>;
    }
    if (route === 'auth' || !isAuthenticated) {
      return <AuthPage setRoute={setRoute} />;
    } else if (route === 'shortener' && isAuthenticated) {
      return <ShortenerPage />;
    } else {
      return <AuthPage setRoute={setRoute} />;
    }
  };

  return (
    <div className="app-container">
      <Navbar isAuthenticated={isAuthenticated} onLogout={handleLogout} setRoute={setRoute} />
      {renderRoute()}
    </div>
  );
};

const AppWrapper = () => (
  <StoreProvider>
    <App />
  </StoreProvider>
);

export default AppWrapper;