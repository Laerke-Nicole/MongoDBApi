"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookModel = void 0;
const mongoose_1 = require("mongoose");
const bookSchema = new mongoose_1.Schema({
    name: { type: String, required: true, min: 6, max: 255 },
    description: { type: String, required: true, min: 6, max: 1024 },
    imageURL: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    discount: { type: Boolean, required: true, default: false },
    discountPct: { type: Number, required: true, default: 0 },
    ishidden: { type: Boolean, required: false },
    _createdBy: { type: String, ref: 'User', required: true }
});
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