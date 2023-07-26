import React from 'react';
import './SearchForm.css';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';


function SearchForm() {
  const [buttonDisabled, setButtonDisabled] = React.useState(false);

  console.log(setButtonDisabled);

  return (
    <section className='search'>
    <form className='search__form'>

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
          >
          </input>
        </div>
        <button className='search__submit_mobile' type='submit' disabled={buttonDisabled ? true : false}></button>
      </fieldset>

      <fieldset className='search__filter'>
        <button className='search__submit' type='submit' disabled={buttonDisabled ? true : false}></button>
        <div className='search__vertical-line'></div> 
        <FilterCheckbox />
        <p className='search__checkbox-text'>Короткометражки</p>
      </fieldset>
    </form>
    <div className='search__bottom-line'></div> 
  </section>
  );
}

export default SearchForm;
