import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import styles from './styles.module.scss';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = {
  CARD: Symbol('card'),
};

const Card = ({ id, title, description, index, moveCardAtIndex }) => {
  const image = require(`./images/${id}.png`);

  // warn: a card should not know its index
  const ref = useRef(null);
  const [dragProps, drag] = useDrag({
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

  const [, drop] = useDrop({
    accept: ItemType.CARD,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Do not drop an item on itself
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleX =
        (hoverBoundingRect.left + hoverBoundingRect.right) / 2;
      const clientOffset = monitor.getClientOffset();

      const hoverClientX = clientOffset.x - hoverBoundingRect.left;

      //const dragBoundingRect = item.ref.current.getBoundingClientRect();
      //const dragMiddleX = (dragBoundingRect.left - dragBoundingRect.right) / 2;
      if (dragIndex < hoverIndex && hoverMiddleX < hoverClientX) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
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

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
  moveCardAtIndex: PropTypes.func.isRequired,
};

export default Card;
