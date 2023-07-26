import './NotFound.css';

function NotFound({ navigateToMainPage }) {
  return (
    <main className='notfound'>
      <section className='notfound__content'>
        <h1 className='notfound__title'>404</h1>
        <p className='notfound__text'>Страница не найдена</p>
        <button type='button' className='notfound__button' onClick={navigateToMainPage}>Назад</button>
      </section>
    </main>
  );
}

export default NotFound;
