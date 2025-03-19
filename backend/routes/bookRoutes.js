const express = require("express")
const { getBooks, addBook, getBookById, updateBook, deleteBook } = require("../controllers/bookController")

const router = express.Router()

router.get("/", getBooks)
router.post("/", addBook)
router.get("/:id", getBookById)
router.put("/:id", updateBook)
router.delete("/:id", deleteBook)

module.exports = router

