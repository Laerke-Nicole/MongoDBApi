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
exports.deleteBookByID = exports.updateBookByID = exports.getBookByID = exports.getAllBooks = exports.createBook = void 0;
const bookModel_1 = require("../models/bookModel");
const database_1 = require("../repository/database");
// CRUD
/**
 * @param req
 * @param res
 */
// create book in the data source based on the request body
function createBook(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = req.body;
        try {
            yield (0, database_1.connectToDB)();
            const book = new bookModel_1.bookModel(data);
            const result = yield book.save();
            res.status(201).send(result);
        }
        catch (error) {
            res.status(500).send("Error creating book. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.createBook = createBook;
/**
 * @param req
 * @param res
 */
// get/retrieve all books
function getAllBooks(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDB)();
            const result = yield bookModel_1.bookModel.find({});
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send("Error getting books. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.getAllBooks = getAllBooks;
/**
 * @param req
 * @param res
 */
// get/retrieve book by id
function getBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDB)();
            const id = req.params.id;
            const result = yield bookModel_1.bookModel.find({ _id: id });
            res.status(200).send(result);
        }
        catch (error) {
            res.status(500).send("Error getting book by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.getBookByID = getBookByID;
/**
 * @param req
 * @param res
 */
// get/retrieve book by id
function updateBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connectToDB)();
            const result = yield bookModel_1.bookModel.findByIdAndUpdate(id, req.body);
            if (!result) {
                res.status(404).send("Book cant be found with id: " + id);
            }
            else {
                res.status(200).send("Book was updated successfully");
            }
        }
        catch (error) {
            res.status(500).send("Error updating book by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.updateBookByID = updateBookByID;
/**
 * @param req
 * @param res
 */
// delete book by id
function deleteBookByID(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield (0, database_1.connectToDB)();
            const result = yield bookModel_1.bookModel.findByIdAndDelete(id);
            if (!result) {
                res.status(404).send("Cant delete book with id=: " + id);
            }
            else {
                res.status(200).send("Book was deleted successfully");
            }
        }
        catch (error) {
            res.status(500).send("Error deleting book by id. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.deleteBookByID = deleteBookByID;
//# sourceMappingURL=bookController.js.map