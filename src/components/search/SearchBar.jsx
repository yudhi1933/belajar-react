import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    // Hapus spasi berlebih dan validasi input
    const trimmedQuery = query.trim();
    
    if (trimmedQuery) {
      // Navigasi ke halaman pencarian dengan query
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setQuery(''); // Reset input setelah pencarian
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <div className="relative">
        <input 
          type="text" 
          placeholder="Cari film..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-blue-700 text-white 
                     placeholder-blue-300 focus:outline-none 
                     focus:ring-2 focus:ring-blue-400 transition duration-300"
        />
        <button 
          type="submit" 
          className="absolute right-0 top-0 mt-1 mr-1 bg-white 
                     text-blue-600 rounded-full p-2 hover:bg-blue-100 
                     transition duration-300"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default SearchBar;