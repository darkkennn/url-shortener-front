import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useDispatch, useSelector } from '../store';
import { AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../store/authActions';

const useAuth = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.authState);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch({ type: AUTH_SUCCESS, payload: currentUser });
      } else {
        dispatch({ type: LOGOUT });
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return { isAuthenticated, user };
};

export default useAuth;