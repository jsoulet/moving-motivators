/* eslint-disable no-undef */
import React, { useState, useCallback, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Card from './Card';
import cardListData from './cardListData';

import styles from './styles.module.scss';

import { IMoveCard, ICard } from './types';

const CardList = () => {
  const localCardList = localStorage.getItem('cards');
  const initialCardList: ICard[] = localCardList
    ? JSON.parse(localCardList)
    : cardListData;
  const [cards, setCards] = useState(initialCardList);

  useEffect(() => {
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
        {cards.map(({ id, ...props }, index) => (
          <Card
            key={id}
            index={index}
            id={id}
            moveCardAtIndex={moveCard}
            {...props}
          />
        ))}
      </div>
    </DndProvider>
  );
};

export default CardList;
