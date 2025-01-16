import React, { useEffect, useState } from "react";
import "./Banner.css";
import { API_KEY, imageUrl } from "../../constants/Constant";
import axios from "../../axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate from react-router-dom

function Banner() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize navigate hook

  // Fetch movies from the API
  async function getMovies() {
    try {
      let res = await axios.get(
        `/trending/all/week?api_key=${API_KEY}&language=en-US`
      );
      setMovies(res.data.results); // Set the movies to state
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Set interval to update the banner every 3 seconds
  useEffect(() => {
    getMovies();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        movies.length-1 !==currentIndex && (prevIndex + 1) 
      );
    }, 3000); 

    return () => clearInterval(interval); 
  }, []); 


  if(movies.length-1 === currentIndex){
    setCurrentIndex(0)
  }
  
  if (movies.length === 0) {
    return null; 
  }

  const currentMovie = movies[currentIndex]; // Get the current movie based on the index

  // Handle the "Play" button click
  const handlePlayClick = () => {
    navigate("/trailer", {
      state: {
        movieId: currentMovie.id,
        movieTitle: currentMovie.title || currentMovie.original_name,
      },
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${currentMovie ? imageUrl + currentMovie.backdrop_path : ""})`,
      }}
      className="banner"
    >
      <div className="content">
        <h1 className="title">{currentMovie ? currentMovie.title || currentMovie.original_name : ""}</h1>
        <div className="banner_buttons">
          <button className="button" onClick={handlePlayClick}>
            Play
          </button>
         
        </div>
        <h1 className="description">{currentMovie ? currentMovie.overview : ""}</h1>
      </div>
      <div className="fade_bottom"></div>
    </div>
  );
}

export default Banner;
