import './MoviesCardList.css';
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList({ moviesCards, isMovieSaved }) {

  const moviesButtonMore = `movies-card-list__more-button ${
    isMovieSaved ? 'movies-card-list__more-button_hidden' : ''
  }`;

  const moviesList = isMovieSaved
    ? moviesCards.filter((movieCard) => movieCard.isActive)
    : moviesCards;

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        <ul className='movies-card-list__list'>
          {moviesList.map((movie) => (
            <li className='movies-card-list__list-item' key={movie.movieid}>
              <MoviesCard movieCard={movie} isMovieSaved={isMovieSaved} />
            </li>
          ))}
        </ul>
      </div>
      <button className={moviesButtonMore}>Еще</button>
    </section>
  );
}

export default MoviesCardList;
