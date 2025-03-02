import { Schema, model } from 'mongoose';
import { Review } from '../interfaces/review';

const reviewSchema = new Schema<Review>({
    _book: { type: String, ref: 'Book', required: true },
    _createdBy: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true, min: 2, max: 255 },
    createdAt: { type: Date, default: Date.now }
});

export const reviewModel = model<Review>("Review", reviewSchema);