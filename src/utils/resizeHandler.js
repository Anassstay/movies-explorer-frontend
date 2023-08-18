import { useEffect, useState } from 'react';
import { MAX_MOVIES_ON_PAGE, MAX_ADD_MOVIES_ON_PAGE } from './constants';

export function ResizeHandler() {
  const [moviesToShowOnPageByWindowSize, setMoviesToShowOnPageByWindowSize] = useState({
    moviesOnPage: MAX_MOVIES_ON_PAGE,
    addMoviesOnPage: MAX_ADD_MOVIES_ON_PAGE,
  });
  //обработчик события handleWindowResize, который будет вызываться при изменении размера окна.
   useEffect(() => {
      const handleWindowResize = () => {
        const screenWidth = window.innerWidth;//получаем ширину окна с помощью window.innerWidth
        let moviesOnPage = MAX_MOVIES_ON_PAGE;
        let addMoviesOnPage = MAX_ADD_MOVIES_ON_PAGE;
          if (screenWidth < 950) {
            moviesOnPage = 8;
            addMoviesOnPage = 2;
          }
          if (screenWidth < 550) {
            moviesOnPage = 5;
            addMoviesOnPage = 1;
          }//Затем мы проверяем ширину окна и устанавливаем новые значения для moviesOnPage и addMoviesOnPage.
          setMoviesToShowOnPageByWindowSize({ moviesOnPage, addMoviesOnPage });
      };

      const resizeTimeout = setTimeout(handleWindowResize, 1000);//чтобы колбэк-функция слушателя не срабатывала слишком часто, например при изменении ширины экрана в отладчике, мы рекомендуем установить setTimeout
      window.addEventListener('resize', handleWindowResize);
      return () => {
          window.removeEventListener('resize', handleWindowResize);
          clearTimeout(resizeTimeout);
      };
  }, []);
  
  return moviesToShowOnPageByWindowSize;//переменная состояния moviesToDisplay для отображения правильного количества фильмов на странице в зависимости от размера окна
}