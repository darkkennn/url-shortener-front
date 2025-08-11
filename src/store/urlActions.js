import { collection, query, onSnapshot, addDoc } from 'firebase/firestore';
import { db, currentAppId, auth } from 'configs/firebase';
import { SET_LOADING, SET_ERROR, CLEAR_ERROR } from './index';

export const SET_URLS = 'SET_URLS';
export const ADD_URL = 'ADD_URL';

export const urlReducer = (state, action) => {
  switch (action.type) {
    case SET_URLS:
      return { ...state, urls: action.payload };
    case ADD_URL:
      return { ...state, urls: [action.payload, ...state.urls] };
    default:
      return state;
  }
};

export const fetchUrls = (dispatch, userId) => {
  if (!userId) {
    dispatch({ type: SET_URLS, payload: [] });
    return;
  }

  const userUrlsCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/shortenedUrls`);

  const q = query(userUrlsCollectionRef);
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const urls = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    dispatch({ type: SET_URLS, payload: urls });
  }, (error) => {
    dispatch({ type: SET_ERROR, payload: "Failed to load URLs." });
  });

  return unsubscribe;
};

export const createShortUrl = async (dispatch, fullUrl, userId) => {
  dispatch({ type: CLEAR_ERROR });
  dispatch({ type: SET_LOADING, payload: true });
  try {
    new URL(fullUrl);

    const user = auth.currentUser;
    let token = null;
    if (user) {
      token = await user.getIdToken();
    } else {
      throw new Error("User not authenticated. Please log in to shorten URLs.");
    }

    let API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    if (!API_BASE_URL) {
        throw new Error("API base URL is not configured.");
    }

    API_BASE_URL = API_BASE_URL.endsWith('/') ? API_BASE_URL.slice(0, -1) : API_BASE_URL;

    const response = await fetch(`${API_BASE_URL}/api/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ url: fullUrl, userId }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to shorten URL');
    }

    const userUrlsCollectionRef = collection(db, `artifacts/${currentAppId}/users/${userId}/shortenedUrls`);
    await addDoc(userUrlsCollectionRef, {
      full_url: fullUrl,
      short_url: data.shortUrl,
      userId: userId,
      clicks: 0,
      createdAt: new Date(),
    });

    dispatch({ type: ADD_URL, payload: { full_url: fullUrl, short_url: data.shortUrl, userId, clicks: 0, createdAt: new Date() } });
    return data.shortUrl;
  } catch (error) {
    if (error instanceof TypeError && error.message.includes("Invalid URL")) {
        dispatch({ type: SET_ERROR, payload: "Please enter a valid URL." });
    } else {
        dispatch({ type: SET_ERROR, payload: error.message });
    }
  } finally {
    dispatch({ type: SET_LOADING, payload: false });
  }
};