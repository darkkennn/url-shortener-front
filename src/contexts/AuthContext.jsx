import React, { createContext, useContext } from 'react';

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const authValue = {};

  return (
    <AuthContext.Provider value={authValue}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuthContext };