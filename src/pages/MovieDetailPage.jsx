import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieService from '../services/MovieService';

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        setLoading(true);
        const movieDetails = await MovieService.getMovieDetails(id);
        setMovie(movieDetails);
        setLoading(false);
      } catch (err) {
        console.error('Kesalahan memuat detail film:', err);
        setError('Gagal memuat detail film. Silakan coba lagi.');
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

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

  if (!movie) {
    return <div className="text-center mt-10">Film tidak ditemukan</div>;
  }

  const imageUrl = MovieService.getImageUrl(movie.poster_path);
  const backdropUrl = MovieService.getImageUrl(movie.backdrop_path);

  return (
    <div className="relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center filter blur-sm opacity-30" 
        style={{ backgroundImage: `url(${backdropUrl})` }}
      ></div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="grid md:grid-cols-3 gap-8">
          {/* Poster Film */}
          <div className="md:col-span-1">
            <img 
              src={imageUrl} 
              alt={movie.title} 
              className="w-full rounded-lg shadow-xl"
            />
          </div>

          {/* Detail Film */}
          <div className="md:col-span-2 bg-white bg-opacity-90 p-6 rounded-lg shadow-md">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            
            <div className="flex items-center space-x-4 mb-4">
              <span className="text-yellow-500 text-xl flex items-center">
                <svg className="w-6 h-6 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {movie.vote_average.toFixed(1)}
              </span>
              <span>{movie.release_date}</span>
              <span>{movie.runtime} menit</span>
            </div>

            <div className="mb-4">
              {movie.genres.map((genre) => (
                <span 
                  key={genre.id} 
                  className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full mr-2 mb-2"
                >
                  {genre.name}
                </span>
              ))}
            </div>

            <h2 className="text-2xl font-semibold mt-6 mb-3">Sinopsis</h2>
            <p className="text-gray-700 mb-6">{movie.overview}</p>

            <h2 className="text-2xl font-semibold mb-3">Pemeran Utama</h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {movie.cast.map((actor) => (
                <div 
                  key={actor.id} 
                  className="text-center"
                >
                  <img 
                    src={MovieService.getImageUrl(actor.profile_path)} 
                    alt={actor.name}
                    className="w-full rounded-lg mb-2 object-cover h-64"
                  />
                  <p className="font-medium truncate">{actor.name}</p>
                  <p className="text-sm text-gray-600 truncate">{actor.character}</p>
                </div>
              ))}
            </div>

            {/* Informasi Tambahan */}
            <div className="mt-8 border-t pt-6">
              <h2 className="text-2xl font-semibold mb-4">Informasi Tambahan</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-bold">Status</h3>
                  <p>{movie.status}</p>
                </div>
                <div>
                  <h3 className="font-bold">Bahasa Asli</h3>
                  <p>{movie.original_language}</p>
                </div>
                <div>
                  <h3 className="font-bold">Pendapatan</h3>
                  <p>
                    {movie.revenue > 0 
                      ? `$${movie.revenue.toLocaleString()}` 
                      : 'Tidak tersedia'}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold">Produksi</h3>
                  <p>
                    {movie.production_companies
                      .map(company => company.name)
                      .join(', ') || 'Tidak diketahui'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;