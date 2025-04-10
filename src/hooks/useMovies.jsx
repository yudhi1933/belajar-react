import { useState, useEffect } from 'react';
import MovieService from '../services/MovieService';

export const useMovies = (fetchMethod, initialPage = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);

        // Panggil metode fetch yang diberikan
        const { movies, totalPages } = await fetchMethod(page);
        
        setMovies(movies);
        setTotalPages(totalPages);
        setLoading(false);
      } catch (err) {
        console.error('Kesalahan memuat film:', err);
        setError('Gagal memuat film. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page, fetchMethod]);

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    movies,
    loading,
    error,
    page,
    totalPages,
    handlePageChange
  };
};

// Hook untuk detail film
export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieDetails = await MovieService.getMovieDetails(movieId);
        setMovie(movieDetails);
        setLoading(false);
      } catch (err) {
        console.error('Kesalahan memuat detail film:', err);
        setError('Gagal memuat detail film. Silakan coba lagi.');
        setLoading(false);
      }
    };

    if (movieId) {
      fetchMovieDetails();
    }
  }, [movieId]);

  return { movie, loading, error };
};