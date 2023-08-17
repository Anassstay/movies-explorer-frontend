import { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from './Preloader/Preloader';
import { filterMoviesHandler } from '../../utils/filterMoviesHandler';
import { ResizeHandler } from '../../utils/resizeHandler';
import './Movies.css';

function Movies (props) {
  // console.log(allMovies);
  // console.log("allMovies");

  const moviesToShowOnPageByWindowSize = ResizeHandler();
  const [searchQuery, setSearchQuery] = useState(localStorage.getItem('searchQueryMovies') || '');
  const [shortFilmsFilter, setShortFilmsFilter] = useState(
    localStorage.getItem('shortFilmsFilterMovies')
      ? JSON.parse(localStorage.getItem('shortFilmsFilterMovies'))
      : false);
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    setMovieCount(moviesToShowOnPageByWindowSize.moviesOnPage);
  }, [moviesToShowOnPageByWindowSize]);

  useEffect(() => {
    const shortFilmsFilterMovies = localStorage.getItem('shortFilmsFilterMovies')
    setShortFilmsFilter(shortFilmsFilterMovies
      ? JSON.parse(localStorage.getItem('shortFilmsFilterMovies'))
      : false)
  }, []);

  //срабатывает при изменении значения shortFilmsFilter и сохраняет его в localStorage в виде JSON-строки под ключом "shortFilmsFilterMovies".
  useEffect(() => {
  }, [shortFilmsFilter]);

  //Константа movies получает отфильтрованный список фильмов с помощью функции filterMoviesHandler, которой передаются следующие параметры:
  //allMovies (весь список фильмов), searchQuery (строка для поиска), shortFilmsFilter (флаг, указывающий на то, нужны ли только фильмы короткометражного типа)
  // и movieCount (количество фильмов, которые нужно показать).
  const movies = filterMoviesHandler(props.movies, searchQuery, shortFilmsFilter, movieCount);


  //Каждый элемент массива movies преобразуется с помощью метода map в компонент MoviesCard, которому передаются следующие параметры:
  //key (уникальный идентификатор элемента), class (класс для стилизации компонента), movie (объект с информацией о фильме),
  //onRemove (обработчик удаления фильма) и onSave (обработчик сохранения фильма).
  const moviesCards = movies.map((movieToUpdate) => {
    // console.log(movieToUpdate);
    return (
      <MoviesCard
        key={movieToUpdate.id}
        class={movieToUpdate.class}
        movie={movieToUpdate}
        onDelete={props.handleDeleteMovie}
        onSave={props.handleSaveMovie}
      />
    );
  });

  // console.log(movieToUpdate);
  // console.log("movie");

  //Функция handleSearch принимает в качестве аргумента searchQuery и устанавливает его в качестве нового значения для состояния setSearchQuery.
  function handleSearch (searchQuery) {
    setSearchQuery(searchQuery);
    localStorage.setItem('searchQueryMovies', searchQuery);
  }

  //Функция loadMoreMovies увеличивает значение movieCount на количество фильмов, которые нужно добавить при каждом нажатии на кнопку "Загрузить ещё"
  function loadMoreMovies () {
    setMovieCount(movieCount + moviesToShowOnPageByWindowSize.addMoviesOnPage);
  }
  //Функция handleToggleShortFilms принимает в качестве аргумента checked и устанавливает его в качестве нового значения для состояния setShortFilmsOnly.
  function handleShortFilmsFilterToggle (checked) {
    setShortFilmsFilter(checked);
    localStorage.setItem('shortFilmsFilterMovies', JSON.stringify(checked));
  }

  return (
    <main className='movies'>
      <SearchForm
        onSearch={handleSearch}
        onToggle={handleShortFilmsFilterToggle}
        checked={shortFilmsFilter}
      />
      {props.isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          addMovies={loadMoreMovies}
          maxMovies={movieCount}
        />
      )}
    </main>
  );
}

export default Movies;
