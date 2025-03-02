import { Router, Request, Response } from 'express';
import { createBook, getAllBooks, getBookByID, updateBookByID, deleteBookByID } from './controllers/bookController';
import { registerUser, loginUser, verifyToken } from './controllers/authController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, world!');
});

// auth
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);


// CRUD
// create router
router.post('/books', verifyToken, createBook);

// get
router.get('/books', getAllBooks);
router.get('/books/:id', getBookByID);

// update
router.put('/books/:id', verifyToken, updateBookByID);

// delete
router.put('/books/:id', verifyToken, deleteBookByID);

export default router;