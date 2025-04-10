import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SearchBar from '../search/SearchBar';

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center">
          <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h2v-2h-2zM7 11h6v4H7v-4zm8-2V5h2v4h-2zM5 5v4H3V5h2zm0 6H3v4h2v-4zm14 2v2h-2v-2h2z" clipRule="evenodd" />
          </svg>
          Movie Library
        </Link>

        {/* Search Bar */}
        <div className="flex-grow mx-4 max-w-xl">
          <SearchBar />
        </div>

        {/* Navigation */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link 
                to="/" 
                className="hover:text-blue-200 transition duration-300"
              >
                Beranda
              </Link>
            </li>
            <li>
              <Link 
                to="/genres" 
                className="hover:text-blue-200 transition duration-300"
              >
                Genre
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;