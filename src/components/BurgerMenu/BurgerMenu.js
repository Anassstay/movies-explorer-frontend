import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import AccountButton from '../Header/AccountButton/AccountButton';

function BurgerMenu({ onClickClose, opened }) {
  return (
    <div className={`overlay ${opened ? 'visible' : ''}`}>
      <nav className={`burger-menu ${opened ? 'burger-menu__active' : ''}`}>
        <button
          type='button'
          className='burger-menu__close-button'
          onClick={onClickClose}
        />
        <ul className='burger-menu__list'>
          <li className='burger-menu__list-item'>
            <NavLink className='burger-menu__link' to='/'>
              Главная
            </NavLink>
          </li>
          <li className='burger-menu__list-item'>
            <NavLink className='burger-menu__link burger-menu__link_active' to='/movies'>
              Фильмы
            </NavLink>
          </li>
          <li className='burger-menu__list-item'>
            <NavLink className='burger-menu__link' to='/saved-movies'>
              Сохранённые фильмы
            </NavLink>
          </li>
        </ul>
        <div className='burger-menu__account-container'>
          <NavLink className='burger-menu__account-link' to='/profile'>
          <AccountButton />
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default BurgerMenu;
