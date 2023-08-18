import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox ({ isDefaultValues }) {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        id='checkbox'
        defaultChecked={isDefaultValues || localStorage.getItem('shortFilmsFilterMovies') ? JSON.parse(localStorage.getItem('shortFilmsFilterMovies')) : false}
      />
    </div>
  );
}

export default FilterCheckbox;
