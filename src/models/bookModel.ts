import { Schema, model } from 'mongoose';
import { Book } from '../interfaces/book';

const bookSchema = new Schema<Book>({
    title: { type: String, required: true, min: 6, max: 255 },
    author: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 6, max: 1024 },
    genre: { type: String, required: true, min: 6, max: 255 },
    imageURL: { type: String, required: true },
    releaseYear: { type: Number, required: true, min: 4, max: 4 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0 },
    ishidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: 'User', required: true }
});

type UpdateQuery<T> = {
    [key: string]: any;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};

bookSchema.pre('findOneAndUpdate', function <T extends Document>(this: any) {
    const update = this.getUpdate() as UpdateQuery<T>;
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