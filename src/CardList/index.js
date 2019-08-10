import React, { useState } from 'react';
import Card from './Card';
import cardListData from './cardListData';

import styles from './styles.module.scss';

const CardList = () => {
  // eslint-disable-next-line
  const [cardList, setCardList] = useState(cardListData);
  return (
    <div className={styles.cardList}>
      {cardList.map(({ id, ...props }) => (
        <Card key={id} {...props} />
      ))}
    </div>
  );
};

export default CardList;
