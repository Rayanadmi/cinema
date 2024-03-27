import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './navbar';
import { Link } from "react-router-dom";

const SearchResultPage = () => {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const searchQuery = new URLSearchParams(location.search).get("q");
        if (searchQuery) {
            // Effectuer une nouvelle recherche avec la requête de recherche obtenue des paramètres d'URL
            // et mettre à jour les résultats de la recherche
            fetchSearchResults(searchQuery);
        }
    }, [location.search]);

    const fetchSearchResults = async (query) => {
        try {
            const response = await fetch(
                `https://api.themoviedb.org/3/search/movie?api_key=35c880c312102d07e10e0a78276eebe0&query=${query}`
            );
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log(data.results);
            setSearchResults(data.results);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <>
        <Navbar />
        <br />
        <div className="container">
        <div className='allFilm'>
           
            
                {searchResults.map((movie, index) => (
                                    
                <Link to={`/film/${movie.id}`} key={index} >

                   
                    <div className='film'
                    style={{
                        backgroundImage : `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                        backgroundSize : 'cover'
                    }}
                    key={movie.id}>
                       <div className="film-preview">
                        <br />
                        <h4>{movie.title}</h4>
                        <p>{movie.overview}</p>
                        <p>
                            <strong>Release Date:</strong> {movie.release_date}
                        </p>
                        
                    </div>
                    <div className="filtre"></div>
                    </div></Link>
                ))}
                
        </div>
        </div>
        </>
        
    );
};

export default SearchResultPage;
