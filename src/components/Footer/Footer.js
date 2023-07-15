import '../Footer/Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer__container'>
        <p className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className='footer__content'>
          <p className='footer__date'>&copy; {new Date().getFullYear()}</p>
          <nav>
            <ul className='footer__nav'>
              <li>
                <Link className='footer__nav-link' to='https://practicum.yandex.ru/' target='_blank' rel='noopener noreferrer'>Яндекс.Практикум</Link>
              </li>
              <li>
                <Link className='footer__nav-link' to='https://github.com/Anassstay' target='_blank' rel='noopener noreferrer'>Github</Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
