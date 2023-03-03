import { Collectible } from './Collectible';
export declare type ItemAttributeTraitType = 'Background' | 'Skin Colors' | 'Jersey' | 'Attribute Points' | 'Second Chance' | 'Efficiency' | 'Stamina' | 'Health' | 'Level' | 'Rarity' | 'Neckwear' | 'Mouthwear' | 'Eyewear' | 'Headwear' | 'Hand Object' | 'Betting Style';
export declare type ItemAttribute = {
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
