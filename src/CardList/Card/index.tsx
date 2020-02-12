import React, { useRef, FunctionComponent } from 'react';
import cn from 'classnames';

import styles from './styles.module.scss';
import { useDrag, useDrop } from 'react-dnd';

import { IMoveCard } from '../types';

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

interface CardProps {
  id: string;
  title: string;
  description: string;
  index: number;
  moveCardAtIndex: IMoveCard;
}

const Card: FunctionComponent<CardProps> = ({
  id,
  title,
  description,
  index,
  moveCardAtIndex,
}) => {
  const image = require(`./images/${id}.png`);

  // warn: a card should not know its index
  const ref = useRef<HTMLDivElement>(null);
  const [dragProps, drag] = useDrag<DragObject, any, DragProps>({
    item: {
      id,
      ref,
      index,
      type: ItemType.CARD,
    },
    collect: monitor => ({ isBeingDragged: monitor.isDragging() }),
    // begin: () => console.log('start drag'),
    // end: () => console.log('finish drag'),
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
      if (!ref.current) {
        return;
      }
      const dragBoundingRect = ref.current.getBoundingClientRect();
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

  drop(drag(ref));
  return (
    <div
      ref={ref}
      className={cn(styles.card, {
        [styles.isBeingDragged]: dragProps.isBeingDragged,
      })}
    >
      <div className={styles.title}>{title}</div>
      <div className={styles.content}>
        {image && <img className={styles.image} src={image} alt={title} />}
        <div className={styles.description}>{description}</div>
      </div>
    </div>
  );
};

export default Card;
