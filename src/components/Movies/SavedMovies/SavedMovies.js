// // SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// // MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// // MoviesCard — компонент одной карточки фильма.

import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';
import { filterMoviesHandler } from '../../../utils/filterMoviesHandler';
import { ResizeHandler } from '../../../utils/resizeHandler';

function SavedMovies (props) {
  const moviesToShowOnPageByWindowSize = ResizeHandler();
  const [movieCount, setMovieCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilmsFilter, setShortFilmsFilter] = useState(() => {
    const savedShortFilmsFilter = sessionStorage.getItem('shortFilmsFilterSaved');
    return savedShortFilmsFilter ? JSON.parse(savedShortFilmsFilter) : false;
  });

  useEffect(() => {
    setMovieCount(moviesToShowOnPageByWindowSize.moviesOnPage);
  }, [moviesToShowOnPageByWindowSize]);

  useEffect(() => {
    sessionStorage.setItem('searchQuerySaved', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    sessionStorage.setItem('shortFilmsFilterSaved', JSON.stringify(shortFilmsFilter));
  }, [shortFilmsFilter]);

  const movies = filterMoviesHandler(props.movies, searchQuery, shortFilmsFilter, movieCount);

  function handleSearchQuery(searchQuery) {
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

  function loadMoreMovies() {
    setMovieCount(movieCount + moviesToShowOnPageByWindowSize.addMoviesOnPage);
  }

  function handleShortFilmsFilterToggle(checked) {
    setShortFilmsFilter(checked);
  }

  return (
    <main className='saved-movies'>
      <SearchForm
        onSearch={handleSearchQuery}
        onToggle={handleShortFilmsFilterToggle}
        checked={shortFilmsFilter}
      />
      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList 
          moviesCards={userMoviesCards}
          addMovies={loadMoreMovies}
          maxMovies={movieCount}
        />
      )}
    </main>
  );
}

export default SavedMovies;
