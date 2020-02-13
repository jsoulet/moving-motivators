import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import MultiBackend from 'react-dnd-multi-backend';
import HTML5toTouch from 'react-dnd-multi-backend/dist/esm/HTML5toTouch';
import Card from './Card';
import cardListData from './cardListData';
import { getCardsOrder, saveCardsOrder } from './services'

import styles from './styles.module.scss';

import { IMoveCard } from './types';

const CardList = () => {
  const [cards, setCards] = useState(Object.keys(cardListData));
  useEffect(() => {
    const cardOrder = getCardsOrder()
    setCards(cardOrder);
  }, []);

  const handleSaveCardOrder = useCallback(() => {
    saveCardsOrder(cards)
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
    <DndProvider backend={MultiBackend} options={HTML5toTouch}>
      <div className={styles.cardList}>
        {cards.map((id, index) => (
          <Card
            key={id}
            index={index}
            id={id}
            moveCardAtIndex={moveCard}
            onDragEnd={handleSaveCardOrder}
            card={cardListData[id]}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardList;
