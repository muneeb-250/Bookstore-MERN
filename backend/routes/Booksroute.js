import express from "express";
import { Book } from '../models/bookModel.js'
const router = express.Router();



//GET all books 
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({})
        const updatedBooks = {
            count: books.length,
            books
        }
        res.status(200).send(updatedBooks)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})
//GET one book by id 
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const book = await Book.findById(id)
        if (!book) {
            return res.status(404).send({ message: "Book not found" })
        }
        res.status(200).send(book)
    } catch (error) {
        res.status(500).send({ message: error.message })
    }
})

//POST a book
router.post('/', async (req, res) => {

    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Input all required fields"
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        }
        const book = await Book.create(newBook)
        return res.status(201).send(book)

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }

})

//PUT a book (update)
router.put('/:id', async (req, res) => {

    try {
        if (
            !req.body.title || !req.body.author || !req.body.publishYear
        ) {
            return res.status(400).send({
                message: "Input all required fields"
            })
        }
        const { id } = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).send({
                message: "Book not found"
            })
        }
        return res.status(200).send(result)

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}
)
//DELETE a book
router.delete('/:id', async (req, res) => {

    try {
        const { id } = req.params;
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).send({
                message: "Book not found"
            })
        }
        return res.status(200).send({ messasge: "Book deleted successfully" })

    } catch (error) {
        res.status(500).send({
            message: error.message
        })
    }
}
)


export default router;