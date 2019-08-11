import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import cardListData from './cardListData';

import styles from './styles.module.scss';

const CardList = () => {
  // eslint-disable-next-line
  const initialCardList = localStorage.getItem('cards')
    ? JSON.parse(localStorage.getItem('cards'))
    : cardListData;
  const [cards, setCards] = useState(initialCardList);
  const saveCards = useEffect(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const card = cards[dragIndex];
      const cardsClone = cards.slice();
      cardsClone.splice(dragIndex, 1);
      cardsClone.splice(hoverIndex, 0, card);
      setCards(cardsClone);
    },
    [cards],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.cardList}>
        {cards.map(({ id, ...props }, index) => (
          <Card
            key={id}
            index={index}
            id={id}
            moveCardAtIndex={moveCard}
            saveCards={saveCards}
            {...props}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardList;
