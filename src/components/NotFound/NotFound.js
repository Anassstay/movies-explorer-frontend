import './NotFound.css';
import { useNavigate } from 'react-router-dom';

function NotFound () {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  }
  return (
    <main className='notfound'>
      <section className='notfound__content'>
        <h1 className='notfound__title'>404</h1>
        <p className='notfound__text'>Страница не найдена</p>
        <button type='button' className='notfound__button' onClick={handleClick}>Назад</button>
      </section>
    </main>
  );
}

export default NotFound;
