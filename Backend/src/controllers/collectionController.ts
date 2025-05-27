import { Request, Response } from 'express';
import { collectionModel } from '../models/collectionModel';
import { connectToDB, disconnectToDB } from '../repository/database';

// CRUD

/**
 * @param req 
 * @param res 
 */
// create collection in the data source based on the request body
export async function createCollection(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectToDB();
        const collection = new collectionModel(data);
        const result = await collection.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating collection. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all collections
export async function getAllCollections(req: Request, res: Response) {
    try {
        await connectToDB();
        const result = await collectionModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting collections. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve collection by id
export async function getCollectionByID(req: Request, res: Response) {
    try {
        await connectToDB();

        const id = req.params.id;
        const result = await collectionModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting collection by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve collection by id
export async function updateCollectionByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await collectionModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("Collection cant be found with id: " + id);
        }
        else {
            res.status(200).send("Collection was updated successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error updating collection by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}



/**
 * @param req 
 * @param res 
 */
// delete collection by id
export async function deleteCollectionByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await collectionModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Cant delete collection with id=: " + id);
        }
        else {
            res.status(200).send("Collection was deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error deleting collection by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}