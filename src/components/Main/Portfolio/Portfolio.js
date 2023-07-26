import '../Portfolio/Portfolio.css';
import { Link } from 'react-router-dom';

function Portfolio() {
  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        <li className='portfolio__item'>
          <Link className='portfolio__item-link' to='https://github.com/Anassstay/how-to-learn/' target='_blank' rel='noopener noreferrer'>
            Статичный сайт
            <span className='portfolio__arrow'>↗</span>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link className='portfolio__item-link' to='https://github.com/Anassstay/russian-travel/' target='_blank' rel='noopener noreferrer'>
            Адаптивный сайт
            <span className='portfolio__arrow'>↗</span>
          </Link>
        </li>
        <li className='portfolio__item'>
          <Link className='portfolio__item-link' to='https://github.com/Anassstay/react-mesto-auth/' target='_blank' rel='noopener noreferrer'>
            Одностраничное приложение
            <span className='portfolio__arrow'>↗</span>
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;