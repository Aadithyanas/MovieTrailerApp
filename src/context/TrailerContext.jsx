import React, { createContext, useState } from 'react';

// Create a Context for the trailer state
export const TrailerContext = createContext();

// Create a Provider component
export const TrailerProvider = ({ children }) => {
  const [trailerId, setTrailerId] = useState(''); // State for storing trailer ID
  const [movieType, setMovieType] = useState(''); // State for storing the type of the movie
  const [movieList, setMovieList] = useState([]); // State for storing the list of movies

  return (
    <TrailerContext.Provider value={{ trailerId, setTrailerId, movieType, setMovieType, movieList, setMovieList }}>
      {children}
    </TrailerContext.Provider>
  );
};
