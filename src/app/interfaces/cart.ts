import { Product } from './product';

export interface Cart {
    id: string;
    products: Product[];
    date: Date;
    total: number;
}