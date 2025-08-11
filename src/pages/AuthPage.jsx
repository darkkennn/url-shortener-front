import React, { useState } from 'react';
import MessageBox from '../components/common/MessageBox';
import { useDispatch, useSelector, CLEAR_ERROR } from '../store';
import { login, register } from '../store/authActions';

const AuthPage = ({ setRoute }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { authError, loading } = useSelector(state => ({
    authError: state.authState.authError,
    loading: state.uiState.loading,
  }));
  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (isLogin) {
      await login(dispatch, email, password);
    } else {
      await register(dispatch, email, password);
      if (!authError && !loading) {
         setMessage("Registration successful! You can now log in.");
         setIsLogin(true);
      }
    }
  };

  return (
    <div className="auth-container">
      <MessageBox message={message} onClose={() => setMessage(null)} />
      <h2 className="heading">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Processing...' : (isLogin ? 'Login' : 'Register')}
        </button>
      </form>
      {authError && <p className="error-text">{authError}</p>}
      <button onClick={() => { setIsLogin(!isLogin); dispatch({ type: CLEAR_ERROR }); }} className="toggle-button">
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
};

export default AuthPage;