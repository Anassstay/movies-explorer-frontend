import React from 'react';
import './MoviesCard.css';

function MoviesCard({ movieCard, isMovieSaved }) {

  const cardSave = `movies-card__save-button ${movieCard.isActive ? 'movies-card__save-button_active' : ''}`;

  return (
    <div className='movies-card'>
      <div className='movies-card__container-top'>
        <div className='movies-card__content'>
          <h2 className='movies-card__title'>{movieCard.nameRU}</h2>
          <p className='movies-card__duration'>{movieCard.duration}</p>
        </div>

        {isMovieSaved ? (
          <button
            className='movies-card__save-button_active movies-card__delete-button'
          />
          ) : (
          <button 
            className={cardSave}
          />
          )}

      </div>
      <a
        className='movies-card__link'
        href={movieCard.trailerLink}
        target='_blank'
        rel='noopener noreferrer'
      >
        <img className='movies-card__image' alt={movieCard.nameRU} src={movieCard.image} />
      </a>
    </div>
  );
}
export default MoviesCard;
