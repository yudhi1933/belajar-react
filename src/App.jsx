// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManagement from './pages/crud/UserManagement';
import MovieDetailPage from './pages/MovieDetailPage';
import SearchResultsPage from './pages/SearchResultPage';

import MenuIndex from './pages/Restaurant/MenuIndex';
import CreateMenu from './pages/Restaurant/CreateMenu';
import UpdateMenu from './pages/Restaurant/UpdateMenu';
import DeleteMenu from './pages/Restaurant/DeleteMenu';


function App() {
  return (
    <BrowserRouter basename="/belajar-react">
      {/* <Navbar /> */}
      <Routes>
        {/* CRUD Routes */}
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/crud" element={<UserManagement />} />

        {/* Movie Routes */}
        <Route path="/movie/:id" element={<MovieDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />

        {/* restaurant Routes */}
        <Route path="/restaurant" element={<MenuIndex />} />
        <Route path="/restaurant/create" element={<CreateMenu />} />
        <Route path="/restaurant/edit/:id" element={<UpdateMenu />} />
        <Route path="/restaurant/delete/:id" element={<DeleteMenu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
