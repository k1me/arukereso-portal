import { Product } from './product';

export interface Cart {
    id: string;
    quantity: number;
    product: Product;
}