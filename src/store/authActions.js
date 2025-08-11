import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db, currentAppId } from 'configs/firebase';
import { SET_LOADING, SET_ERROR, CLEAR_ERROR } from './index';

export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const LOGOUT = 'LOGOUT';

export const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return { ...state, user: action.payload, isAuthenticated: true, authError: null };
    case AUTH_FAILURE:
      return { ...state, user: null, isAuthenticated: false, authError: action.payload };
    case LOGOUT:
      return { ...state, user: null, isAuthenticated: false, authError: null };
    default:
      return state;
  }
};

export const login = async (dispatch, email, password) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    dispatch({ type: AUTH_SUCCESS, payload: userCredential.user });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const register = async (dispatch, email, password) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: SET_LOADING, payload: true });
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    dispatch({ type: AUTH_SUCCESS, payload: userCredential.user });
    await setDoc(doc(db, `artifacts/${currentAppId}/users`, userCredential.user.uid), {
      email: userCredential.user.email,
      createdAt: new Date(),
      appId: currentAppId,
    });
  } catch (error) {
    dispatch({ type: AUTH_FAILURE, payload: error.message });
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};

export const logout = async (dispatch) => {
  dispatch({ type: CLEAR_ERROR });
  try {
    await signOut(auth);
    dispatch({ type: LOGOUT });
    dispatch({ type: 'SET_URLS', payload: [] });
  } catch (error) {
    dispatch({ type: SET_ERROR, payload: error.message });
  }
};