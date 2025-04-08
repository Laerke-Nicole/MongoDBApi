import { User } from './user';

export interface Book extends Document {
    id: string;
    title: string;
    author: string;
    description: string;
    genre: string;
    imageURL: string;
    releaseYear: number;
    price: number;
    stock: number;
    discount: boolean;
    discountPct: number;
    ishidden: boolean;
    _createdBy: User["id"];
}