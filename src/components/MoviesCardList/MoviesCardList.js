import './MoviesCardList.css';

function MoviesCardList (props) {

  return (
    <section className='movies-card-list'>
      <div className='movies-card-list__container'>
        {props.moviesCards.length > 0 ? (
          <ul className='movies-card-list__list'>{props.moviesCards}
          </ul>
        ) : (
          <p className='moviescard-list__notfound'>Ничего не найдено</p>
        )}
      </div>
      {props.qtyItemsFilteredMovies > props.moviesCards.length && (
        <button className='movies-card-list__more-button' type='button' onClick={props.addMovies}>Ещё</button>
      )}
    </section>
  );
}

export default MoviesCardList;
