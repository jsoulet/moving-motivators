import React from 'react';
import PropTypes from 'prop-types';

import styles from './styles.module.scss';

const Card = ({ title, description, image }) => {
  return (
    <div className={styles.card}>
      <div className={styles.title}>{title}</div>
      {/* <img src={image} alt={title} /> */}
      <div className={styles.description}>{description}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string.isRequired,
  desciption: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};

export default Card;
