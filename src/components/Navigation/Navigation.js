import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../Navigation/Navigation.css';
import '../Header/Header.css';
import AccountButton from '../Header/AccountButton/AccountButton';
import BurgerMenu from '../BurgerMenu/BurgerMenu';

function Navigation({ isLoggedIn }) {
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

  const navigationClass = `navigation ${isLoggedIn ? 'navigation-movies' : ''}`;
  const burgerMenuClass = `navigation-burger-menu ${opened ? 'navigation-burger-menu_open' : ''}`;
  const showBurgerMenu = isMobile && isLoggedIn;

  return (
    <nav className={navigationClass}>
      {isLoggedIn ? (
        <div className='navigation__container'>
          {showBurgerMenu && (
            <button type='button' className='navigation__burger_button' onClick={() => setOpened(true)}></button>
          )}
          <div className={`navigation__links-movies ${showBurgerMenu ? 'navigation__links-movies-hidden' : ""}`}>
            <NavLink className="navigation__link-movies" exact to='/movies'>
              Фильмы
            </NavLink>
            <NavLink className='navigation__link-movies' exact to='/saved-movies'>
              Сохранённые фильмы
            </NavLink>
          </div>
          <NavLink
            className={`navigation__link-account ${showBurgerMenu ? 'navigation__link-account-hidden' : ''}`}
            to="/profile"
          >
            <AccountButton />
          </NavLink>
          <div className={burgerMenuClass}>
            <BurgerMenu onClickClose={() => setOpened(false)} />
          </div>
        </div>
      ) : (
        <div className='navigation__link-auth'>
          <NavLink className='navigation__link-signup' exact to='/signup'>
            Регистрация
          </NavLink>
          <NavLink className='navigation__link-signin' exact to='/signin'>
            Войти
          </NavLink>
        </div>
      )}
    </nav>
  );
}

export default Navigation;