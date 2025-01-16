import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import RowPost from './component/RowPost/RowPost';
import Trailer from './component/MovieTrailer/Trailer';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
//import it from "react-dom/client"

function Rooting(props){
    console.log(props.id)
return(
    <Router>
    <Routes>
     <Route path='/' element={<App/>}/>
    
     <Route path='/trailer' element={<Trailer id={props.id}/>}/>
     </Routes>
    </Router>
)

}
export default Rooting
