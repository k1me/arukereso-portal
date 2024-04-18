import { Product } from './product';

export interface Cart {
    id: string;
    uid: string;
    products: Product[];
    date: Date;
    total: number;
}