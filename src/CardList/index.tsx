import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import cardListData from './cardListData';

import styles from './styles.module.scss';

import { IMoveCard } from './types';

const CardList = () => {
  const [cards, setCards] = useState(Object.keys(cardListData));
  useEffect(() => {
    const localCardList = localStorage.getItem('cards');
    if (!localCardList) {
      return;
    }
    const parsedCardList = JSON.parse(localCardList);
    if (!Array.isArray(parsedCardList) || parsedCardList.length === 0) {
      return;
    }
    setCards(parsedCardList);
  }, []);

  const saveCardOrder = useCallback(() => {
    localStorage.setItem('cards', JSON.stringify(cards));
  }, [cards]);

  const moveCard = useCallback<IMoveCard>(
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
        {cards.map((id, index) => (
          <Card
            key={id}
            index={index}
            id={id}
            moveCardAtIndex={moveCard}
            onDragEnd={saveCardOrder}
            card={cardListData[id]}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardList;
