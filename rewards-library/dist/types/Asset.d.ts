import { Collectible } from './Collectible';
export declare type AssetTypes = 'Egg' | 'Coupon';
export declare type AssetAttributeTraitType = 'Type' | 'Company' | 'ShortDescription';
export declare type AssetAttribute = {
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
