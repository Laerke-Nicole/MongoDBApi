import { Router, Request, Response } from 'express';
import { createProduct, getAllProducts, getProductByID, updateProductByID, deleteProductByID } from './controllers/productController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, world!');
});


// CRUD
// create router
router.post('/products', createProduct);

// get
router.get('/products', getAllProducts);

// get
router.get('/products/:id', getProductByID);

// update
router.put('/products/:id', updateProductByID);

// delete
router.put('/products/:id', deleteProductByID);

export default router;