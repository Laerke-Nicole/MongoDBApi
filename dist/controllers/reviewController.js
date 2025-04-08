"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewByID = exports.updateReviewByID = exports.getReviewByID = exports.getAllReviews = exports.createReview = void 0;
const reviewModel_1 = require("../models/reviewModel");
const database_1 = require("../repository/database");
// CRUD
/**
 * @param req
 * @param res
 */
// create review in the data source based on the request body
function createReview(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            yield (0, database_1.connectToDB)();
            const review = new reviewModel_1.reviewModel(data);
            const result = yield review.save();
            res.status(201).send(result);
        }
        catch (error) {
            res.status(500).send("Error creating review. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.createReview = createReview;
/**
 * @param req
 * @param res
 */
// get/retrieve all reviews
function getAllReviews(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDB)();
            const result = yield reviewModel_1.reviewModel.find({});
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send("Error getting reviews. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.getAllReviews = getAllReviews;
/**
 * @param req
 * @param res
 */
// get/retrieve review by id
function getReviewByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDB)();
            const id = req.params.id;
            const result = yield reviewModel_1.reviewModel.find({ _id: id });
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send("Error getting review by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.getReviewByID = getReviewByID;
/**
 * @param req
 * @param res
 */
// get/retrieve review by id
function updateReviewByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connectToDB)();
            const result = yield reviewModel_1.reviewModel.findByIdAndUpdate(id, req.body);
            if (!result) {
                res.status(404).send("Review cant be found with id: " + id);
            }
            else {
                res.status(200).send("Review was updated successfully");
            }
        }
        catch (error) {
            res.status(500).send("Error updating review by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.updateReviewByID = updateReviewByID;
/**
 * @param req
 * @param res
 */
// delete review by id
function deleteReviewByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connectToDB)();
            const result = yield reviewModel_1.reviewModel.findByIdAndDelete(id);
            if (!result) {
                res.status(404).send("Cant delete review with id=: " + id);
            }
            else {
                res.status(200).send("Review was deleted successfully");
            }
        }
        catch (error) {
            res.status(500).send("Error deleting review by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.deleteReviewByID = deleteReviewByID;
//# sourceMappingURL=reviewController.js.map