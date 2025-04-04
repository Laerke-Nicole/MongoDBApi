import { Schema, model, Query } from 'mongoose';
import { Review } from '../interfaces/review';

const reviewSchema = new Schema<Review>({
    _book: { type: String, ref: 'Book', required: true },
    _createdBy: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true, min: 2, max: 255 },
    createdAt: { type: Date, default: Date.now }
});

// Define how it's being updated in Mongoose
type UpdateQuery<T> = {
    [key in keyof Partial<T>]?: unknown;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};

// Pre-hook to handle version increment
reviewSchema.pre<Query<Review, Review>>('findOneAndUpdate', function () {
    const update = this.getUpdate() as UpdateQuery<Review>;
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

export const reviewModel = model<Review>("Review", reviewSchema);