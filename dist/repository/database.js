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
exports.disconnectToDB = exports.connectToDB = exports.testConnection = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// test connection to database
function testConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connectToDB();
            yield disconnectToDB();
            console.log("Testing connecting to database was successful (connection and disconnection)");
        }
        catch (error) {
            console.log("Error while testing connecting to database: " + error);
        }
    });
}
exports.testConnection = testConnection;
// connect to database
function connectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!process.env.DBHOST) {
                throw new Error("DBHOST is not found in environment variables");
            }
            yield mongoose_1.default.connect(process.env.DBHOST);
            if (mongoose_1.default.connection.db) {
                yield mongoose_1.default.connection.db.admin().command({ ping: 1 });
                console.log('Connected to database');
            }
            else {
                throw new Error("Error when connecting to database");
            }
        }
        catch (error) {
            console.log("Error connecting to database: " + error);
        }
    });
}
exports.connectToDB = connectToDB;
// disconnect from database
function disconnectToDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.disconnect();
            console.log('Disconnected database');
        }
        catch (error) {
            console.log("Error disconnecting database: " + error);
        }
    });
}
exports.disconnectToDB = disconnectToDB;
//# sourceMappingURL=database.js.map