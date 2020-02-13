export interface IMoveCard {
  (dragIndex: number, hoverIndex: number): void;
}

export interface ICard {
  title: string;
  description: string;
}

export interface ICardData {
  [key: string]: ICard;
}

export interface ISaveCards {
  (cards: ICard[]): void;
}
