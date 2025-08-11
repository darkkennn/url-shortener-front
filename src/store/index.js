import React, { createContext, useContext, useReducer } from 'react';
import { authReducer } from './authActions';
import { urlReducer } from './urlActions';

export const SET_LOADING = 'SET_LOADING'; 
export const SET_ERROR = 'SET_ERROR';  
export const CLEAR_ERROR = 'CLEAR_ERROR'; 

const uiReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };
    case SET_ERROR:
      return { ...state, error: action.payload };
    case CLEAR_ERROR:
      return { ...state, error: null };
    default:
      return state;
  }
};

const rootReducer = ({ authState, urlState, uiState }, action) => ({
  authState: authReducer(authState, action),
  urlState: urlReducer(urlState, action),
  uiState: uiReducer(uiState, action),
});

const initialState = {
  authState: {
    user: null,
    isAuthenticated: false,
    authError: null,
  },
  urlState: {
    urls: [],
  },
  uiState: {
    loading: false,
    error: null,
  },
};

export const StoreContext = createContext(); // Exported

export const StoreProvider = ({ children }) => { // Exported
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useDispatch = () => useContext(StoreContext).dispatch; // Exported
export const useSelector = (selector) => selector(useContext(StoreContext).state); // Exported