import React, { useState, useEffect } from 'react';
import Joyride, { STATUS } from 'react-joyride';
import './GuidedTour.css';

const GuidedTour = () => {
    const [run, setRun] = useState(false);
    const [steps] = useState([
        {
            target: '.navbar',
            content: '👋 Welcome to MovieHub! Let\'s explore your new movie destination.',
            placement: 'bottom',
            disableBeacon: true,
            spotlightPadding: 5,
            spotlightClicks: true
        },
        {
            target: '.search-input',
            content: '🔍 Type here to search movies. Try it out!',
            placement: 'bottom',
            spotlightClicks: true,
            disableBeacon: true
        },
        {
            target: '.banner-content',
            content: '🎬 Featured movies with trailers. Click the Play button to watch!',
            placement: 'bottom',
            spotlightClicks: true,
            disableBeacon: true
        },
        {
            target: '.posters',
            content: '👆 Drag or click to explore more movies. Each card reveals exciting trailers!',
            placement: 'top',
            spotlightClicks: true,
            disableBeacon: true
        }
    ]);

    useEffect(() => {
        // Wait for components to mount
        const timer = setTimeout(() => {
            const hasSeenTour = localStorage.getItem('hasSeenTour');
            if (!hasSeenTour) {
                setRun(true);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const handleJoyrideCallback = (data) => {
        const { status } = data;
        if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
            setRun(false);
            localStorage.setItem('hasSeenTour', 'true');
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
                    primaryColor: '#e50914',
                    backgroundColor: '#141414',
                    textColor: '#ffffff',
                    arrowColor: '#141414',
                    overlayColor: 'rgba(0, 0, 0, 0.85)',
                    zIndex: 9999,
                    spotlightAnimation: 'pulse 2s infinite',
                    spotlightBorderRadius: '8px',
                    spotlightPadding: 5,
                    tooltipAnimation: 'fade 0.3s ease-in-out',
                    buttonNext: {
                        backgroundColor: '#e50914',
                        fontSize: '14px',
                        padding: '8px 16px',
                        animation: 'pulse 2s infinite'
                    }
                },
                tooltip: {
                    borderRadius: '8px',
                    fontSize: '14px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                },
                buttonNext: {
                    backgroundColor: '#e50914',
                    fontSize: '14px',
                    padding: '8px 16px',
                    transition: 'all 0.3s ease'
                },
                buttonBack: {
                    color: '#e50914',
                    marginRight: '10px',
                    transition: 'all 0.3s ease'
                },
                buttonSkip: {
                    color: '#808080',
                    transition: 'all 0.3s ease'
                },
                spotlight: {
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    boxShadow: '0 0 0 4px rgba(229, 9, 20, 0.5)'
                }
            }}
            floaterProps={{
                disableAnimation: false
            }}
            spotlightPadding={0}
            disableOverlayClose={true}
            disableScrolling={true}
            spotlightClicks={true}
        />
    );
};

export default GuidedTour; 