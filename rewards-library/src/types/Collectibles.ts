export interface Collectible<Attribute = any> {
  metadata: {
    name: string;
    description: string;
    image: string;
    optimizedImage: string;
    attributes: Attribute[];
  };
  blockchain_id: number;
  edition: number;
}

export interface Asset extends Collectible {
  metadata: { name: string; description: string; external_url: string; image: string; optimizedImage: string; attributes: any[]; };
  blockchain_id: number;
}

export type ItemAttributeTraitType =
  | "Background"
  | "Skin Colors"
  | "Jersey"
  | "Attribute Points"
  | "Second Chance"
  | "Efficiency"
  | "Stamina"
  | "Health"
  | "Level"
  | "Rarity"
  | "Neckwear"
  | "Mouthwear"
  | "Eyewear"
  | "Headwear"
  | "Hand Object"
  | "Betting Style";

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
