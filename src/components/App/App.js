import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Preloader from '../Preloader/Preloader';

import { CurrentUserContext } from '../../contexts/CurrentUserContext';

import mainApi from '../../utils/mainApi';
import moviesApi from '../../utils/moviesApi';
import auth from '../../utils/auth';
import { DURATE_VIEW_NOTIFY } from '../../utils/constants';

function App () {
  const [currentUser, setCurrentUser] = useState({}); // содержит информацию о текущем пользователе
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // состояние успешной авторизации определяет, авторизован ли пользователь
  const [isLoading, setIsLoading] = useState(true); // состояние загрузки  определяет, выполняется ли загрузка данных
  const [initialSavedMovies, setInitialSavedMovies] = useState([]); //содержит исходный список сохраненных фильмов, полученный изначально
  const [savedMovies, setSavedMovies] = useState([]); // состояние, которое хранит список сохраненных фильмов
  const [initialAllMovies, setInitialAllMovies] = useState([]); //содержит исходный список всех фильмов, полученный изначально
  const [allMovies, setAllMovies] = useState([]); //текущий список всех фильмов, который может изменяться в процессе работы
  const [errorFetchAuth, setErrorFetchAuth] = useState(''); //ошибки, возникающие при выполнении запросов на аутентификацию
  const [errorFetchEditProfile, setErrorFetchEditProfile] = useState(''); //ошибки, возникающие при выполнении запросов на редактирование профиля пользователя
  const [statusFetchEditProfile, setStatusFetchEditProfile] = useState(null); //статус выполнения запроса на редактирование профиля пользователя

  const navigate = useNavigate(); // хук

  useEffect(() => {
    handleGetUser();
  }, []);

  useEffect(() => {
    if (initialAllMovies.length && initialSavedMovies) {
      const updatedMovies = initialAllMovies.map((movie) => (
        initialSavedMovies.find((saved) => saved.movieId === movie.id)
          ? { ...movie, class: 'save', key: movie.id }
          : { ...movie, class: 'default', key: movie.id }
      ));

      const updatedSavedMovies = initialSavedMovies.map((movie) => (
        { ...movie, class: 'remove', key: movie._id }
      ));
      setAllMovies(updatedMovies);
      setSavedMovies(updatedSavedMovies);
      localStorage.setItem('allMovies', JSON.stringify(updatedMovies));
    }
  }, [initialAllMovies, initialSavedMovies]);

  useEffect(() => {
    if (isLoggedIn) {
      const allMoviesLocalStorage = localStorage.getItem('allMovies');
      if (allMoviesLocalStorage?.length > 0) {
        setInitialAllMovies(JSON.parse(allMoviesLocalStorage))
      }
      else {
        moviesApi.getMovies()
          .then((movies) => {
            setInitialAllMovies(movies);
          })
          .catch(err => console.log(err))
      }
    }
  }, [isLoggedIn]);

  useEffect(() => {
    isLoggedIn &&
      mainApi.getSavedMovies()
        .then((savedMovies) => {
          setInitialSavedMovies(savedMovies);
        })
        .catch(err => console.log(err))
  }, [isLoggedIn]);

  //проверкa токена аутентификации и установкa соответствующих значений флага isLoggedIn и переменной currentUser
  function handleGetUser () {
    auth.checkToken()
      .then((user) => {
        if (user && typeof user === 'object') {
          setIsLoggedIn(true);
          setCurrentUser(user);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }

  // регистрация
  function handleRegister ({ name, email, password }) {
    auth.register({ name, email, password })
      .then(() => {
        handleAutorize({ email, password });
      })
      .catch((err) => {
        setErrorFetchAuth('Ошибка авторизации: ' + err.message)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setErrorFetchAuth('')
        }, DURATE_VIEW_NOTIFY)
      })
  }

  // аутентификация(вход)
  function handleAutorize ({ email, password }) {
    setIsLoading(true);
    auth.authorize({ email, password })
      .then((res) => {
        setIsLoggedIn(true);// войдено
        navigate('/movies', { replace: true });// перебросить на страницу
        handleGetUser();
      })
      .catch((err) => {
        setErrorFetchAuth('Ошибка авторизации: ' + err)
        console.log(err)
      })
      .finally(() => {
        setIsLoading(false);
        setTimeout(() => {
          setErrorFetchAuth('')
        }, DURATE_VIEW_NOTIFY)
      })
  };

  function handleEditProfile ({ name, email }) {
    setIsLoading(true);
    mainApi.editProfile({ name, email })
      .then(() => {
        navigate('/profile', { replace: true });
        handleGetUser();
        setErrorFetchEditProfile('Данные успешно обновлены')
        setStatusFetchEditProfile(true)
      })
      .catch((err) => {
        setErrorFetchEditProfile('Ошибка обновления: ' + err.message)
        setStatusFetchEditProfile(false)
        console.log(err)
      })
      .finally(() => {
        setTimeout(() => {
          setErrorFetchEditProfile('')
        }, DURATE_VIEW_NOTIFY)
        setIsLoading(false);
      })
  };

  // console.log(movie)
  const handleSaveMovie = (movie) => {
    mainApi.saveMovie(movie)
      .then((res) => {
        const updatedMovies = allMovies.map((movieToUpdate) =>
          movieToUpdate.id === res.movieId ? { ...movieToUpdate, class: 'save' } : movieToUpdate
        );
        setAllMovies(updatedMovies);
        res.class = 'remove';
        setSavedMovies((prevMovies) => [...prevMovies, res]);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteMovie = (movie) => {
    if (movie._id) {
      mainApi.deleteMovie(movie._id)
        .then(() => {
          setSavedMovies((state) => state.filter((movieToUpdate) => movieToUpdate._id !== movie._id));
          setAllMovies((state) => state.map((movieToUpdate) =>
            movieToUpdate.id === movie.movieId ? { ...movieToUpdate, class: 'default' } : movieToUpdate
          )
          );
        })
        .catch((err) => console.log(err));
    } else {
      const savedMovie = savedMovies.find((movieToUpdate) => movieToUpdate.movieId === movie.id);
      if (savedMovie) {
        mainApi.deleteMovie(savedMovie._id)
          .then(() => {
            setAllMovies((state) => state.map((movieToUpdate) =>
              movieToUpdate.id === movie.id ? { ...movieToUpdate, class: 'default' } : movieToUpdate
            )
            );
            setSavedMovies((prevMovies) => prevMovies.filter((movieToUpdate) => movieToUpdate.movieId !== savedMovie.movieId)
            );
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const handleSignOut = () => {
    auth.logout()
      .then(() => {
        localStorage.clear();
        setIsLoggedIn(false); // не вошли
        navigate('/', { replace: true }); // перебросить на главную
      })
      .catch((err) => console.log(err));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      {isLoading ? (
        <Preloader />
      ) : (
        <div className='page'>
          <div className='page__content'>
            <Routes>
              <Route path='/'
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <Main />
                    <Footer />
                  </>
                }
              />
              <Route
                path='/movies'
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <ProtectedRoute
                      element={Movies}
                      isLoggedIn={isLoggedIn}
                      handleDeleteMovie={handleDeleteMovie}
                      handleSaveMovie={handleSaveMovie}
                      movies={allMovies}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path='/saved-movies'
                element={
                  <>
                    <Header isLoggedIn={isLoggedIn} />
                    <ProtectedRoute
                      element={SavedMovies}
                      isLoggedIn={isLoggedIn}
                      movies={savedMovies}
                      handleDeleteMovie={handleDeleteMovie}
                    />
                    <Footer />
                  </>
                }
              />
              <Route
                path='/profile'
                element={
                  <ProtectedRoute
                    element={Profile}
                    isLoggedIn={isLoggedIn}
                    isLoading={isLoading}
                    onSignOut={handleSignOut}
                    onEditProfile={handleEditProfile}
                    errorFetchEditProfile={errorFetchEditProfile}
                    statusFetchEditProfile={statusFetchEditProfile}
                  />
                }
              />
              <Route
                path='/signup'
                element={
                  <Register
                    onSignup={handleRegister}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    errorFetchAuth={errorFetchAuth}
                  />
                }
              />
              <Route
                path='/signin'
                element={
                  <Login
                    onSignin={handleAutorize}
                    isLoading={isLoading}
                    isLoggedIn={isLoggedIn}
                    errorFetchAuth={errorFetchAuth}
                  />
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </div>
        </div>
      )}
    </CurrentUserContext.Provider>
  );
}
export default App;
