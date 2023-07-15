import './AboutMe.css';
import myphoto from '../../../images/myphoto.jpg';
import Title from '../../Title/Title';
import { Link } from 'react-router-dom';

function AboutMe() {
  return (
    <section className='aboutme' id='about-me'>
      <div className='aboutme__container'>
        <Title title='Студент' />
        <div className='aboutme__info'>
          <img className='aboutme__photo' src={myphoto} alt='Фото автора' />
          <h3 className='aboutme__title'>Анастасия</h3>
          <p className='aboutme__subtitle'>Фронтенд-разработчик, 25 лет</p>
          <p className='aboutme__text'>
            Я недавно переехала в Москву.  Всегда хотела попробовать себя в сфере IT. Поэтому в сентябре 2022 года начала обучение по веб-разработке в Я.Практикум.
            Совмещаю обучение с работой и обучением в ординатуре на врача-стоматолога ортодонта. Хочу в будущем совместить эти две сферы, 
            сделать крутой продукт и  облегчить работу врачам. Люблю гулять, путешествовать и наполнять свою квартиру уютом.
          </p>
          <Link className='aboutme__github-link' to='https://github.com/Anassstay' target='_blank' rel='noopener noreferrer'>
            Github
          </Link>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;