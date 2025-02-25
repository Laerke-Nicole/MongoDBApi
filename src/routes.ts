import { Router, Request, Response } from 'express';
import { createProduct, getAllProducts, getProductByID, updateProductByID, deleteProductByID } from './controllers/productController';
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
router.post('/products', verifyToken, createProduct);

// get
router.get('/products', getAllProducts);
router.get('/products/:id', getProductByID);

// update
router.put('/products/:id', verifyToken, updateProductByID);

// delete
router.put('/products/:id', verifyToken, deleteProductByID);

export default router;