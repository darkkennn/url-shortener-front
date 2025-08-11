import React from 'react';

const MessageBox = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="message-box-overlay">
      <div className="message-box">
        <p>{message}</p>
        <button onClick={onClose} className="message-box-button">OK</button>
      </div>
    </div>
  );
};

export default MessageBox;
