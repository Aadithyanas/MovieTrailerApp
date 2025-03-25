import React, { createContext, useContext, useState } from 'react';
import axios from '../axios';
import { API_KEY } from '../constants/Constant';

// Create a Context for the trailer state
const TrailerContext = createContext();

// Create a Provider component
export function TrailerProvider({ children }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  const fetchTrailer = async (movie) => {
    try {
      const response = await axios.get(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`);
      if (response.data.results.length !== 0) {
        setTrailerKey(response.data.results[0].key);
      } else {
        alert('No trailer available for this movie');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Error loading trailer');
    }
  };

  const value = {
    selectedMovie,
    setSelectedMovie,
    trailerKey,
    setTrailerKey,
    fetchTrailer
  };

  return (
    <TrailerContext.Provider value={value}>
      {children}
    </TrailerContext.Provider>
  );
}

export function useTrailer() {
  const context = useContext(TrailerContext);
  if (!context) {
    throw new Error('useTrailer must be used within a TrailerProvider');
  }
  return context;
}
