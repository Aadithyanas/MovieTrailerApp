import React, { createContext, useState, useContext } from 'react';

const TrailerContext = createContext();

export const useTrailer = () => {
    const context = useContext(TrailerContext);
    if (!context) {
        throw new Error('useTrailer must be used within a TrailerProvider');
    }
    return context;
};

export const TrailerProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    const [movieTitle, setMovieTitle] = useState('');

    const openTrailer = (key, title) => {
        setTrailerKey(key);
        setMovieTitle(title);
        setIsOpen(true);
    };

    const closeTrailer = () => {
        setIsOpen(false);
        setTrailerKey(null);
        setMovieTitle('');
    };

    const value = {
        isOpen,
        trailerKey,
        movieTitle,
        openTrailer,
        closeTrailer
    };

    return (
        <TrailerContext.Provider value={value}>
            {children}
        </TrailerContext.Provider>
    );
};

export default TrailerContext; 