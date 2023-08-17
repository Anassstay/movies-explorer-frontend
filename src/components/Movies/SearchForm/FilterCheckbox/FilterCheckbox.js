import React from 'react';
import './FilterCheckbox.css';

function FilterCheckbox() {
  return (
    <div className='checkbox'>
      <input
        className='checkbox__input'
        type='checkbox'
        id='checkbox'
        defaultChecked={localStorage.getItem('shortFilmsFilterMovies') && JSON.parse(localStorage.getItem('shortFilmsFilterMovies'))}
      />
    </div>
  );
}

export default FilterCheckbox;
