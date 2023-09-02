import { useState } from "react"
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
const CreateBook = () => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [publishYear, setPublishYear] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            title,
            author,
            publishYear
        }
        setLoading(true)
        try {
            await axios.post('http://localhost:3000/books', data)
            setLoading(false)
            navigate('/')
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }
    return (
        <div className="p-4">
            <BackButton />
            <h1>Create Book</h1>
            {loading && <Spinner />}
            <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
                <div className="my-4">
                    <label className="text-xl">Title</label>
                    <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border-2 border-gray-500 px-3 py-2 w-full" />
                </div>
                <div className="my-4">
                    <label className="text-xl">Author</label>
                    <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)} className="border-2 border-gray-500 px-3 py-2 w-full" />
                </div>
                <div className="my-4">
                    <label className="text-xl">Publish Year</label>
                    <input type="text" value={publishYear} onChange={(e) => setPublishYear(e.target.value)} className="border-2 border-gray-500 px-3 py-2 w-full" />
                </div>
                <button className="p-2 bg-sky-300 m-8" onClick={handleSubmit}>Save</button>
            </div>
        </div>
    )
}

export default CreateBook