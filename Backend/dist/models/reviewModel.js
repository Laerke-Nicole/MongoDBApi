"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewModel = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    _book: { type: String, ref: 'Book', required: true },
    _createdBy: { type: String, ref: 'User', required: true },
    rating: { type: Number, required: true, min: 1, max: 10 },
    comment: { type: String, required: true, min: 2, max: 255 },
    createdAt: { type: Date, default: Date.now }
});
// Pre-hook to handle version increment
reviewSchema.pre('findOneAndUpdate', function () {
    const update = this.getUpdate();
    if (update.__v != null) {
        delete update.__v;
    }
    const keys = ['$set', '$setOnInsert'];
    for (const key of keys) {
        if (update[key] != null && update[key].__v != null) {
            delete update[key].__v;
            if (Object.keys(update[key]).length === 0) {
                delete update[key];
            }
        }
    }
    update.$inc = update.$inc || {};
    update.$inc.__v = 1;
});
exports.reviewModel = (0, mongoose_1.model)("Review", reviewSchema);
//# sourceMappingURL=reviewModel.js.map