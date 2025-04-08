import { Request, Response } from 'express';
import { bookModel } from '../models/bookModel';
import { connectToDB, disconnectToDB } from '../repository/database';

// CRUD

/**
 * @param req 
 * @param res 
 */
// create book in the data source based on the request body
export async function createBook(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectToDB();
        const book = new bookModel(data);
        const result = await book.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating book. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all books
export async function getAllBooks(req: Request, res: Response) {
    try {
        await connectToDB();
        const result = await bookModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting books. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve book by id
export async function getBookByID(req: Request, res: Response) {
    try {
        await connectToDB();

        const id = req.params.id;
        const result = await bookModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting book by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve book by id
export async function updateBookByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await bookModel.findByIdAndUpdate(id, req.body);

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
        await disconnectToDB();
    }
}



/**
 * @param req 
 * @param res 
 */
// delete book by id
export async function deleteBookByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await bookModel.findByIdAndDelete(id);

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
        await disconnectToDB();
    }
}