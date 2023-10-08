import { useState } from 'react';
import classNames from 'classnames';

import IconArrow from '../IconArrow';
import IconError from '../IconError';

import styles from './EmailForm.module.css';

function EmailForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleEmailChange = (event) => {
    const emailValue = event.target.value;
    setEmail(emailValue);

    if (!isValidEmail(emailValue)) {
      setError('Please provide a valid email');
    } else {
      setError('');
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError('Please provide a valid email');
      return;
    }

    console.log('form submitted', email);
  };

  const formClasses = classNames({
    [styles.emailForm]: true,
    [styles.error]: !!error,
  });

  return (
    <form className={formClasses} onSubmit={handleFormSubmit}>
      <input
        type='text'
        value={email}
        onChange={handleEmailChange}
        placeholder='Email Address'
        className={styles.emailInput}
      />
      {error && <IconError />}
      <button type='submit' className={styles.emailSubmit} disabled={!!error}>
        <IconArrow />
      </button>
      {error && <p className={styles.messageError}>{error}</p>}
    </form>
  );
}

export default EmailForm;
