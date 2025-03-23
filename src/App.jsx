// import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import UserManagement from './pages/crud/UserManagement';

function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/about" element={<h1>About</h1>} />
        <Route path="/crud" element={<UserManagement />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
