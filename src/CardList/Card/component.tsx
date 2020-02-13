import React, { RefForwardingComponent, forwardRef } from 'react';
import cn from 'classnames';
// import { IMoveCard, ICard } from '../types';

interface CardProps {
  title: string;
  description: string;
  image: string;
  isDragged: boolean;
}

const Card: RefForwardingComponent<HTMLDivElement, CardProps> = (
  { title, description, image, isDragged },
  forwardRef,
) => {
  return (
    <div
      ref={forwardRef}
      className={cn('overflow-hidden  rounded-lg w-64 cursor-pointer m-4', {
        'bg-transparent border-gray-600 border-2 border-dashed': isDragged,
        'bg-white border-blue-500 border-b-4 shadow hover:shadow-lg': !isDragged,
      })}
    >
      <div className={cn({ 'opacity-0': isDragged })}>
        <div className="uppercase bg-blue-500 text-center text-xl font-semibold text-white py-1">
          {title}
        </div>
        <div className="p-4 md:p-6">
          {image && <img className="" src={image} alt={title} />}
          <div className="text-sm flex items-center">
            <p className="">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default forwardRef(Card);
