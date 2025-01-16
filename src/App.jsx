import React from 'react';
import './App.css';
import NavBar from './component/NavBar/NavBar';
import Banner from './component/Banner/Banner';
import RowPost from './component/RowPost/RowPost';
import { TrailerProvider } from './context/TrailerContext'; // Import the TrailerContext provider
import Trailer from './component/MovieTrailer/Trailer'; // Your trailer component
import { actionUrl, comedyUrl, DocumetUrl, horrorUrl, originalUrl, romanceUrl } from './constants/Constant';

function App() {
  return (
    <TrailerProvider> {/* Wrap your components with the TrailerProvider */}
      <div className="App">
        <NavBar />
        <Banner />
        
        {/* Add RowPost components, passing necessary props */}
        <RowPost url={originalUrl} title="Netflix Originals" />
        <RowPost ismall url={comedyUrl} title="Comedy" />
        <RowPost ismall url={actionUrl} title="Action" />
        <RowPost ismall url={romanceUrl} title="Romance" />
        <RowPost ismall url={horrorUrl} title="Horror" />
        <RowPost ismall url={DocumetUrl} title="Documentary" />
        
        {/* You can add the Trailer component here for rendering the trailer */}
        
      </div>
    </TrailerProvider>
  );
}

export default App;
