import { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"
import BackButton from "../components/BackButton"
import Spinner from "../components/Spinner"
const ShowBook = () => {
    const [book, setBook] = useState({})
    const [loading, setLoading] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:3000/books/' + id).then((res) => {
            setBook(res.data)
            setLoading(false)
        }).catch((err) => {
            console.error(err)
            setLoading(false)
        })
    }, [])
    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3xl my-4">Show Book </h1>
            {
                loading ? (<Spinner />) : (
                    <section className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
                        <div className="my-3">{book._id}</div>
                        <div className="my-3">{book.title}</div>
                        <div className="my-3">{book.author}</div>
                        <div className="my-3">{book.publishYear}</div>
                        <div className="my-3">Created At: {new Date(book.createdAt).toLocaleDateString().toString()}</div>
                        <div className="my-3">Updated At: {new Date(book.updatedAt).toLocaleDateString().toString()}</div>
                    </section>
                )
            }
        </div>
    )
}

export default ShowBook