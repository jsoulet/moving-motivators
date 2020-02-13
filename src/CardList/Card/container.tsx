import React, { useRef, FunctionComponent } from 'react';

import { useDrag, useDrop } from 'react-dnd';
//import styles from './styles.module.scss';
import { IMoveCard, ICard } from '../types';
import Card from './component';
const ItemType = {
  CARD: Symbol('card'),
};

interface DragObject {
  id: string;
  index: number;
  type: symbol;
  ref: any;
}

interface DragProps {
  isBeingDragged: boolean;
}

interface CardContainerProps {
  id: string;
  card: ICard;
  index: number;
  moveCardAtIndex: IMoveCard;
  onDragEnd: () => void;
}

const CardContainer: FunctionComponent<CardContainerProps> = ({
  id,
  card: { title, description },
  index,
  moveCardAtIndex,
  onDragEnd,
}) => {
  const image = require(`./images/${id}.png`);

  // warn: a card should not know its index
  const cardRef = useRef<HTMLDivElement>(null);
  const [dragProps, drag] = useDrag<DragObject, any, DragProps>({
    item: {
      id,
      ref: cardRef,
      index,
      type: ItemType.CARD,
    },
    collect: monitor => ({ isBeingDragged: monitor.isDragging() }),
    // begin: () => console.log('start drag'),
    end: onDragEnd,
    // canDrag: () => id !== 'power',
  });

  const [, drop] = useDrop<DragObject, DragObject, DragObject>({
    accept: ItemType.CARD,
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      // Do not drop an item on itself
      if (dragIndex === hoverIndex) {
        return;
      }
      if (!cardRef.current) {
        return;
      }
      const dragBoundingRect = cardRef.current.getBoundingClientRect();
      const hoverMiddleX = (dragBoundingRect.left + dragBoundingRect.right) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset!.x - dragBoundingRect.left;

      //const dragBoundingRect = item.ref.current.getBoundingClientRect();
      //const dragMiddleX = (dragBoundingRect.left - dragBoundingRect.right) / 2;
      if (
        (dragIndex < hoverIndex && hoverMiddleX < hoverClientX) ||
        (dragIndex > hoverIndex && hoverClientX > hoverMiddleX)
      ) {
        return;
      }
      moveCardAtIndex(dragIndex, hoverIndex);
      item.index = hoverIndex;
      // const clientOffset = monitor.getClientOffset();
      // const hoverClientX =

      // if(dragIndex < hoverIndex && )
    },
  });

  drop(drag(cardRef));
  return (
    <Card
      ref={cardRef}
      title={title}
      image={image}
      description={description}
      isDragged={dragProps.isBeingDragged}
      // className={cn(styles.card, {
      //   [styles.isBeingDragged]: dragProps.isBeingDragged,
      // })}
    />
  );
};

export default CardContainer;
