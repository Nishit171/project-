import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AddBook from './components/AddBook';
import BookDetails from './components/BookDetails';
import NotFound from './pages/NotFound';
import PrivateRoute from './utils/PrivateRoutes';
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={<PrivateRoute component={Dashboard} />}
        />
        <Route
          path="/add-book"
          element={<PrivateRoute component={AddBook} admin />}
        />
        <Route
          path="/book/:id"
          element={<PrivateRoute component={BookDetails} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
