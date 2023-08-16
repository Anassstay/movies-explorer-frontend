import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Navigation/Navigation.css';
import '../Header/Header.css';
import AccountButton from '../Header/AccountButton/AccountButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation(props) {
  const [opened, setOpened] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setOpened(false);
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 900);
    };
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  const navigationClass = `navigation ${props.isLoggedIn ? 'navigation-movies' : ''}`;
  const burgerMenuClass = `navigation-burger-menu ${opened ? 'navigation-burger-menu_open' : ''}`;
  const showBurgerMenu = isMobile && props.isLoggedIn;

  return (
    <nav className={navigationClass}>
      {props.isLoggedIn ? (
        <div className='navigation__container'>
          {showBurgerMenu && (
            <button type='button' className='navigation__burger_button' onClick={() => setOpened(true)}></button>
          )}
          <div className={`navigation__links-movies ${showBurgerMenu ? 'navigation__links-movies-hidden' : ''}`}>
            <NavLink className='navigation__link-movies' to='/movies' onClick={props.onClose}>
              Фильмы
            </NavLink>
            <NavLink className='navigation__link-movies' to='/saved-movies' onClick={props.onClose}>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink
            className={`navigation__link-account ${showBurgerMenu ? 'navigation__link-account-hidden' : ''}`}
            to='/profile'
            onClick={props.onClose}
          >
            <AccountButton />
          </NavLink>
          <div className={burgerMenuClass}>
            <BurgerMenu onClickClose={() => setOpened(false)} />
          </div>
        </div>
      ) : (
        <div className='navigation__link-auth'>
          <NavLink className='navigation__link-signup' to='/signup'>
            Регистрация
          </NavLink>
          <NavLink className='navigation__link-signin' to='/signin'>
            Войти
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navigation;