const express = require('express');
const { getBooks, addBook, getBookById } = require('../controllers/bookController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', getBooks);
router.post('/add', protect, addBook);
router.get('/:id', getBookById); 

module.exports = router;
