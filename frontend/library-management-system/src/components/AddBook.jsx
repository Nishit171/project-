"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "../services/api"

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    year: "",
    description: "",
  })
  const [error, setError] = useState("")
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("/books", formData)
      alert("Book added successfully!")
      navigate("/")
    } catch (err) {
      console.error("Error adding book:", err)
      setError("Failed to add book. Please try again.")
    }
  }

  return (
    <div className="form-container">
      <h2>Add New Book</h2>
      {error && <p className="error-message">{error}</p>}
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
          <button type="submit">Add Book</button>
          <button type="button" onClick={() => navigate("/")} className="cancel-btn">
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddBook

