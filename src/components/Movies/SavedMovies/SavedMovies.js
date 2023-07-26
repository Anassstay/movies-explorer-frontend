// SavedMovies — компонент страницы с сохранёнными карточками фильмов. Пригодятся эти компоненты:
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';
import moviesCards from '../../../utils/moviesCards';

function SavedMovies ({ isLoading }) {
  return (
    <main className='saved-movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList moviesCards={moviesCards} isMovieSaved={true} buttonType='delete' place='saved-movies' />
      )}
    </main>
  );
}

export default SavedMovies;
