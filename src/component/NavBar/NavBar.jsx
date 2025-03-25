import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../Logo/Logo';

function NavBar() {
    const [show, setShow] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const isGenrePage = location.pathname === '/genre';

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setShow(true);
            } else {
                setShow(false);
            }
        });
        return () => {
            window.removeEventListener("scroll", () => {});
        };
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        
        if (query.trim()) {
            navigate('/search', { state: { searchQuery: query } });
        }
    };

    const handleHomeClick = () => {
        navigate('/');
        setSearchQuery('');
    };

    return (
        <div className={`navbar ${show && 'scrolled'}`}>
            <div className="nav-left">
                <Logo />
                <button className="home-button" onClick={handleHomeClick}>
                    <i className="fas fa-home"></i>
                    Home
                </button>
            </div>
            <div className="nav-right">
                <div className="controls">
                    {!isGenrePage && (
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}

export default NavBar
