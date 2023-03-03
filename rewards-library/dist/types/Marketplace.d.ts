import { Collectible } from "./Collectibles";
export interface Offer<D extends Collectible = Collectible> {
    details: D;
    orderId: string;
    price: number;
    amount: number;
    expiresAt: number;
    isPartitioned: boolean;
}
