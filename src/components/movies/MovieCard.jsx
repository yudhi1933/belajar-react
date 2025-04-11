import React from "react";
import { Link } from "react-router-dom";
import MovieService from "../../services/MovieService";

const MovieCard = ({ movie }) => {
  const { id, title, poster_path, vote_average, release_date } = movie;

  const imageUrl = MovieService.getImageUrl(poster_path);

  return (
    <div className="movie-card group relative overflow-hidden rounded-lg shadow-lg transition-transform duration-300 hover:scale-105">
      <Link to={`/movie/${id}`}>
        <div className="relative">
          {/* Poster Film */}
          <img src={imageUrl} alt={title} className="w-full h-[450px] object-cover" />

          {/* Overlay Informasi */}
          <div className="absolute inset-0 group-hover:bg-opacity-50 transition-all duration-300 flex flex-col justify-end p-4">
            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-lg font-bold truncate">{title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-yellow-400 flex items-center">
                  <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  {vote_average.toFixed(1)}
                </span>
                <span className="text-sm">{new Date(release_date).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
