// Fungsi untuk memformat mata uang
export const formatCurrency = (value, currency = 'USD') => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Fungsi untuk memotong teks
  export const truncateText = (text, maxLength = 200) => {
    if (!text) return '';
    
    if (text.length <= maxLength) {
      return text;
    }
    
    return text.substr(0, maxLength) + '...';
  };
  
  // Fungsi untuk mengonversi menit ke jam:menit
  export const convertMinutesToHoursMinutes = (minutes) => {
    if (!minutes) return '0m';
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    return hours > 0 
      ? `${hours}j ${remainingMinutes}m` 
      : `${minutes}m`;
  };
  
  // Fungsi untuk mendapatkan genre dari ID
  export const getGenreNameById = (genreId, genreList) => {
    const genre = genreList.find(g => g.id === genreId);
    return genre ? genre.name : 'Tidak Diketahui';
  };
  
  // Fungsi untuk menghasilkan warna rating
  export const getRatingColor = (rating) => {
    if (rating >= 7) return 'text-green-500';
    if (rating >= 5) return 'text-yellow-500';
    return 'text-red-500';
  };
  
  // Fungsi untuk membersihkan data film
  export const sanitizeMovieData = (movie) => {
    return {
      id: movie.id,
      title: movie.title || 'Judul Tidak Tersedia',
      overview: movie.overview || 'Sinopsis tidak tersedia',
      posterPath: movie.poster_path,
      backdropPath: movie.backdrop_path,
      voteAverage: movie.vote_average || 0,
      releaseDate: movie.release_date || 'Tanggal tidak diketahui'
    };
  };