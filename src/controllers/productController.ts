import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connectToDB, disconnectToDB } from '../repository/database';

// CRUD

/**
 * create new product in the data source based on the request body
 * @param req 
 * @param res 
 */

export async function createProduct(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectToDB();
        const product = new productModel(data);
        const result = await product.save();
        res.status(201).send(result);
    }
    catch {
        res.status(500).send('Error creating product');
    }
    finally {
        await disconnectToDB();
    }
}