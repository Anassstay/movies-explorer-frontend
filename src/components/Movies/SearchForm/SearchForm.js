import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';


function SearchForm ({ onSearch, onToggle, checked, isDefaultValues }) {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  function handleSubmit (e) {
    e.preventDefault();
    onSearch(e.target.search.value);
    onToggle(e.target.checkbox.checked)
  }
  function handleChange (e) {
    if (e.target.id === 'checkbox') {
      onToggle(e.target.checked)
    }
  }
  return (
    <section className='search'>
      <form className='search__form' onSubmit={handleSubmit} onChange={handleChange}>

        <fieldset className='search__line'>
          <div className='search__area'>
            <button className='search__magnifier'></button>
            <input
              className='search__input'
              placeholder='Фильм'
              type='text'
              name='search'
              id='search'
              autoComplete='off'
              required
              defaultValue={isDefaultValues || localStorage.getItem('searchQueryMovies') ? localStorage.getItem('searchQueryMovies') : ''}
            >
            </input>
          </div>
          <button className='search__submit_mobile' type='submit' disabled={buttonDisabled ? true : false}></button>
        </fieldset>

        <fieldset className='search__filter'>
          <button className='search__submit' type='submit' disabled={buttonDisabled ? true : false}></button>
          <div className='search__vertical-line'></div>
          <FilterCheckbox isDefaultValues={isDefaultValues} />
          <p className='search__checkbox-text'>Короткометражки</p>
        </fieldset>
      </form>
      <div className='search__bottom-line'></div>
    </section>
  );
}

export default SearchForm;
