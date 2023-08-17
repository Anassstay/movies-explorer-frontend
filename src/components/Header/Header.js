import Navigation from '../Navigation/Navigation';
import '../Header/Header.css';
import Logo from './Logo/Logo';

function Header(props) {

  return (
    <header className='header'>
      <div className='header__container'>
      <Logo />
      <div className='header__content'>
        {props.isLoggedIn ? (
          <>
            <Navigation isLoggedIn={props.isLoggedIn} />
          </>
        ) : (
          <Navigation isLoggedIn={props.isLoggedIn} />
        )}
      </div>
      </div>
    </header>
  );
}

export default Header;