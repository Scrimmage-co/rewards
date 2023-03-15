import { Collectible } from './Collectible';

// The Asset interface is used to define the structure of a tradable ERC-1155 token,
// mostly used to define non-unique things that you can buy, store,
// and sell in the marketplace e.g. eggs, rewards, perks etc.

export type AssetTypes = 'Egg' | 'Coupon';

export type AssetAttributeTraitType = 'Type' | 'Company' | 'ShortDescription';

export type AssetAttribute = {
  trait_type: AssetAttributeTraitType;
  value: string | number | AssetTypes;
  display_type?: string;
  max_value?: number;
};

export interface Asset extends Collectible<AssetAttribute> {
  metadata: {
    name: string;
    description: string;
    external_url: string;
    image: string;
    optimizedImage: string;
    attributes: AssetAttribute[];
  };
  blockchain_id: number;
}
