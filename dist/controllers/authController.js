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
exports.validateUserLoginInfo = exports.validateUserRegistrationInfo = exports.verifyToken = exports.loginUser = exports.registerUser = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const userModel_1 = require("../models/userModel");
const database_1 = require("../repository/database");
/**
* @param req
* @param res
* @returns
*/
// register new user
function registerUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validate the user and password info
            const { error } = validateUserRegistrationInfo(req.body);
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
            yield (0, database_1.connectToDB)();
            // check if email is already registered
            const emailExists = yield userModel_1.userModel.findOne({ email: req.body.email });
            if (emailExists) {
                res.status(400).json({ error: "Email already exists" });
                return;
            }
            // hash password
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, salt);
            // create a user object and save it in the db
            const userObject = new userModel_1.userModel({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            });
            const savedUser = yield userObject.save();
            res.status(200).json({ error: null, data: savedUser._id });
        }
        catch (error) {
            res.status(500).send("Error registering the user. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.registerUser = registerUser;
/**
* @param req
* @param res
* @returns
*/
// login user
function loginUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // validate user info
            const { error } = validateUserLoginInfo(req.body);
            if (error) {
                res.status(400).json({ error: error.details[0].message });
                return;
            }
            // find user
            yield (0, database_1.connectToDB)();
            const user = yield userModel_1.userModel.findOne({ email: req.body.email });
            if (!user) {
                res.status(400).json({ error: "Email or password is wrong." });
                return;
            }
            // if theres a user
            else {
                // create auth token and send it back to the user
                const validPassword = yield bcrypt_1.default.compare(req.body.password, user.password);
                if (!validPassword) {
                    res.status(400).json({ error: "Email or password is wrong." });
                    return;
                }
                const userId = user.id;
                const token = jsonwebtoken_1.default.sign({
                    // payload
                    name: user.name,
                    email: user.email,
                    id: userId
                }, process.env.TOKEN_SECRET, { expiresIn: '2h' });
                // attach token and send back to client
                res.status(200).header("auth-token", token).json({ error: null, data: { userId, token } });
            }
        }
        catch (error) {
            res.status(500).send("Error logging user in. Error: " + error);
        }
        finally {
            yield (0, database_1.disconnectToDB)();
        }
    });
}
exports.loginUser = loginUser;
/**
* @param req
* @param res
* @param next
*/
// middleware logic that verifies token
function verifyToken(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        res.status(400).json({ error: "Access denied." });
        return;
    }
    try {
        if (token)
            jsonwebtoken_1.default.verify(token, process.env.TOKEN_SECRET);
        next();
    }
    catch (_a) {
        res.status(401).send("Invalid token");
    }
}
exports.verifyToken = verifyToken;
/**
* @param data
*/
// validate user registration info 
function validateUserRegistrationInfo(data) {
    const schema = joi_1.default.object({
        name: joi_1.default.string().min(2).max(255).required(),
        email: joi_1.default.string().email().min(6).max(255).required(),
        password: joi_1.default.string().min(6).max(255).required()
    });
    return schema.validate(data);
}
exports.validateUserRegistrationInfo = validateUserRegistrationInfo;
/**
* @param data
*/
// validate user login info 
function validateUserLoginInfo(data) {
    const schema = joi_1.default.object({
        email: joi_1.default.string().email().min(6).max(255).required(),
        password: joi_1.default.string().min(6).max(255).required()
    });
    return schema.validate(data);
}
exports.validateUserLoginInfo = validateUserLoginInfo;
//# sourceMappingURL=authController.js.map