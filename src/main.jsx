import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import App from './App';
import './index.css';
import Favorites from './components/favorite';
import FilmDetail from './components/FilmDetails';
import SearchResultPage from './components/ResultPage';

const AppRouter = () => {
  // const [films, setFilms] = useState([]);

  // useEffect(() => {
  //   const fetchFilms = async () => {
  //     try {
  //       const response = await axios.get(                    "https://api.themoviedb.org/3/movie?api_key=35c880c312102d07e10e0a78276eebe0"
  //       );
  //       setFilms(response.data.results); 
  //     } catch (error) {
  //       console.error('Error fetching films:', error);
  //     }
  //   };

  //   fetchFilms();
  // }, []);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/favorite" element={<Favorites />} />
        {/* C'est par rapport au link ce qu'on récupere */}
        <Route path="/film/:id" element={<FilmDetail />} />
        <Route path='/search' element= {<SearchResultPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<AppRouter />);
