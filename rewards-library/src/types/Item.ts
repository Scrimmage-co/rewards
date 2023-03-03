import { Collectible } from './Collectible';

// The Item interface is used to define the structure of a unique tradable ERC-1155 token.
// It is used to define unique things that you can buy, store, and sell in the marketplace
// e.g. dragons

export type ItemAttributeTraitType =
  | 'Background'
  | 'Skin Colors'
  | 'Jersey'
  | 'Attribute Points'
  | 'Second Chance'
  | 'Efficiency'
  | 'Stamina'
  | 'Health'
  | 'Level'
  | 'Rarity'
  | 'Neckwear'
  | 'Mouthwear'
  | 'Eyewear'
  | 'Headwear'
  | 'Hand Object'
  | 'Betting Style';

export type ItemAttribute = {
  trait_type: ItemAttributeTraitType;
  value: string | number;
  display_type?: string;
  max_value?: number;
};

export interface Item extends Collectible<ItemAttribute> {
  metadata: {
    name: string;
    description: string;
    image: string;
    optimizedImage: string;
    attributes: ItemAttribute[];
    dna: string;
    edition: number;
    date: number;
  };
  blockchain_id: number;
  edition: number;
}
