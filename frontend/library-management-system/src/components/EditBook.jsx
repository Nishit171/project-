"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "../services/api"

const EditBook = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  })

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const { data } = await axios.get(`/books/${id}`)
        setFormData({
          title: data.title,
          author: data.author,
          genre: data.genre,
          year: data.year,
          description: data.description || "",
        })
        setLoading(false)
      } catch (err) {
        console.error("Error fetching book:", err)
        setError("Failed to load book data")
        setLoading(false)
      }
    }

    fetchBook()
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`/books/${id}`, formData)
      alert("Book updated successfully!")
      navigate("/")
    } catch (err) {
      console.error("Error updating book:", err)
      setError("Failed to update book. Please try again.")
    }
  }

  if (loading) return <h2>Loading...</h2>
  if (error) return <p className="error-message">{error}</p>

  return (
    <div className="form-container">
      <h2>Edit Book</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
          required
        />
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={(e) => setFormData({ ...formData, year: Number.parseInt(e.target.value) })}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        ></textarea>
        <div className="form-buttons">
          <button type="submit">Update Book</button>
          <button type="button" onClick={() => navigate("/")} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditBook

