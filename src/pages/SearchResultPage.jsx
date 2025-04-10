import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import MovieList from '../components/movies/MovieList';
import MovieService from '../services/MovieService';

const SearchResultsPage = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  // Dapatkan query pencarian dari URL
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      // Reset state sebelum pencarian
      setLoading(true);
      setError(null);

      if (!query) {
        setLoading(false);
        setError('Masukkan kata kunci pencarian');
        return;
      }

      try {
        const { movies, totalPages } = await MovieService.searchMovies(query, page);
        
        setMovies(movies);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Kesalahan pencarian film:', err);
        setError('Gagal mencari film. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query, page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Hasil Pencarian: "{query}"
      </h1>

      <MovieList 
        movies={movies}
        loading={loading}
        error={error}
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {!loading && movies.length === 0 && (
        <div className="text-center text-gray-600 mt-8">
          <p>Tidak ada film ditemukan untuk pencarian "{query}"</p>
          <p className="mt-4">Coba kata kunci lain atau periksa ejaan Anda</p>
        </div>
      )}
    </div>
  );
};

export default SearchResultsPage;