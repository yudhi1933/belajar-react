// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManagement from './pages/crud/UserManagement';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter as Routes, Route } from 'react-router-dom';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultPage';
// import SearchResultsPage from './pages/SearchResultsPage';
// import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/crud" element={<UserManagement />} />
        <Route path="/movie/:id" element={<MovieDetailPage />} />
            <Route path="/search" element={<SearchResultsPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
