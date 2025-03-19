import React, { useState } from 'react';
import axios from '../services/api';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    year: '',
    description: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('/api/books', formData);
    alert('Book added successfully!');
  };

  return (
    <div>
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" onChange={(e) => setFormData({ ...formData, title: e.target.value })} required />
        <input type="text" name="author" placeholder="Author" onChange={(e) => setFormData({ ...formData, author: e.target.value })} required />
        <input type="text" name="genre" placeholder="Genre" onChange={(e) => setFormData({ ...formData, genre: e.target.value })} required />
        <input type="number" name="year" placeholder="Year" onChange={(e) => setFormData({ ...formData, year: e.target.value })} required />
        <textarea name="description" placeholder="Description" onChange={(e) => setFormData({ ...formData, description: e.target.value })}></textarea>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
