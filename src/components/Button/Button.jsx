import React from 'react';
import styles from './Button.module.css';

const Button = ({ children, onClick, type = 'button', variant = 'primary', className = '' }) => {
  const buttonClasses = `
    ${styles.button}
    ${styles[variant]}
    ${className}
    focus:outline-none focus:ring-2 focus:ring-opacity-75
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
