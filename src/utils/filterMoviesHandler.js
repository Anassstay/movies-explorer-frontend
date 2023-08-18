import { ResizeHandler } from './resizeHandler';
import { SHORT_MOVIE  } from './constants';

//принимает четыре параметра: movies (массив фильмов), searchQuery (строка поискового запроса), 
//shortFilmFilter (флаг фильтра для короткометражных фильмов) и count (количество фильмов для отображения)
export const filterMoviesHandler = (movies, searchQuery, shortFilmFilter, count) => {
  const defaultCount = ResizeHandler();
  if (!movies) {
    return [];
  }
  // Добавляем проверку наличия значения defaultCount.count
  const moviesCount = count || (defaultCount ? defaultCount.count : 0);

  let filteredMovies = movies;

//Массив filteredMovies фильтруется, чтобы оставить фильмы с названиями в нижнем регистре
  if (searchQuery) {
    const queryInLowerCase = searchQuery.toLowerCase();
    filteredMovies = filteredMovies.filter((movie) =>
      movie.nameRU.toLowerCase().includes(queryInLowerCase)
    );
  }

//Если shortFilmFilter true, то массив фильтруется, чтобы оставить только те фильмы, у которых значение продолжительность меньше или равно 40
  if (shortFilmFilter) {
    filteredMovies = filteredMovies.filter(
      (movie) => movie.duration <= SHORT_MOVIE
    );
  }
  filteredMovies = filteredMovies.slice(0, moviesCount);

  return filteredMovies;
}