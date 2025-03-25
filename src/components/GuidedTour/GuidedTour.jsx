import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './GuidedTour.css';

const GuidedTour = () => {
    const [run, setRun] = useState(false);

    useEffect(() => {
        // Check if it's the user's first visit
        const hasSeenTour = localStorage.getItem('hasSeenTour');
        if (!hasSeenTour) {
            setRun(true);
            // Add pulse animation class to the first movie card
            const firstCard = document.querySelector('.poster');
            if (firstCard) {
                firstCard.classList.add('pulse-animation');
            }
        }
    }, []);

    const steps = [
        {
            target: '.logo',
            content: 'Welcome to MovieHub! Your ultimate destination for exploring movies and trailers.',
            disableBeacon: true,
            placement: 'bottom',
            styles: {
                tooltip: {
                    animation: 'fade-in 0.5s ease'
                }
            }
        },
        {
            target: '.search-input',
            content: 'Search for your favorite movies here. Try typing a movie title!',
            placement: 'bottom',
            spotlightPadding: 5
        },
        {
            target: '.sort-select',
            content: 'Sort movies by popularity, rating, or release date.',
            placement: 'bottom'
        },
        {
            target: '.filter-select',
            content: 'Filter movies by genre to find exactly what you\'re looking for.',
            placement: 'bottom'
        },
        {
            target: '.poster',
            content: '🎬 Click on any movie poster to watch its trailer! Try it now!',
            placement: 'bottom',
            spotlightPadding: 10,
            styles: {
                tooltip: {
                    animation: 'bounce 0.5s ease infinite'
                }
            }
        }
    ];

    const handleJoyrideCallback = (data) => {
        const { status, index } = data;
        
        // Remove pulse animation when moving to next step
        if (index === 4) {
            const firstCard = document.querySelector('.poster');
            if (firstCard) {
                firstCard.classList.add('pulse-animation');
            }
        } else {
            const firstCard = document.querySelector('.poster');
            if (firstCard) {
                firstCard.classList.remove('pulse-animation');
            }
        }

        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            // Tour is finished or skipped
            setRun(false);
            localStorage.setItem('hasSeenTour', 'true');
            // Remove any remaining animations
            const firstCard = document.querySelector('.poster');
            if (firstCard) {
                firstCard.classList.remove('pulse-animation');
            }
        }
    };

    return (
        <Joyride
            steps={steps}
            run={run}
            continuous={true}
            showProgress={true}
            showSkipButton={true}
            callback={handleJoyrideCallback}
            styles={{
                options: {
                    primaryColor: '#ff4d4d',
                    backgroundColor: '#141414',
                    textColor: '#fff',
                    arrowColor: '#141414',
                    zIndex: 1000,
                },
                spotlight: {
                    backgroundColor: 'rgba(255, 77, 77, 0.1)'
                },
                tooltip: {
                    borderRadius: '8px',
                    fontSize: '16px'
                },
                buttonNext: {
                    backgroundColor: '#ff4d4d',
                    borderRadius: '4px',
                    padding: '8px 16px'
                },
                buttonBack: {
                    marginRight: '10px',
                    color: '#ff4d4d'
                }
            }}
        />
    );
};

export default GuidedTour; 