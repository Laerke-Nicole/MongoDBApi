import { 
    type Request,
    type Response,
    type NextFunction
} from 'express';

import jwt from 'jsonwebtoken';

import bcrypt from 'bcrypt';
import Joi, { ValidationResult } from 'joi';

import { userModel } from '../models/userModel';
import { User } from '../interfaces/user';
import { connectToDB, disconnectToDB } from '../repository/database';

/**
* @param req
* @param res
* @returns
*/
// register new user

export async function registerUser(req: Request, res: Response) {
    try {
        // validate the user and password info
        const { error } = validateUserRegistrationInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }

        await connectToDB();
        // check if email is already registered
        const emailExists = await userModel.findOne({ email: req.body.email });

        if (emailExists) {
            res.status(400).json({ error: "Email already exists" });
            return;
        }

        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create a user object and save it in the db
        const userObject = new userModel({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        const savedUser = await userObject.save();
        res.status(201).json({ error: null, data: savedUser._id });

    }
    catch (error) {
        res.status(500).send("Error registering the user. Error: " + error)
    }
    finally {
        await disconnectToDB();
    }
}




/**
* @param req
* @param res
* @returns
*/
// login user
export async function loginUser(req: Request, res: Response) {
    try {
        // validate user info
        const { error } = validateUserLoginInfo(req.body);

        if (error) {
            res.status(400).json({ error: error.details[0].message });
            return;
        }


        // find user
        await connectToDB();

        const user: User | null = await userModel.findOne({ email: req.body.email });

        if (!user) {
            res.status(400).json({ error: "Email or password is wrong." });
            return;
        }
        // if theres a user
        else {
            // create auth token and send it back to the user
            const validPassword: boolean = await bcrypt.compare(req.body.password, user.password);   

            if (!validPassword) {
                res.status(400).json({ error: "Email or password is wrong." });
                return;
            }

            const userId: string = user.id;
            const token: string = jwt.sign(
                {
                    // payload
                    name: user.name,
                    email: user.email,
                    id: userId
                },
                process.env.TOKEN_SECRET as string,
                { expiresIn: '2h' }
            );
            // attach token and send back to client
            res.status(200).header("auth-token", token).json({ error: null, data: { userId, token } });
        }
    }
    catch (error) {
        res.status(500).send("Error logging user in. Error: " + error)
    }
    finally {
        await disconnectToDB();
    }
}


/**
* @param req
* @param res
* @param next
*/
// middleware logic that verifies token
export function verifyToken(req: Request, res: Response, next: NextFunction) {
    const token = req.header('auth-token');

    if (!token) {
        res.status(400).json({ error: "Access denied." });
        return;
    }

    try {
        if (token)
            jwt.verify(token, process.env.TOKEN_SECRET as string);
        next();
    }
    catch {
        res.status(401).send("Invalid token");
    }
}



/**
* @param data
*/
// validate user registration info 
export function validateUserRegistrationInfo(data: User): ValidationResult {
    const schema = Joi.object({
        name: Joi.string().min(2).max(255).required(),
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
}


/**
* @param data
*/
// validate user login info 
export function validateUserLoginInfo(data: User): ValidationResult {
    const schema = Joi.object({
        email: Joi.string().email().min(6).max(255).required(),
        password: Joi.string().min(6).max(255).required()
    });
    return schema.validate(data);
}