import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const List = () => {
    const [popularFilms, setPopularFilms] = useState([]);

    useEffect(() => {
        const fetchPopularFilms = async () => {
            try {
                const response = await axios.get(
                    "https://api.themoviedb.org/3/movie/popular?api_key=35c880c312102d07e10e0a78276eebe0"
                );
                setPopularFilms(response.data.results.slice(0, 13));
            } catch (error) {
                console.error("Error fetching popular films:", error);
            }
        };

        fetchPopularFilms();
       
    }, []);
    
    return (
        <div className="allFilm">
            {popularFilms.map((film, index) => (
                
                <Link to={`/film/${film.id}`} key={index} >
                    
                <div
                    className="film"
                    style={{
                        backgroundImage: `url(https://image.tmdb.org/t/p/w500/${film.poster_path})`,
                        backgroundSize: "cover",
                    }}
                    key={index}
                >
                    <div className="film-preview">
                        <br />
                        <h4>{film.title}</h4>
                        <p>{film.overview}</p>
                        <p>
                            <strong>Release Date:</strong> {film.release_date}
                        </p>
                        
                    </div>
                    <div className="filtre"></div>
                </div>
                </Link>
            ))}
        </div>
    );
};

export default List;
