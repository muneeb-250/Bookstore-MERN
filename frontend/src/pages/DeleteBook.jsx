import { useState } from "react"
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"
const DeleteBook = () => {
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { id } = useParams()

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        axios.delete(`http://localhost:3000/books/${id}`)
            .then(() => {
                setLoading(false)
                navigate('/')
            })
            .catch(error => {
                console.log(error)
                setLoading(false)
            })
    }
    return (
        <div className="p-4">
            <BackButton />
            <h1>Delete Book</h1>
            {loading && <Spinner />}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <h3 className="text-2xl">Are you sure you want to delete this book?</h3>
                <button className="px-4 py-2 bg-red-500 text-white rounded-md shadow-lg ring-0" onClick={handleSubmit}>Delete</button>
            </div>
        </div>
    )
}

export default DeleteBook