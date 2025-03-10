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
const faker_1 = require("@faker-js/faker");
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
        user1.name = faker_1.faker.person.fullName();
        user1.email = faker_1.faker.internet.email();
        user1.password = passwordHash;
        yield user1.save();
        const user2 = new userModel_1.userModel();
        user2.name = faker_1.faker.person.fullName();
        user2.email = faker_1.faker.internet.email();
        user2.password = passwordHash;
        yield user2.save();
        // seed for books  
        const books = [
            {
                title: faker_1.faker.lorem.words(),
                author: faker_1.faker.person.firstName(),
                description: faker_1.faker.string.alpha(),
                genre: faker_1.faker.lorem.word(),
                imageURL: faker_1.faker.image.url(),
                releaseYear: faker_1.faker.date.past({ years: 50 }).getFullYear(),
                price: faker_1.faker.number.int(),
                stock: faker_1.faker.number.int(),
                discount: true,
                discountPct: faker_1.faker.number.int(),
                isHidden: false,
                _createdBy: user2.id,
            },
        ];
        // save book _id from MongoDB
        const savedBooks = yield bookModel_1.bookModel.insertMany(books);
        // seed for reviews  
        const reviews = [
            {
                _book: savedBooks[0]._id,
                _createdBy: user1.id,
                rating: faker_1.faker.number.int(),
                comment: faker_1.faker.string.alpha(),
            },
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