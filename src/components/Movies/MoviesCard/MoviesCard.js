import './MoviesCard.css';

function MoviesCard(props) {

  function time(duration) {
    const number = parseInt(duration);
    const hours = Math.floor(number / 60);
    const minutes = number % 60;
    return `${hours}ч ${minutes}м`;
  }

  // console.log(props.movie)
  function save() {
    props.onSave(props.movie);
  }

  function remove() {
    props.onDelete(props.movie);
  }

  return (
    <div className='movies-card'>
      <div className='movies-card__container-top'>
        <div className='movies-card__content'>
          <h2 className='movies-card__title'>{props.movie.nameRU}</h2>
          <p className='movies-card__duration'>{time(props.movie.duration)}</p>
        </div>
        <div>
          <div
            className={`movies-card__${props.class}`}
            onClick={props.class === 'default' ? save : remove}
          ></div>
        </div>
      </div>
      <a
        className='movies-card__link'
        href={props.movie.trailerLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img
          className='movies-card__image'
          src={
            props.class !== 'remove'
              ? `https://api.nomoreparties.co/${props.movie.image.url}`
              : props.movie.image
          }
          alt={props.movie.nameRU}
        />
      </a>
    </div>
  );
}
export default MoviesCard;
