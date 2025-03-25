import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/Constant';
import { FaStar, FaArrowLeft } from 'react-icons/fa';
import { useTrailer } from '../../contexts/TrailerContext';
import './GenrePage.css';

function GenrePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { title, genreId } = location.state || {};
    const [movies, setMovies] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [sortBy, setSortBy] = useState('popularity');
    const [ratingFilter, setRatingFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const { openTrailer } = useTrailer();

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(
                    `/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}&language=en-US`
                );
                
                if (page === 1) {
                    setMovies(response.data.results);
                } else {
                    setMovies(prev => [...prev, ...response.data.results]);
                }
                
                setTotalPages(response.data.total_pages);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setIsLoading(false);
            }
        };

        if (genreId) {
            fetchMovies();
        }
    }, [genreId, page]);

    const handlePlayClick = async (movie) => {
        try {
            const response = await axios.get(
                `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
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

    const filteredAndSortedMovies = () => {
        let filtered = [...movies];

        // Apply search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(movie => 
                movie.title?.toLowerCase().includes(query)
            );
        }

        // Apply rating filter
        if (ratingFilter !== 'all') {
            const rating = parseInt(ratingFilter);
            filtered = filtered.filter(movie => movie.vote_average >= rating);
        }

        // Apply sorting
        switch (sortBy) {
            case 'popularity':
                filtered.sort((a, b) => b.popularity - a.popularity);
                break;
            case 'rating':
                filtered.sort((a, b) => b.vote_average - a.vote_average);
                break;
            case 'date':
                filtered.sort((a, b) => {
                    const dateA = new Date(a.release_date || '');
                    const dateB = new Date(b.release_date || '');
                    return dateB - dateA;
                });
                break;
            case 'title':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            default:
                break;
        }

        return filtered;
    };

    const loadMore = () => {
        if (page < totalPages) {
            setPage(prev => prev + 1);
        }
    };

    if (!genreId) {
        return <div>Invalid genre</div>;
    }

    const displayMovies = filteredAndSortedMovies();

    return (
        <div className="genre-page">
         
            <div className="genre-header">
                <h1>{title}</h1>
                <div className="genre-controls">
                    <input
                        type="text"
                        placeholder="Search in this genre..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="genre-search"
                    />
                    <select 
                        value={sortBy} 
                        onChange={(e) => setSortBy(e.target.value)}
                        className="genre-sort"
                    >
                        <option value="popularity">Sort by Popularity</option>
                        <option value="rating">Sort by Rating</option>
                        <option value="date">Sort by Release Date</option>
                        <option value="title">Sort by Title</option>
                    </select>
                    <select 
                        value={ratingFilter} 
                        onChange={(e) => setRatingFilter(e.target.value)}
                        className="genre-filter"
                    >
                        <option value="all">All Ratings</option>
                        <option value="7">7+ Rating</option>
                        <option value="8">8+ Rating</option>
                        <option value="9">9+ Rating</option>
                    </select>
                </div>
            </div>

            <div className="genre-grid">
                {displayMovies.map((movie) => (
                    <div key={movie.id} className="movie-card" onClick={() => handlePlayClick(movie)}>
                        <img
                            src={`${imageUrl + movie.poster_path}`}
                            alt={movie.title}
                            loading="lazy"
                        />
                        <div className="movie-info">
                            <h3 className="movie-title">{movie.title}</h3>
                            <div className="movie-details">
                                <div className="rating">
                                    <FaStar /> {movie.vote_average.toFixed(1)}
                                </div>
                                <div className="date">
                                    {movie.release_date?.split('-')[0]}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {isLoading && (
                <div className="genre-grid">
                    {[...Array(20)].map((_, index) => (
                        <div key={index} className="movie-card-skeleton">
                            <div className="movie-info-skeleton">
                                <div className="movie-title-skeleton"></div>
                                <div className="movie-rating-skeleton"></div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!isLoading && page < totalPages && (
                <button className="load-more-button" onClick={loadMore}>
                    Load More <i className="fas fa-chevron-down"></i>
                </button>
            )}
        </div>
    );
}

export default GenrePage; 