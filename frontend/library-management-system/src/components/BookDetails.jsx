"use client"

import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import axios from "../services/api"

const BookDetails = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/books/${id}`)
        setBook(data)
        setLoading(false)
      } catch (err) {
        console.error("Error fetching book details:", err)
        setError("Failed to load book details")
        setLoading(false)
      }
    }
    fetchBook()
  }, [id])

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`/books/${id}`)
        alert("Book deleted successfully!")
        navigate("/")
      } catch (err) {
        console.error("Error deleting book:", err)
        alert("Failed to delete book")
      }
    }
  }

  if (loading) return <h3>Loading...</h3>
  if (error) return <p className="error-message">{error}</p>
  if (!book) return <h3>Book not found</h3>

  return (
    <div className="book-details">
      <div className="book-details-header">
        <button onClick={() => navigate("/")} className="back-button">
          Back to Dashboard
        </button>
        <div className="book-actions">
          <Link to={`/edit-book/${id}`} className="edit-btn">
            Edit
          </Link>
          <button onClick={handleDelete} className="delete-btn">
            Delete
          </button>
        </div>
      </div>
      <h2>{book.title}</h2>
      <div className="book-info">
        <p>
          <strong>Author:</strong> {book.author}
        </p>
        <p>
          <strong>Genre:</strong> {book.genre}
        </p>
        <p>
          <strong>Year:</strong> {book.year}
        </p>
        <p>
          <strong>Description:</strong> {book.description || "No description available"}
        </p>
      </div>
    </div>
  )
}

export default BookDetails

