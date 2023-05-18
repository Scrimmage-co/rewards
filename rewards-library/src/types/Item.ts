export type ItemAttribute =
  | 'Level'
  | 'Experience'
  | 'BronzeQuestsCompleted'
  | 'SilverQuestsCompleted'
  | 'GoldenQuestsCompleted';

export interface Attribute {
  traitType: ItemAttribute;
  value: number;
}

export interface ActiveItem {
  id: number;
  image: string;
  name: string;
  description: string;
  attributes: Attribute[];
  createdAt: string;
  updatedAt: string;
}
