import React from 'react';
import './TrailerModal.css';
import { useTrailer } from '../../contexts/TrailerContext';

function TrailerModal() {
    const { isOpen, trailerKey, movieTitle, closeTrailer } = useTrailer();

    if (!isOpen || !trailerKey) return null;

    return (
        <div className="trailer-modal-overlay" onClick={closeTrailer}>
            <div className="trailer-modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-button" onClick={closeTrailer}>×</button>
                <h2>{movieTitle}</h2>
                <div className="video-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
                        title={`${movieTitle} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        </div>
    );
}

export default TrailerModal; 