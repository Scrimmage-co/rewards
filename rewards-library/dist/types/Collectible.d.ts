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
