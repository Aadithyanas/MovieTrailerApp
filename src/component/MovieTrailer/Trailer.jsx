import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import YouTube from "react-youtube";
import NavBar from "../NavBar/NavBar";
import { API_KEY, imageUrl } from "../../constants/Constant";
import axios from "../../axios";
import "./Trailer.css";

function Trailer() {
  const { state } = useLocation(); // Get the movie data passed from the Banner component
  const [relatedMovies, setRelatedMovies] = useState([]);
  const [trailerKey, setTrailerKey] = useState(null);

  const { movieId, movieTitle } = state || {}; // Get movie ID and title from the state

  useEffect(() => {
    // Fetch the trailer for the selected movie
    axios
      .get(`/movie/${movieId}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setTrailerKey(response.data.results[0].key); // Set the trailer key
        } else {
          alert("No trailer available for this movie.");
        }
      });

    // Fetch related movies based on movie ID
    axios
      .get(`/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setRelatedMovies(response.data.results); // Set related movies
      });
  }, [movieId]);

  const opts = {
    
    playerVars: {
      autoplay: 1, // Set to autoplay
    },
  };

  const handleRelatedMovieClick = (id) => {
    // When a related movie is clicked, update the trailer
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length > 0) {
          setTrailerKey(response.data.results[0].key); // Set new trailer key
        }
      });
  };

  return (
    <div>
      <NavBar />
      <div className="trailer-container">
        <div className="video-wrapper">
          {trailerKey ? (
            <YouTube className="utube" videoId={trailerKey} opts={opts} />
          ) : (
            <p className="no-video-text">No video ID found.</p>
          )}
        </div>

        <div className="related-movies-section">
          <h2 className="related-movies-title">Related Movies to {movieTitle}</h2>
          <div className="related-movies-grid">
            {relatedMovies.length > 0 ? (
              relatedMovies.map((movie, index) => (
                <div
                  key={index}
                  onClick={() => handleRelatedMovieClick(movie.id)}
                  className="related-movie-item"
                >
                  <img
                    className="related-movie-poster"
                    alt="poster"
                    src={`${imageUrl + movie.poster_path}`}
                  />
                  <p className="related-movie-name">{movie.title}</p>
                </div>
              ))
            ) : (
              <p className="no-related-movies">No related movies found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trailer;
