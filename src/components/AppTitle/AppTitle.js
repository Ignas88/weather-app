import React from 'react';
import PropTypes from 'prop-types';
import styles from './AppTitle.module.scss';

const appTitle = ({secondary, showTitle}) => {
    let className = secondary ? styles.hide : styles.show;
    return <h1 className={`${styles.appTitle} ${showTitle ? className : ''}`}>Weather app</h1>;
}

appTitle.propTypes = {
    secondary: PropTypes.bool,
    showTitle: PropTypes.bool.isRequired
};

export default appTitle;