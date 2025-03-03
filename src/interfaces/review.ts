import { User } from './user';
import { Book } from './book';

export interface Review extends Document {
    id: string;
    _book: Book["id"];
    _createdBy: User["id"];
    rating: number;
    comment: string;
    createdAt: Date;
}