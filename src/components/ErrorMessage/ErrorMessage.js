import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import styles from './ErrorMessage.module.scss';

const errorMessage = ({error}) => {
  const {message} = error;
  return (
    <div className={styles.errorMessage}>
      <span className={styles.errorIcon}>
        <FontAwesomeIcon icon={faFrown} />
      </span>
      <span className={styles.errorText}>
        Sorry, the specified city was not found{message ? `: ${message}` : '...'}
      </span>
    </div>
  )
}

errorMessage.propTypes = {
  error: PropTypes.object.isRequired
};

export default errorMessage;