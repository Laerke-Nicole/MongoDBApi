import { Request, Response } from 'express';
import { reviewModel } from '../models/reviewModel';
import { connectToDB, disconnectToDB } from '../repository/database';

// CRUD

/**
 * @param req 
 * @param res 
 */
// create review in the data source based on the request body
export async function createReview(req: Request, res: Response): Promise<void> {
    const data = req.body;
    try {
        await connectToDB();
        const review = new reviewModel(data);
        const result = await review.save();

        res.status(201).send(result);
    }
    catch (error) {
        res.status(500).send("Error creating review. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve all reviews
export async function getAllReviews(req: Request, res: Response) {
    try {
        await connectToDB();
        const result = await reviewModel.find({});
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting reviews. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}

/**
 * @param req 
 * @param res 
 */
// get/retrieve review by id
export async function getReviewByID(req: Request, res: Response) {
    try {
        await connectToDB();

        const id = req.params.id;
        const result = await reviewModel.find({ _id: id });
        
        res.status(200).send(result);
    }
    catch (error) {
        res.status(500).send("Error getting review by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}


/**
 * @param req 
 * @param res 
 */
// get/retrieve review by id
export async function updateReviewByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await reviewModel.findByIdAndUpdate(id, req.body);

        if (!result) {
            res.status(404).send("Review cant be found with id: " + id);
        }
        else {
            res.status(200).send("Review was updated successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error updating review by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}



/**
 * @param req 
 * @param res 
 */
// delete review by id
export async function deleteReviewByID(req: Request, res: Response) {

    const id = req.params.id;
    try {
        await connectToDB();

        const result = await reviewModel.findByIdAndDelete(id);

        if (!result) {
            res.status(404).send("Cant delete review with id=: " + id);
        }
        else {
            res.status(200).send("Review was deleted successfully");
        }
    }
    catch (error) {
        res.status(500).send("Error deleting review by id. Error: " + error);
    }
    finally {
        await disconnectToDB();
    }
}