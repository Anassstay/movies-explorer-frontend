// import React from 'react';
// import './Movies.css';
// import Search from '../SearchForm/SearchForm';
// import MoviesCardList from '../MoviesCardList/MoviesCardList';

// import Preloader from '../Preloader/Preloader';

// function Movies() {

//   return (
//     <main className='movies'>
//       {isLoading ? (
//         <Preloader />
//       ) : (
//         <>
//           <Search />
//           <MoviesCardList movies={items} />
//           <button className='movies__button'>Ещё</button>
//         </>
//       )}
//     </main>
//   );
// }

// export default Movies;

// Movies — компонент страницы с поиском по фильмам. В нём пригодятся эти компоненты:
// SearchForm — форма поиска, куда пользователь будет вводить запрос. Обратите внимание на фильтр с чекбоксом «Только короткометражки». Для него можно воспользоваться отдельным управляемым компонентом FilterCheckbox.
// Preloader — отвечает за работу прелоадера.
// MoviesCardList — компонент, который управляет отрисовкой карточек фильмов на страницу и их количеством.
// MoviesCard — компонент одной карточки фильма.

import SearchForm from './SearchForm/SearchForm';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import Preloader from './Preloader/Preloader';
import moviesCards from '../../utils/moviesCards';
import './Movies.css';

function Movies({ isLoading }) {
  return (
    <main className='movies'>
      <SearchForm />
      {isLoading ? (
        <Preloader />
      ) : (
        <MoviesCardList
          moviesCards={moviesCards}
          buttonType='save'
          isMovieSaved={false}
        />
      )}
    </main>
  );
}

export default Movies;