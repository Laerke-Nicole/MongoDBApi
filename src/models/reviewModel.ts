import { Schema, model } from 'mongoose';
import { Review } from '../interfaces/review';

const reviewSchema = new Schema<Review>({
    _book: { type: String, ref: 'Book', required: true },
    _createdBy: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true, min: 2, max: 255 },
    createdAt: { type: Date, default: Date.now }
});



// define how its being updated in mongoose
type UpdateQuery<T> = {
    [key: string]: any;
} & {
    __v?: number;
    $set?: Partial<T> & { __v?: number };
    $setOnInsert?: Partial<T> & { __v?: number };
    $inc?: { __v?: number };
};


// define review schema in mongoose  
reviewSchema.pre('findOneAndUpdate', function <T extends Document>(this: any) {
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



export const reviewModel = model<Review>("Review", reviewSchema);