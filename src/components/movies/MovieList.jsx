import React from 'react';
import MovieCard from './MovieCard';
import Loader from '../common/Loader';

const MovieList = ({ 
  movies, 
  loading = false, 
  error = null, 
  onPageChange, 
  currentPage, 
  totalPages 
}) => {
  if (loading) {
    return <Loader text="Memuat film..." />;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>{error}</p>
      </div>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        <p>Tidak ada film ditemukan</p>
      </div>
    );
  }

  return (
    <div>
      {/* Grid Film */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          {currentPage > 1 && (
            <button 
              onClick={() => onPageChange(currentPage - 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Sebelumnya
            </button>
          )}
          
          <span className="self-center text-gray-700">
            Halaman {currentPage} dari {totalPages}
          </span>

          {currentPage < totalPages && (
            <button 
              onClick={() => onPageChange(currentPage + 1)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300"
            >
              Selanjutnya
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default MovieList;