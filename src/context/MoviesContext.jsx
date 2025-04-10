import React, { createContext, useContext, useReducer } from 'react';

// Tipe aksi untuk reducer
const ADD_FAVORITE = 'ADD_FAVORITE';
const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

// Reducer untuk manajemen state favorit
const movieReducer = (state, action) => {
  switch (action.type) {
    case ADD_FAVORITE:
      // Hindari duplikasi film favorit
      if (state.favorites.some(movie => movie.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };
    
    case REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(movie => movie.id !== action.payload)
      };
    
    default:
      return state;
  }
};

// State awal
const initialState = {
  favorites: [],
  // Bisa tambahkan state global lain di sini
};

// Buat context
const MovieContext = createContext();

// Provider komponen
export const MovieProvider = ({ children }) => {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // Action untuk menambah film favorit
  const addFavorite = (movie) => {
    dispatch({ type: ADD_FAVORITE, payload: movie });
  };

  // Action untuk menghapus film favorit
  const removeFavorite = (movieId) => {
    dispatch({ type: REMOVE_FAVORITE, payload: movieId });
  };

  return (
    <MovieContext.Provider 
      value={{ 
        state, 
        addFavorite, 
        removeFavorite 
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Custom hook untuk menggunakan context
export const useMovieContext = () => {
  const context = useContext(MovieContext);
  
  if (!context) {
    throw new Error('useMovieContext harus digunakan dalam MovieProvider');
  }
  
  return context;
};