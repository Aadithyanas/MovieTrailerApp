import React from 'react';
import './Logo.css';

function Logo() {
    return (
        <div className="logo">
            <div className="logo-icon">
                <div className="film-strip">
                    <div className="strip-hole"></div>
                    <div className="strip-hole"></div>
                    <div className="strip-hole"></div>
                </div>
            </div>
            <div className="logo-text">
                <span className="logo-title">MovieHub</span>
                <span className="logo-tagline">Your Ultimate Movie Guide</span>
            </div>
        </div>
    );
}

export default Logo; 