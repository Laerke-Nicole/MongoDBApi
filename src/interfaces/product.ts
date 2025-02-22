import { User } from './user';

export interface Product extends Document {
    name: string;
    description: string;
    img: string;
    price: number;
    stock: number;
    isOnDiscount: boolean;
    discountPrice: number;
    ishidden: boolean;
    _createdBy: User["id"];
}