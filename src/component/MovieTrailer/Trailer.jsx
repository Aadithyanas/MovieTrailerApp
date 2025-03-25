import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Trailer.css';

function Trailer() {
    const location = useLocation();
    const navigate = useNavigate();
    const { trailerKey, movieTitle } = location.state || {};

    if (!trailerKey) {
        navigate('/');
        return null;
    }

    return (
        <div className="trailer-container">
            <div className="trailer-content">
                <h1>{movieTitle}</h1>
                <div className="video-container">
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        title={`${movieTitle} Trailer`}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
                <button className="back-button" onClick={() => navigate('/')}>
                    Back to Home
                </button>
            </div>
        </div>
    );
}

export default Trailer;
