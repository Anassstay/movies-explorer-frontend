// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import { useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { filterMoviesHandler } from '../../../utils/filterMoviesHandler';

function SavedMovies (props) {
  const [movieCount, setMovieCount] = useState(9999);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilmsFilter, setShortFilmsFilter] = useState(false);

  const movies = filterMoviesHandler(props.movies, searchQuery, shortFilmsFilter, movieCount);

  function handleSearchQuery (searchQuery) {
    setSearchQuery(searchQuery);
  }

  const userMoviesCards = movies.map((movieToUpdate) => (
    <MoviesCard
      key={movieToUpdate._id}
      class={movieToUpdate.class}
      movie={movieToUpdate}
      onDelete={props.handleDeleteMovie}
    />
  ));

  function handleShortFilmsFilterToggle (checked) {
    setShortFilmsFilter(checked);
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        onSearch={handleSearchQuery}
        onToggle={handleShortFilmsFilterToggle}
        checked={shortFilmsFilter}
        isDefaultValues={false}
      />
      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={userMoviesCards}
          maxMovies={movieCount}
        />
      )}
    </main>
  );
}

export default SavedMovies;
