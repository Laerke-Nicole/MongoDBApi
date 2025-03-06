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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedData = exports.deleteAllData = exports.seed = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_flow_1 = __importDefault(require("dotenv-flow"));
// imports
const bookModel_1 = require("../models/bookModel");
const userModel_1 = require("../models/userModel");
const reviewModel_1 = require("../models/reviewModel");
const database_1 = require("../repository/database");
dotenv_flow_1.default.config();
// seed db with data so theres always data in the collection
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, database_1.connectToDB)();
            yield deleteAllData();
            yield seedData();
            console.log("Seeded data successfully.");
            process.exit();
        }
        catch (err) {
            console.log("Error Seeding the data." + err);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.seed = seed;
;
// delete all data from the db
function deleteAllData() {
    return __awaiter(this, void 0, void 0, function* () {
        yield bookModel_1.bookModel.deleteMany();
        yield userModel_1.userModel.deleteMany();
        yield reviewModel_1.reviewModel.deleteMany();
        console.log("Cleared data successfully.");
    });
}
exports.deleteAllData = deleteAllData;
;
// data seeding in the db
function seedData() {
    return __awaiter(this, void 0, void 0, function* () {
        // hash users password 
        const salt = yield bcrypt_1.default.genSalt(10);
        const passwordHash = yield bcrypt_1.default.hash("12345678", salt);
        // seed for users
        const user1 = new userModel_1.userModel();
        user1.name = "Jane Doe";
        user1.email = "janedoe@gmail.com";
        user1.password = passwordHash;
        yield user1.save();
        const user2 = new userModel_1.userModel();
        user2.name = "John Doe";
        user2.email = "johndoe@gmail.com";
        user2.password = passwordHash;
        yield user2.save();
        // seed for books  
        const books = [
            {
                title: "A court of thorns and roses",
                author: "Sarah J Maas",
                description: "When nineteen-year-old huntress Feyre kills a wolf in the woods, a terrifying creature arrives to demand retribution. Dragged to a treacherous magical land she knows about only from legends, Feyre discovers that her captor is not truly a beast, but one of the lethal, immortal faeries who once ruled her world.",
                genre: "Fantasy",
                imageURL: "https://picsum.photos/500/500",
                releaseYear: 2015,
                price: 115,
                stock: 100,
                discount: true,
                discountPct: 10,
                isHidden: false,
                _createdBy: user2.id,
            },
            {
                title: "Fourth wing",
                author: "Rebecca Yarros",
                description: "Twenty-year-old Violet Sorrengail was supposed to enter the Scribe Quadrant, living a quiet life among books and history. Now, the commanding general—also known as her tough-as-talons mother—has ordered Violet to join the hundreds of candidates striving to become the elite of Navarre: dragon riders.",
                genre: "Fantasy",
                imageURL: "https://picsum.photos/500/500",
                releaseYear: 2023,
                price: 169,
                stock: 20,
                discount: true,
                discountPct: 10,
                isHidden: false,
                _createdBy: user1.id,
            },
            {
                title: "Iron flame",
                author: "Rebecca Yarros",
                description: "Everyone expected Violet Sorrengail to die during her first year at Basgiath War College—Violet included. But Threshing was only the first impossible test meant to weed out the weak-willed, the unworthy, and the unlucky.",
                genre: "Fantasy",
                imageURL: "https://picsum.photos/500/500",
                releaseYear: 2023,
                price: 169,
                stock: 30,
                discount: false,
                discountPct: 0,
                isHidden: false,
                _createdBy: user1.id,
            },
            {
                title: "Onyx Storm",
                author: "Rebecca Yarros",
                description: "After nearly eighteen months at Basgiath War College, Violet Sorrengail knows there's no more time for lessons. No more time for uncertainty. Because the battle has truly begun, and with enemies closing in from outside their walls and within their ranks, it's impossible to know who to trust.",
                genre: "Fantasy",
                imageURL: "https://picsum.photos/500/500",
                releaseYear: 2025,
                price: 200,
                stock: 200,
                discount: false,
                discountPct: 0,
                isHidden: false,
                _createdBy: user1.id,
            },
            {
                title: "The housemaid",
                author: "Freidda McFadden",
                description: "Welcome to the family, Nina Winchester says as I shake her elegant, manicured hand. I smile politely, gazing around the marble hallway. Working here is my last chance to start fresh. I can pretend to be whoever I like. But I'll soon learn that the Winchesters' secrets are far more dangerous than my own…",
                genre: "Thriller",
                imageURL: "https://picsum.photos/500/500",
                releaseYear: 2022,
                price: 115,
                stock: 70,
                discount: false,
                discountPct: 0,
                isHidden: false,
                _createdBy: user1.id,
            },
        ];
        // save book _id from MongoDB
        const savedBooks = yield bookModel_1.bookModel.insertMany(books);
        // seed for reviews  
        const reviews = [
            {
                _book: savedBooks[0]._id,
                _createdBy: user1.id,
                rating: 4,
                comment: "Great book",
            },
            {
                _book: savedBooks[2]._id,
                _createdBy: user1.id,
                rating: 7,
                comment: "It was really good",
            },
            {
                _book: savedBooks[3]._id,
                _createdBy: user1.id,
                rating: 10,
                comment: "Even better than the first book",
            },
            {
                _book: savedBooks[4]._id,
                _createdBy: user1.id,
                rating: 7,
                comment: "Great book",
            },
            {
                _book: savedBooks[4]._id,
                _createdBy: user2.id,
                rating: 6,
                comment: "Recommend it",
            },
            {
                _book: savedBooks[3]._id,
                _createdBy: user2.id,
                rating: 8,
                comment: "Was better than expected",
            },
            {
                _book: savedBooks[1]._id,
                _createdBy: user2.id,
                rating: 8,
                comment: "Loved it",
            }
        ];
        yield reviewModel_1.reviewModel.insertMany(reviews);
        console.log("Seeded data successfully.");
    });
}
exports.seedData = seedData;
;
// start seeding
seed();
//# sourceMappingURL=dataSeeder.js.map