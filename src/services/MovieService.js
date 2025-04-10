import axios from 'axios';

class MovieService {
  constructor() {
    // this.apiKey = process.env.REACT_APP_TMDB_API_KEY;
    this.baseUrl = 'https://api.themoviedb.org/3';
    this.imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
  }

  // Dapatkan film populer
  async getPopularMovies(page = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/movie/popular`, {
        params: {
          api_key: this.apiKey,
          page: page
        }
      });
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Kesalahan memuat film populer:', error);
      throw error;
    }
  }

  // Cari film
  async searchMovies(query, page = 1) {
    try {
      const response = await axios.get(`${this.baseUrl}/search/movie`, {
        params: {
          api_key: this.apiKey,
          query: query,
          page: page
        }
      });
      return {
        movies: response.data.results,
        totalPages: response.data.total_pages
      };
    } catch (error) {
      console.error('Kesalahan mencari film:', error);
      throw error;
    }
  }

  // Dapatkan detail film
  async getMovieDetails(movieId) {
    try {
      const [details, credits] = await Promise.all([
        axios.get(`${this.baseUrl}/movie/${movieId}`, {
          params: { api_key: this.apiKey }
        }),
        axios.get(`${this.baseUrl}/movie/${movieId}/credits`, {
          params: { api_key: this.apiKey }
        })
      ]);

      return {
        ...details.data,
        cast: credits.data.cast.slice(0, 5),
        crew: credits.data.crew
      };
    } catch (error) {
      console.error('Kesalahan memuat detail film:', error);
      throw error;
    }
  }

  // Utility untuk mendapatkan URL gambar lengkap
  getImageUrl(posterPath) {
    return posterPath 
      ? `${this.imageBaseUrl}${posterPath}` 
      : '/placeholder-image.png';
  }
}

export default new MovieService();