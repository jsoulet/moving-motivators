export interface IMoveCard {
  (dragIndex: number, hoverIndex: number): void;
}

export interface ICard {
  id: string;
  title: string;
  description: string;
}

export interface ISaveCards {
  (cards: ICard[]): void;
}
