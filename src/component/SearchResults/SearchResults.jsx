import React, { useState, useEffect } from 'react';
import './SearchResults.css';
import '../../styles/skeleton.css';
import axios from '../../axios';
import { API_KEY, imageUrl } from '../../constants/Constant';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTrailer } from '../../contexts/TrailerContext';

function SearchResults() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [sortBy, setSortBy] = useState('popularity');
  const [ratingFilter, setRatingFilter] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();
  const searchQuery = location.state?.searchQuery || '';
  const isHomePage = location.pathname === '/';
  const { openTrailer } = useTrailer();

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (!searchQuery && !isHomePage) {
        setSearchResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        let url;
        if (isHomePage) {
          // Fetch trending movies and TV shows for home page
          url = `/trending/all/week?api_key=${API_KEY}&language=en-US&page=${page}`;
        } else {
          // Fetch search results
          url = `/search/multi?api_key=${API_KEY}&query=${searchQuery}&language=en-US&page=${page}&include_adult=false`;
        }
        
        const response = await axios.get(url);
        
        // Filter out items without posters and only keep movies and TV shows
        const filteredResults = response.data.results.filter(
          item => (item.media_type === 'movie' || item.media_type === 'tv') && 
          item.poster_path && 
          item.vote_average !== 0 && 
          (item.release_date || item.first_air_date)
        );

        if (page === 1) {
          setSearchResults(filteredResults);
        } else {
          setSearchResults(prev => [...prev, ...filteredResults]);
        }
        
        setTotalPages(response.data.total_pages);
      } catch (err) {
        setError('Failed to fetch results. Please try again.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchQuery, page, isHomePage]);

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
    setPage(1);
  };

  const handleRatingFilter = (event) => {
    setRatingFilter(event.target.value);
    setPage(1);
  };

  const getSortedAndFilteredResults = () => {
    let results = [...searchResults];

    // Only apply sorting and filtering for search results, not home page
    if (!isHomePage && searchQuery) {
      // Apply rating filter
      if (ratingFilter !== 'all') {
        results = results.filter(item => item.vote_average >= parseFloat(ratingFilter));
      }

      // Apply sorting
      switch (sortBy) {
        case 'popularity':
          results.sort((a, b) => b.popularity - a.popularity);
          break;
        case 'rating':
          results.sort((a, b) => b.vote_average - a.vote_average);
          break;
        case 'date':
          results.sort((a, b) => {
            const dateA = new Date(a.release_date || a.first_air_date || '');
            const dateB = new Date(b.release_date || b.first_air_date || '');
            return dateB - dateA;
          });
          break;
        case 'title':
          results.sort((a, b) => {
            const titleA = (a.title || a.name || '').toLowerCase();
            const titleB = (b.title || b.name || '').toLowerCase();
            return titleA.localeCompare(titleB);
          });
          break;
        default:
          break;
      }
    }

    return results;
  };

  const handleClick = async (item) => {
    try {
      let trailerKey = null;
      const mediaType = item.media_type === 'movie' ? 'movie' : 'tv';
      
      const response = await axios.get(
        `https://api.themoviedb.org/3/${mediaType}/${item.id}/videos?api_key=${API_KEY}&language=en-US`
      );

      if (response.data.results.length > 0) {
        // First try to find an official trailer
        let trailer = response.data.results.find(
          video => video.type === "Trailer" && video.official
        );

        // If no official trailer, try any trailer
        if (!trailer) {
          trailer = response.data.results.find(
            video => video.type === "Trailer"
          );
        }

        // If still no trailer, use the first video
        if (!trailer) {
          trailer = response.data.results[0];
        }

        trailerKey = trailer.key;
      }

      if (trailerKey) {
        openTrailer(trailerKey);
      } else {
        alert('No trailer available for this title');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
      alert('Error loading trailer. Please try again.');
    }
  };

  const loadMore = () => {
    if (page < totalPages) {
      setPage(prev => prev + 1);
    }
  };

  if (loading && page === 1) {
    return (
      <div className="search-results-skeleton">
        <div className="search-header-skeleton">
          <div className="search-title-skeleton skeleton"></div>
          {!isHomePage && searchQuery && (
            <div className="search-filters-skeleton">
              <div className="search-filter-skeleton skeleton"></div>
              <div className="search-filter-skeleton skeleton"></div>
            </div>
          )}
        </div>
        <div className="search-grid-skeleton">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="search-card-skeleton">
              <div className="search-card-image-skeleton skeleton"></div>
              <div className="search-card-info-skeleton">
                <div className="search-card-title-skeleton skeleton"></div>
                <div className="search-card-details-skeleton">
                  <div className="search-card-rating-skeleton skeleton"></div>
                  <div className="search-card-year-skeleton skeleton"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const sortedAndFilteredResults = getSortedAndFilteredResults();

  return (
    <div className="search-results">
      <div className="search-header">
        <h1 className="search-title">
          {isHomePage ? 'Trending Now' : searchQuery ? `Results for "${searchQuery}"` : 'Popular Titles'}
        </h1>
        {!isHomePage && searchQuery && (
          <div className="search-filters">
            <select value={sortBy} onChange={handleSortChange}>
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Sort by Rating</option>
              <option value="date">Sort by Release Date</option>
              <option value="title">Sort by Title</option>
            </select>
            <select value={ratingFilter} onChange={handleRatingFilter}>
              <option value="all">All Ratings</option>
              <option value="7">7+ Rating</option>
              <option value="8">8+ Rating</option>
              <option value="9">9+ Rating</option>
            </select>
          </div>
        )}
      </div>

      <div className="movies-grid">
        {sortedAndFilteredResults.map((item) => (
          <div key={item.id} className="movie-card" onClick={() => handleClick(item)}>
            <img
              src={`${imageUrl}${item.poster_path}`}
              alt={item.title || item.name}
              loading="lazy"
            />
            <div className="movie-info">
              <h3>{item.title || item.name}</h3>
              <div className="movie-details">
                <span className="rating">
                  <i className="fas fa-star"></i>
                  {item.vote_average.toFixed(1)}
                </span>
                <span className="year">
                  {(item.release_date || item.first_air_date || '').split('-')[0]}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {sortedAndFilteredResults.length === 0 && !loading && (
        <div className="no-results">
          <i className="fas fa-search"></i>
          <h2>No results found</h2>
          <p>Try adjusting your search or filters to find what you're looking for.</p>
        </div>
      )}

      {!loading && page < totalPages && sortedAndFilteredResults.length > 0 && (
        <div className="load-more">
          <button onClick={loadMore}>
            Load More
            <i className="fas fa-chevron-down"></i>
          </button>
        </div>
      )}

      {loading && page > 1 && (
        <div className="search-grid-skeleton">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="search-card-skeleton">
              <div className="search-card-image-skeleton skeleton"></div>
              <div className="search-card-info-skeleton">
                <div className="search-card-title-skeleton skeleton"></div>
                <div className="search-card-details-skeleton">
                  <div className="search-card-rating-skeleton skeleton"></div>
                  <div className="search-card-year-skeleton skeleton"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults; 