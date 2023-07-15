import './AboutProject.css';
import Title from '../../Title/Title';

function AboutProject() {
  return (
    <section className='project' id='project'>
      <Title title='О проекте' />
      <ul className='project__about'>
        <li className='project__about-column'>
          <h3 className='project__about-subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='project__about-text'>
            Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.
          </p>
        </li>
        <li className='project__about-column'>
          <h3 className='project__about-subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='project__about-text'>
            У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.
          </p>
        </li>
      </ul>
      <ul className='project__shedule'>
        <li className='project__shedule-container'>
          <h4 className='project__shedule-subtitle'>1 неделя</h4>
          <p className='project__shedule-text'>Back-end</p>
        </li>
        <li className='project__shedule-container project__shedule-container_long'>
          <h4 className='project__shedule-subtitle project__shedule-subtitle_color'>4 недели</h4>
          <p className='project__shedule-text'>Front-end</p>
        </li>
      </ul>
    </section>
  );
}

export default AboutProject;
