"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bookController_1 = require("./controllers/bookController");
const authController_1 = require("./controllers/authController");
const router = (0, express_1.Router)();
router.get('/', (req, res) => {
    res.status(200).send('Hello, world!');
});
// auth
router.post('/user/register', authController_1.registerUser);
router.post('/user/login', authController_1.loginUser);
// CRUD
// create router
router.post('/books', authController_1.verifyToken, bookController_1.createBook);
// get
router.get('/books', bookController_1.getAllBooks);
router.get('/books/:id', bookController_1.getBookByID);
// update
router.put('/books/:id', authController_1.verifyToken, bookController_1.updateBookByID);
// delete
router.put('/books/:id', authController_1.verifyToken, bookController_1.deleteBookByID);
exports.default = router;
//# sourceMappingURL=routes.js.map