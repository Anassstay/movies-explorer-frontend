import React from 'react';
import { NavLink } from 'react-router-dom';
import './BurgerMenu.css';
import Popup from '../Popup/Popup';
import AccountButton from '../Header/AccountButton/AccountButton';

function BurgerMenu(props) {
  return (
    <Popup isOpen={props.isOpen} onClose={props.onClose}>
      <nav className={`burger-menu ${props.isOpen ? 'burger-menu_active' : ''}`}>
        <button
          type='button'
          className='burger-menu__close-button'
          onClick={props.onClose}
        />
        <ul className='burger-menu__list'>
          <li className='burger-menu__list-item'>
            <NavLink to='/' 
              className={({ isActive }) =>`burger-menu__link ${isActive ? 'burger-menu__link_active' : ''}`}
              onClick={props.onClose}
            >
              Главная
            </NavLink>
          </li>
          <li className='burger-menu__list-item'>
            <NavLink to='/movies'
              className={({ isActive }) =>`burger-menu__link ${isActive ? 'burger-menu__link_active' : ''}`}
              onClick={props.onClose}
            >
              Фильмы
            </NavLink>
          </li>
          <li className='burger-menu__list-item'>
            <NavLink to='/saved-movies'
              className={({ isActive }) =>`burger-menu__link ${isActive ? 'burger-menu__link_active' : ''}`}
              onClick={props.onClose}
            >
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
    </Popup>
  );
}

export default BurgerMenu;
