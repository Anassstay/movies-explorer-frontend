// App — корневой компонент приложения, его создаёт CRA.

import { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NotFound from '../NotFound/NotFound';
import Login from '../Login/Login';
import Register from '../Register/Register';
import Profile from '../Profile/Profile';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import Movies from '../Movies/Movies';

function App() {
  const navigate = useNavigate();
  const [isLoggedIn] = useState(true);
  const [user] = useState({ name: 'Анастасия', email: 'pochta@yandex.ru' });

  function handleNavigateToMainPage() {
    navigate('/');
  }

  function handleNavigateToProfile() {
    navigate('/profile');
  }


  return (
    <div className='root'>
      <div className='page'>
        <Routes>
          <Route
            path='/'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} onNavigateToProfile={handleNavigateToProfile}/>
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
                <Movies />
                <Footer />
              </>
            }
          />
          <Route
            path='/saved-movies'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <SavedMovies />
                <Footer />
              </>
            }
          />
          <Route
            path='/profile'
            element={
              <>
                <Header isLoggedIn={isLoggedIn} />
                <Profile user={user} />
              </>
            }
          />
          <Route path='/signup' element={<Register user={user}/>} />
          <Route path='/signin' element={<Login user={user}/>} />
          <Route path='*' element={<NotFound navigateToMainPage={handleNavigateToMainPage}/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;