import React, { useEffect, useState, useCallback } from "react";
import "./Banner.css";
import "../../styles/skeleton.css";
import { API_KEY, imageUrl } from "../../constants/Constant";
import axios from "../../axios";
import { useTrailer } from "../../contexts/TrailerContext";

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const { openTrailer } = useTrailer();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`
        );
        // Filter out items without backdrop images
        const validMovies = response.data.results.filter(movie => movie.backdrop_path);
        setMovies(validMovies);
      } catch (error) {
        console.error("Error fetching banner movies:", error);
      } finally {
        setIsLoading(false);
        // Add initial load animation
        setTimeout(() => setIsLoaded(true), 100);
      }
    };

    fetchMovies();

    // Initial scroll effect
    const timer = setTimeout(() => {
      window.scrollTo({
        top: 100,
        behavior: 'smooth'
      });

      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 800);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const changeBanner = useCallback(() => {
    if (isTransitioning || movies.length === 0) return;
    
    setIsTransitioning(true);
    setIsLoaded(false);

    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
      
      // Add small delay before showing new banner
      setTimeout(() => {
        setIsLoaded(true);
        setIsTransitioning(false);
      }, 100);
    }, 600); // Wait for fade out
  }, [movies.length, isTransitioning]);

  useEffect(() => {
    if (movies.length === 0) return;

    const interval = setInterval(changeBanner, 8000); // Changed to 8 seconds for better viewing

    return () => clearInterval(interval);
  }, [movies, changeBanner]);

  const handlePlayClick = async () => {
    if (!movies[currentIndex]) return;

    const movie = movies[currentIndex];
    try {
      // First try movie endpoint
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
      );

      let trailerKey = null;
      
      // Check movie results first
      if (response.data.results.length > 0) {
        // Find official trailer or take first video
        const trailer = response.data.results.find(video => 
          video.type === "Trailer" && video.official
        ) || response.data.results[0];
        trailerKey = trailer.key;
      } else {
        // Try TV show endpoint if movie endpoint returns no results
        const tvResponse = await axios.get(
          `https://api.themoviedb.org/3/tv/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
        );

        if (tvResponse.data.results.length > 0) {
          // Find official trailer or take first video
          const trailer = tvResponse.data.results.find(video => 
            video.type === "Trailer" && video.official
          ) || tvResponse.data.results[0];
          trailerKey = trailer.key;
        }
      }

      if (trailerKey) {
        openTrailer(trailerKey, movie.title || movie.name);
      } else {
        alert('No trailer available for this title');
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
      alert('Error loading trailer. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="banner-skeleton">
        <div className="banner-content-skeleton">
          <div className="banner-title-skeleton skeleton"></div>
          <div className="banner-buttons-skeleton">
            <div className="banner-button-skeleton skeleton"></div>
            <div className="banner-button-skeleton skeleton"></div>
          </div>
          <div className="banner-description-skeleton skeleton"></div>
          <div className="banner-description-skeleton skeleton"></div>
          <div className="banner-description-skeleton skeleton"></div>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];

  if (!currentMovie) {
    return null;
  }

  return (
    <div
      className={`banner ${isLoaded ? 'loaded' : ''}`}
      style={{
        backgroundImage: `url(${imageUrl}${currentMovie.backdrop_path})`,
      }}
    >
      <div className="content">
        <h1 className="title">
          {currentMovie.title || currentMovie.name}
        </h1>
        <div className="banner_buttons">
          <button className="button" onClick={handlePlayClick}>
            <i className="fas fa-play"></i> Play
          </button>
          <button className="button">
            <i className="fas fa-info-circle"></i> More Info
          </button>
        </div>
        <h1 className="description">{currentMovie.overview}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
