import { useEffect, useState } from 'react';
import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import MoviesCard from './MoviesCard/MoviesCard';
import Preloader from './Preloader/Preloader';
import { filterMoviesHandler } from '../../utils/filterMoviesHandler';
import { ResizeHandler } from '../../utils/resizeHandler';
import './Movies.css';

function Movies(props) {
  // console.log(allMovies);
  // console.log("allMovies");

  const moviesToShowOnPageByWindowSize = ResizeHandler();
  const [searchQuery, setSearchQuery] = useState('');
  const [shortFilmsFilter, setShortFilmsFilter] = useState(() => {
    const savedShortFilmsFilter = sessionStorage.getItem('shortFilmsFilterMovies');
    return savedShortFilmsFilter ? JSON.parse(savedShortFilmsFilter) : false;
  });
  const [movieCount, setMovieCount] = useState(0);

  useEffect(() => {
    setMovieCount(moviesToShowOnPageByWindowSize.moviesOnPage);
  }, [moviesToShowOnPageByWindowSize]);

  //срабатывает при изменении значения searchQuery и сохраняет его в sessionStorage под ключом 'searchQuery'
  useEffect(() => {
    sessionStorage.setItem('searchQueryMovies', searchQuery);
  }, [searchQuery]);

  //срабатывает при изменении значения shortFilmsFilter и сохраняет его в sessionStorage под ключом 'shortFilmsFilterMovies'
  useEffect(() => {
    sessionStorage.setItem('shortFilmsFilterMovies', JSON.stringify(shortFilmsFilter));
  }, [shortFilmsFilter]);

  //Константа movies получает отфильтрованный список фильмов с помощью функции filterMoviesHandler, которой передаются следующие параметры: 
  //movies (весь список фильмов), searchQuery (строка для поиска), shortFilmsFilter (флаг, указывающий на то, нужны ли только фильмы короткометражного типа)
  // и movieCount (количество фильмов, которые нужно показать).
  const movies = filterMoviesHandler(props.movies, searchQuery, shortFilmsFilter, movieCount);
  // console.log(props.movies);
  // console.log(movies);
  // console.log("movies");
  //Каждый элемент массива movies преобразуется с помощью метода map в компонент MoviesCard, которому передаются следующие параметры: 
  //key (уникальный идентификатор элемента), class (класс для стилизации компонента), movie (объект с информацией о фильме), 
  //onDelete (обработчик удаления фильма) и onSave (обработчик сохранения фильма)
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

  //Функция handleSearch принимает в качестве аргумента searchQuery и устанавливает его в качестве нового значения для состояния setSearchQuery
  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
  }

  //Функция loadMoreMovies увеличивает значение movieCount на количество фильмов, которые нужно добавить при каждом нажатии на кнопку 'ещё'
  function loadMoreMovies() {
    setMovieCount(movieCount + moviesToShowOnPageByWindowSize.addMoviesOnPage);
  }
 //Функция handleToggleShortFilms принимает в качестве аргумента checked и устанавливает его в качестве нового значения для состояния setShortFilmsOnly
  function handleShortFilmsFilterToggle(checked) {
    setShortFilmsFilter(checked);
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
