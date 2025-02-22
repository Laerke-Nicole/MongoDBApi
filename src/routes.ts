import { Router, Request, Response } from 'express';
import { createProduct } from './controllers/productController';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
    res.status(200).send('Hello, world!');
});

// CRUD
// create router
router.post('/products', createProduct);

export default router;