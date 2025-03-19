import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../services/api';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      const { data } = await axios.get(`/api/books/${id}`);
      setBook(data);
    };
    fetchBook();
  }, [id]);

  if (!book) return <h3>Loading...</h3>;

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <p>Genre: {book.genre}</p>
      <p>Year: {book.year}</p>
      <p>Description: {book.description}</p>
    </div>
  );
};

export default BookDetails;
