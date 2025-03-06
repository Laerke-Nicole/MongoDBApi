"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    title: { type: String, required: true, min: 6, max: 255 },
    author: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 6, max: 1024 },
    genre: { type: String, required: true, min: 6, max: 255 },
    imageURL: { type: String, required: true },
    releaseYear: { type: Number, required: true, min: 1000, max: 9999 },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0 },
    ishidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: 'User', required: true }
});
// define book schema in mongoose  
bookSchema.pre('findOneAndUpdate', function () {
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
exports.bookModel = (0, mongoose_1.model)("Book", bookSchema);
//# sourceMappingURL=bookModel.js.map