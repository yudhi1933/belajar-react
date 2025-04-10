import React, { useState, useEffect } from 'react';
import MovieCard from '../components/movies/MovieCard';
import MovieService from '../services/MovieService';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        setLoading(true);
        const { movies, totalPages } = await MovieService.getPopularMovies(page);
        setMovies(movies);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Kesalahan memuat film:', err);
        setError('Gagal memuat film. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, [page]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Film Populer</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-4">
        {page > 1 && (
          <button 
            onClick={() => handlePageChange(page - 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Sebelumnya
          </button>
        )}
        
        {page < totalPages && (
          <button 
            onClick={() => handlePageChange(page + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
          >
            Selanjutnya
          </button>
        )}
      </div>
    </div>
  );
};

export default HomePage;