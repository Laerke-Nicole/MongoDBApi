import { Schema, model, Query } from 'mongoose';
import { Book } from '../interfaces/book';

const bookSchema = new Schema<Book>({
    title: { type: String, required: true, min: 6, max: 255 },
    author: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 6, max: 1024 },
    genre: { type: String, required: true, min: 3, max: 255 },
    imageURL: { type: String, required: true },
    releaseYear: { type: Number, required: true, min: 1000, max: 9999 },
    price: { type: Number, required: true, min: 1, max: 5000 },
    stock: { type: Number, required: true, min: 0, max: 500 },
    discount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0 },
    ishidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: 'User', required: true }
});


// define how its being updated in mongoose
type UpdateQuery<T> = {
    [key: string]: unknown;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};


// define book schema in mongoose  
bookSchema.pre<Query<Book, Book>>('findOneAndUpdate', function () {
    const update = this.getUpdate() as UpdateQuery<Book>;
    if (update.__v != null) {
        delete update.__v;
    }
    const keys: Array<'$set' | '$setOnInsert'> = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key]!.__v != null) {
            delete update[key]!.__v;
            if (Object.keys(update[key]!).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});

export const bookModel = model<Book>("Book", bookSchema);