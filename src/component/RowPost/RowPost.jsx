import React, { useState, useEffect } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/Constant';
import { useNavigate } from 'react-router-dom';

function RowPost(props) {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  async function getMovies() {
    try {
      let res = await axios.get(props.url);
      setMovies(res.data.results);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  const handleClick = (id, title) => {
    // Fetch the trailer key and store the selected movie details
    axios
      .get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        if (response.data.results.length !== 0) {
          // Store the selected trailer key and movie title in state
          navigate('/trailer', {
            state: {
              trailerKey: response.data.results[0].key,
              movieTitle: title,
              movieId: id,
            },
          });
        } else {
          alert('No trailer published for this movie');
        }
      });
  };

  return (
    <div className="row">
      <h2>{props.title}</h2>
      <div className="posters">
        {movies.map((obj, index) => (
          <div key={index}>
            <img
              onClick={() => handleClick(obj.id, obj.title)}
              className={props.ismall ? 'smallposter' : 'poster'}
              alt="poster"
              src={`${imageUrl + obj.poster_path}`}
            />
            <p>{props.ismall ? obj.title : obj.original_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RowPost;
