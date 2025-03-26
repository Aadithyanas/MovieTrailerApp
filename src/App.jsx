import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import NavBar from './component/NavBar/NavBar';
import Banner from './component/Banner/Banner';
import RowPost from './component/RowPost/RowPost';
import SearchResults from './component/SearchResults/SearchResults';
import GenrePage from './component/GenrePage/GenrePage';
import { TrailerProvider } from './contexts/TrailerContext';
import TrailerModal from './component/TrailerModal/TrailerModal';
import Footer from './component/Footer/Footer';
import GuidedTour from './component/GuidedTour/GuidedTour';
import { API_KEY } from './constants/Constant';

// Define URLs here since there might be an issue with the module import
const originals = `/discover/tv?api_key=${API_KEY}&with_networks=213`;
const action = `/discover/movie?api_key=${API_KEY}&with_genres=28`;
const comedy = `/discover/movie?api_key=${API_KEY}&with_genres=35`;
const horror = `/discover/movie?api_key=${API_KEY}&with_genres=27`;
const romance = `/discover/movie?api_key=${API_KEY}&with_genres=10749`;
const documentaries = `/discover/movie?api_key=${API_KEY}&with_genres=99`;

function App() {
  return (
    <TrailerProvider>
      <div className="App">
        <GuidedTour />
        <NavBar />
        <Routes>
          <Route path="/" element={
            <>
              <Banner />
              <RowPost title="Netflix Originals" url={originals} isOriginals={true} genreId="213" />
              <RowPost title="Action" url={action} genreId="28" />
              <RowPost title="Comedy" url={comedy} genreId="35" />
              <RowPost title="Horror" url={horror} genreId="27" />
              <RowPost title="Romance" url={romance} genreId="10749" />
              <RowPost title="Documentaries" url={documentaries} genreId="99" />
            </>
          } />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/genre" element={<GenrePage />} />
        </Routes>
        <TrailerModal />
        <Footer />
      </div>
    </TrailerProvider>
  );
}

export default App;
