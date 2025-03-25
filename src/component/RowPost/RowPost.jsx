import React, { useEffect, useState } from 'react';
import './RowPost.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/Constant';
import { useTrailer } from '../../contexts/TrailerContext';
import { useNavigate } from 'react-router-dom';
import { FaStar, FaChevronRight } from 'react-icons/fa';

function RowPost(props) {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const { openTrailer } = useTrailer();
    const navigate = useNavigate();
    const maxMoviesInRow = props.isOriginals ? 20 : 19; // Show all movies for Netflix Originals, one less for others

    useEffect(() => {
        const getMovies = async () => {
            try {
                setLoading(true);
                const response = await axios.get(props.url);
                const filteredMovies = response.data.results.filter(movie => movie.poster_path);
                setMovies(filteredMovies);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };
        getMovies();
    }, [props.url]);

    const handlePlayClick = async (movie) => {
        try {
            const mediaType = movie.first_air_date ? 'tv' : 'movie';
            const response = await axios.get(
                `https://api.themoviedb.org/3/${mediaType}/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
            );

            if (response.data.results.length > 0) {
                const trailer = response.data.results.find(
                    video => video.type === "Trailer" && video.official
                ) || response.data.results.find(
                    video => video.type === "Trailer"
                ) || response.data.results[0];

                if (trailer) {
                    openTrailer(trailer.key);
                } else {
                    alert('No trailer available for this title');
                }
            } else {
                alert('No trailer available for this title');
            }
        } catch (error) {
            console.error('Error fetching trailer:', error);
            alert('Error loading trailer. Please try again.');
        }
    };

    const handleViewMore = () => {
        navigate('/genre', {
            state: {
                title: props.title,
                genreId: props.genreId,
            }
        });
    };

    const displayMovies = movies.slice(0, maxMoviesInRow);

    return (
        <div className="row">
            <div className="row-header">
                <h2>{props.title}</h2>
            </div>
            <div className="posters">
                {loading ? (
                    [...Array(8)].map((_, index) => (
                        <div key={index} className="poster-skeleton" />
                    ))
                ) : (
                    <>
                        {displayMovies.slice(0, maxMoviesInRow).map((movie) => (
                            <div
                                key={movie.id}
                                className="poster"
                                onClick={() => handlePlayClick(movie)}
                            >
                                <img
                                    src={`${imageUrl + movie.poster_path}`}
                                    alt={movie.title || movie.name}
                                    loading="lazy"
                                />
                                <div className="poster-info">
                                    <h3>{movie.title || movie.name}</h3>
                                    <div className="rating">
                                        <FaStar /> {movie.vote_average.toFixed(1)}
                                    </div>
                                </div>
                            </div>
                        ))}
                        {!loading && movies.length > maxMoviesInRow && props.genreId && !props.isOriginals && (
                            <div className="view-more-card" onClick={handleViewMore}>
                                <FaChevronRight size={24} />
                                <span>View More</span>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default RowPost;
