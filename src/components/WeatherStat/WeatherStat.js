import React from 'react';
import PropTypes from 'prop-types';

const weatherStat = ({stat, label}) => {

  return (
    <div>
      <h4>{stat}</h4>
      <span>{label}</span>
    </div>
  )
}

weatherStat.propTypes = {
  stat: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired
};

export default weatherStat;