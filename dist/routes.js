"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("./controllers/bookController");
const reviewController_1 = require("./controllers/reviewController");
const authController_1 = require("./controllers/authController");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /:
 *   get:
 *     tags:
 *       - App Routes
 *     summary: Health check
 *     description: Health check
 *     responses:
 *       200:
 *         description: Hello, world!
 */
router.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});
// auth
// register a user
/**
 * @swagger
 * /user/register:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Register a user
 *     description: Register a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: User created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post('/user/register', authController_1.registerUser);
// login
/**
 * @swagger
 * /user/login:
 *   post:
 *     tags:
 *       - User Routes
 *     summary: Login
 *     description: Login in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       201:
 *         description: Logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.post('/user/login', authController_1.loginUser);
// CRUD for books
// create router
/**
 * @swagger
 * /books:
 *   post:
 *     tags:
 *       - Book Routes
 *     summary: Create a book
 *     description: Create a book
 *     security:
 *       - ApiKeyAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.post('/books', authController_1.verifyToken, bookController_1.createBook);
// get
/**
 * @swagger
 * /books:
 *   get:
 *     tags:
 *       - Book Routes
 *     summary: Get all books
 *     description: Get all books
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Got all books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.get('/books', bookController_1.getAllBooks);
// get book by ID
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags:
 *       - Book Routes
 *     summary: Get book by ID
 *     description: Get book by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Got book by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.get('/books/:id', bookController_1.getBookByID);
// update
/**
 * @swagger
 * /books/{id}:
 *   put:
 *     tags:
 *       - Book Routes
 *     summary: Update a book by ID
 *     description: Update a book by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.put('/books/:id', authController_1.verifyToken, bookController_1.updateBookByID);
// delete
/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     tags:
 *       - Book Routes
 *     summary: Delete a book by ID
 *     description: Delete a book by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       200:
 *         description: Book deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */
router.delete('/books/:id', authController_1.verifyToken, bookController_1.deleteBookByID);
// CRUD for reivews
// create router
/**
 * @swagger
 * /reviews:
 *   post:
 *     tags:
 *       - Review Routes
 *     summary: Create a review
 *     description: Create a review
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.post('/reviews', authController_1.verifyToken, reviewController_1.createReview);
// get
/**
 * @swagger
 * /reviews:
 *   get:
 *     tags:
 *       - Review Routes
 *     summary: Get all reviews
 *     description: Get all reviews
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Got all reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.get('/reviews', reviewController_1.getAllReviews);
// get review by ID
/**
 * @swagger
 * /reviews/{id}:
 *   get:
 *     tags:
 *       - Review Routes
 *     summary: Get review by ID
 *     description: Get review by ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       201:
 *         description: Got review by ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                 _id:
 *                   type: string
 */
router.get('/reviews/:id', reviewController_1.getReviewByID);
// update
/**
 * @swagger
 * /reviews/{id}:
 *   put:
 *     tags:
 *       - Review Routes
 *     summary: Update a review by ID
 *     description: Update a review by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.put('/reviews/:id', authController_1.verifyToken, reviewController_1.updateReviewByID);
// delete
/**
 * @swagger
 * /reviews/{id}:
 *   delete:
 *     tags:
 *       - Review Routes
 *     summary: Delete a review by ID
 *     description: Delete a review by ID
 *     security:
 *       - ApiKeyAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Review'
 *     responses:
 *       200:
 *         description: Review deleted
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Review'
 */
router.delete('/reviews/:id', authController_1.verifyToken, reviewController_1.deleteReviewByID);
exports.default = router;
//# sourceMappingURL=routes.js.map