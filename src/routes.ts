import { Router, Request, Response } from 'express';
import { createBook, getAllBooks, getBookByID, updateBookByID, deleteBookByID } from './controllers/bookController';
import { createReview, getAllReviews, getReviewByID, updateReviewByID, deleteReviewByID } from './controllers/reviewController';
import { registerUser, loginUser, verifyToken } from './controllers/authController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, world!');
});

// auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);


// CRUD for books
// create router
router.post('/books', verifyToken, createBook);

// get
router.get('/books', getAllBooks);
router.get('/books/:id', getBookByID);

// update
router.put('/books/:id', verifyToken, updateBookByID);

// delete
router.delete('/books/:id', verifyToken, deleteBookByID);




// CRUD for reivews
// create router
router.post('/reviews', verifyToken, createReview);

// get
router.get('/reviews', getAllReviews);
router.get('/reviews/:id', getReviewByID);

// update
router.put('/reviews/:id', verifyToken, updateReviewByID);

// delete
router.delete('/reviews/:id', verifyToken, deleteReviewByID);



export default router;