import { Schema, model, Query } from 'mongoose';
import { Collection } from '../interfaces/collection';

const collectionSchema = new Schema<Collection>({
    userId: { type: String, required: true },
    bookId: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['to-read', 'currently reading', 'read'],
        default: 'to-read'
    },
    addedAt: { type: Date, required: true, default: Date.now }
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


// define collection schema in mongoose  
collectionSchema.pre<Query<Collection, Collection>>('findOneAndUpdate', function () {
    const update = this.getUpdate() as UpdateQuery<Collection>;
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

export const collectionModel = model<Collection>("Collection", collectionSchema);