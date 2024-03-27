import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from './navbar';
import axios from 'axios';

const FilmDetail = () => {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [credits, setCredits] = useState(null);
  const [genres, setGenres] = useState([]);
  const [isFav, setIsFav] = useState(false); // Utilisation de useState pour gérer l'état de isFav
  const [isFavorite] = useState(localStorage.getItem('favorite')); // Utilisation de useState pour gérer l'état de isFav
  


    


  useEffect(() => {
    const fetchFilmDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}`,
          {
            params: {
              api_key: '35c880c312102d07e10e0a78276eebe0',
              append_to_response: 'credits'
            }
          }
        );

        setFilm(response.data);
        setGenres(response.data.genres); 
        setCredits(response.data.credits);
      } catch (error) {
        console.error("Error fetching film details:", error);
      }
    };

    fetchFilmDetails();
  }, [id]);

  if (!film || !credits) {
    return (
      <>
        <Navbar />
        <div>Le film demandé n'a pas été trouvé.</div>
      </>
    );
  }

  if (genres.length === 0) {
    return (
      <>
        <Navbar />
        <div className="container">

          <div className="film-detail">
          <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} />

            <div className="description">
              <h2>{film.title}</h2>
              <p>{film.overview}</p>
              <div>
                <h3 className='genre'>Genres:</h3>
                <div className="genre" dangerouslySetInnerHTML={{__html: "Les genres n'ont pas été renseignés pour ce film"}}></div>
              </div>
              <div>
                <h3>Acteurs:</h3>
                <ul>
                {credits.cast.slice(0, 5).map(actor => (
                  <li key={actor.id}>{actor.name}</li>
                ))}
                </ul>
              </div>
              <button className='btn-Fav' value={id}>Ajouter aux favoris</button>
            </div>
          </div>
        </div>
      </>
    );
  }
  // Je suis franglais 
 // Quand on clique sur afficher plus sa affiche tout les acteurs et sa affiche afficher moin GRace au booléen
  function afficherMore() {
    let castMore = document.querySelector(".cast-more");
    let castMoreDetail = document.querySelector(".cast-more-detail");
    
    if (castMore.dataset.value === "false") {
      castMoreDetail.innerHTML = '';
      credits.cast.forEach(actor => {
        castMoreDetail.innerHTML += `<li key=${actor.id}>${actor.name}</li>`;
      });
      castMore.dataset.value = "true";
      castMore.textContent = 'Afficher moins';
    } else {
      castMoreDetail.innerHTML = '';
      credits.cast.slice(0, 5).forEach(actor => {
        castMoreDetail.innerHTML += `<li key=${actor.id}>${actor.name}</li>`;
      });
      castMore.dataset.value = "false";
      castMore.textContent = 'Afficher plus';
    }
  }


  const addFavorite = () => {
    // Récupération des favoris existants depuis le stockage local
    let favorites = localStorage.getItem('favorite');
    
    // Vérification si des favoris existent déjà
    // Le ? est un si il y a favorites il fait JSON.arse sinon il fait : donc []
    let newFavorite = favorites ? JSON.parse(favorites) : [];
  
    if (newFavorite.includes(id)) {
      console.log("Ce film est déjà dans les favoris !");
      console.log( favorites);

      console.log(isFav);
      setIsFav(true)
      return; // Sortir de la fonction si le film est déjà dans les favoris
    }
    // Ajout du nouvel ID dans le tableau newFavorite
    newFavorite.push(id);
    setIsFav(true)
    // Enregistrement du tableau mis à jour dans le stockage local
    localStorage.setItem('favorite', JSON.stringify(newFavorite));

  };
  
  const deleteFavorite = () => {
    setIsFav(false)

    let favorites = localStorage.getItem('favorite');

    let favorites2 = favorites ? JSON.parse(favorites) : [];
    console.log( favorites2);


    console.log(favorites2.indexOf(id));
  }

  return (
    <>
      <Navbar />
      <br /><br />
      <div className="container">
        <div className="film-detail">
        <img src={`https://image.tmdb.org/t/p/w500/${film.poster_path}`} alt={film.title} />
          <div className="description ms-5 mt-5">
            <h2>{film.title}</h2>
            <p>{film.overview}</p>
            <div>
              
              <h3 className='genre'>Genres:</h3>

              <ul>
                {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>Acteurs:</h3>
              <ul className='cast-more-detail'>
              {credits.cast.slice(0, 5).map(actor => (
                <li key={actor.id}>{actor.name}</li>
              ))}
              </ul>
              <span className='cast-more' onClick={afficherMore} defaultValue={false}>Afficher plus</span>
            </div>
            <br />
            {isFav ?
            (<button 
              className='btn-Fav' 
              onClick={deleteFavorite}
              
              > Supprimer des favoris</button>)
            
            :(<button 
              className='btn-Fav' 
              onClick={addFavorite}
              
              > Ajouter aux favoris</button>)

            }
            
          </div>
        </div>
      </div>
    </>
  );
};

export default FilmDetail;
