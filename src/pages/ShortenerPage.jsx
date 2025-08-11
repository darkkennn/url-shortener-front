import React, { useState, useEffect } from 'react';
import MessageBox from '../components/common/MessageBox';
import { useDispatch, useSelector } from '../store';
import { fetchUrls, createShortUrl } from '../store/urlActions';

const ShortenerPage = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortenedUrl, setShortenedUrl] = useState('');
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.authState);
  const { urls } = useSelector(state => state.urlState);
  const { loading, error } = useSelector(state => state.uiState);
  const [message, setMessage] = useState(null);

  const userId = user ? user.uid : null;
  const userIdDisplay = user ? user.uid : '';
  
  useEffect(() => {
    let unsubscribe;
    if (userId) {
      unsubscribe = fetchUrls(dispatch, userId);
    }
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [dispatch, userId]);

  const handleShorten = async (e) => {
    e.preventDefault();
    setShortenedUrl('');
    setMessage(null);
    const result = await createShortUrl(dispatch, longUrl, userId);
    if (result) {
      setShortenedUrl(result);
      setLongUrl('');
      setMessage("URL shortened successfully!");
    }
  };

  const copyToClipboard = (text) => {
    if (document.execCommand) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setMessage('Copied to clipboard!');
    } else {
      setMessage('Copy to clipboard not supported in this browser.');
    }
  };

  return (
    <div className="container">
      <MessageBox message={message} onClose={() => setMessage(null)} />
      <h2 className="heading">URL Shortener</h2>
      {userId && <p className="user-id-display">User ID: {userIdDisplay}</p>}
      <form onSubmit={handleShorten} className="form">
        <input
          type="url"
          placeholder="Enter long URL"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          required
          className="input"
        />
        <button type="submit" className="button" disabled={loading}>
          {loading ? 'Shortening...' : 'Shorten URL'}
        </button>
      </form>
      {shortenedUrl && (
        <div className="shortened-url-box">
          <p>Shortened URL:</p>
          <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="short-url-link">
            {shortenedUrl}
          </a>
          <button onClick={() => copyToClipboard(shortenedUrl)} className="copy-button">
            Copy
          </button>
        </div>
      )}
      {error && <p className="error-text">{error}</p>}

      {userId && (
        <div className="history-container">
          <h3 className="subheading">Your Shortened URLs</h3>
          {urls.length === 0 ? (
            <p>No URLs shortened yet.</p>
          ) : (
            <ul className="url-list">
              {urls.map((url) => (
                <li key={url.id} className="url-list-item">
                  <p className="full-url-text">{url.full_url}</p>
                  <a href={url.short_url} target="_blank" rel="noopener noreferrer" className="short-url-link">
                    {url.short_url}
                  </a>
                  <button onClick={() => copyToClipboard(url.short_url)} className="copy-button">
                    Copy
                  </button>
                  <p className="clicks-text">Clicks: {url.clicks || 0}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenerPage;