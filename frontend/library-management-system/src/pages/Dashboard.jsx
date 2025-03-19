"use client"

import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "../services/api"

const Dashboard = () => {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    try {
      const { data } = await axios.get("/books")
      setBooks(data)
      setLoading(false)
    } catch (err) {
      console.error("Error fetching books:", err)
      setError("Failed to load books")
      setLoading(false)
    }
  }

  const handleDeleteBook = async (id) => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await axios.delete(`/books/${id}`)
        // Refresh the book list
        fetchBooks()
      } catch (err) {
        console.error("Error deleting book:", err)
        alert("Failed to delete book")
      }
    }
  }

  if (loading) return <h2>Loading...</h2>

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>Library Management System</h2>
        <Link to="/add-book" className="add-book-btn">
          Add New Book
        </Link>
      </div>

      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="book-list">
          <h3>Book List</h3>
          {books.length === 0 ? (
            <p>No books found</p>
          ) : (
            <table className="books-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Year</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {books.map((book) => (
                  <tr key={book._id}>
                    <td>
                      <Link to={`/book/${book._id}`}>{book.title}</Link>
                    </td>
                    <td>{book.author}</td>
                    <td>{book.genre}</td>
                    <td>{book.year}</td>
                    <td className="action-buttons">
                      <Link to={`/edit-book/${book._id}`} className="edit-btn">
                        Edit
                      </Link>
                      <button onClick={() => handleDeleteBook(book._id)} className="delete-btn">
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}

export default Dashboard

