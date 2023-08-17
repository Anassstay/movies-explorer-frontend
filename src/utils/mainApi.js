import { BASE_URL } from './constants';

class MainApi {
  constructor(options) {
    this._options = options;
    this._baseUrl = this._options.baseUrl;
  }

  _checkResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json()
  }

  getUserInfo() {
    return fetch(`${ BASE_URL }/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
      .then(this._checkResponse);
  }

  editProfile({ name, email }) {
    return fetch(`${ BASE_URL }/users/me`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({ name, email }),
    })
      .then(this._checkResponse);
  }

  getSavedMovies() {
    return fetch(`${ BASE_URL }/movies`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(this._checkResponse);
  }

  saveMovie(movie) {
    return fetch(`${ BASE_URL }/movies`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: 'https://api.nomoreparties.co' + movie.image.url,
        trailerLink: movie.trailerLink,
        thumbnail: 'https://api.nomoreparties.co' + movie.image.formats.thumbnail.url,
        movieId: movie.id,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      }),
    })
    .then(this._checkResponse);
  }

  deleteMovie(movieId) {
    return fetch(`${ BASE_URL }/movies${movieId}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(this._checkResponse);
  }
};

const mainApi = new MainApi({
  baseUrl: BASE_URL,
});

export default mainApi;