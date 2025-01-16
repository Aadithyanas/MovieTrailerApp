import React from 'react';
import ReactDOM from 'react-dom/client';
import Rooting from '.';
import App from './App';
import RowPost from './component/RowPost/RowPost';
import Trailer from './component/MovieTrailer/Trailer';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
//import it from "react-dom/client"

const root = ReactDOM.createRoot(document.querySelector("#root"))
root.render(
  <React.StrictMode>
  <Rooting/>



  
 
  </React.StrictMode>,
)

