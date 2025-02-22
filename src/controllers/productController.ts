import { Request, Response } from 'express';
import { productModel } from '../models/productModel';
import { connectToDB, disconnectToDB } from '../repository/database';

// CRUD

/**
 * @param req 
 * @param res 
 */
// create product in the data source based on the request body
export async function createProduct(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectToDB();
        const product = new productModel(data);
        const result = await product.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating product. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all products
export async function getAllProducts(req: Request, res: Response) {
    try {
        await connectToDB();
        const result = await productModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting products. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve product by id
export async function getProductByID(req: Request, res: Response) {
    try {
        await connectToDB();

        const id = req.params.id;
        const result = await productModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting product by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve product by id
export async function updateProductByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await productModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("Product cant be found with id: " + id);
        }
        else {
            res.status(200).send("Product was updated successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error updating product by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}



/**
 * @param req 
 * @param res 
 */
// delete product by id
export async function deleteProductByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await productModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Cant delete product with id=: " + id);
        }
        else {
            res.status(200).send("Product was deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error deleting product by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}