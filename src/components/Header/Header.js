import Navigation from '../Navigation/Navigation';
import '../Header/Header.css';
import Logo from './Logo/Logo';

function Header({ isLoggedIn }) {

  return (
    <header className='header'>
      <div className='header__container'>
      <Logo />
      <div className='header__content'>
        {isLoggedIn ? (
          <>
            <Navigation isLoggedIn={isLoggedIn} />
          </>
        ) : (
          <Navigation isLoggedIn={isLoggedIn} />
        )}
      </div>
      </div>
    </header>
  );
}

export default Header;