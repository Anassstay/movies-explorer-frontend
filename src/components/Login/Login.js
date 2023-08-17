import { Navigate } from 'react-router-dom';
import './Login.css';
import Auth from '../Auth/Auth';
import useForm from '../../hooks/useForm';

const Login = (props) => {

  const { values, errors, isFormValid, onChange } = useForm();

  function handleSubmit(e) {
    e.preventDefault();
    props.onSignin(values);
  }

  return props.isLoggedIn ? (
    <Navigate to='/' replace />
  ) : (
    <main className='login'>
      <Auth
        headerText='Рады видеть!'
        buttonText={props.isLoading ? 'Вход...' : 'Войти'}
        paragraphText='Ещё не'
        url='/signup'
        linkText='Регистрация'
        name='login'
        onSubmit={handleSubmit}
        isFormValid={isFormValid}
      >
        <label className='login__input-label' htmlFor='email'>E-mail</label>
        <input
          className={`login__input ${
            errors.email ? 'login__input_is_not-valid' : ''
          }`}
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          required
          disabled={props.isLoading ? true : false}
          onChange={onChange}
          value={values.email || ""}
        />
        <span className='login__error'>{errors.email}</span>
        <label className='login__input-label' htmlFor='password'>Пароль</label>
        <input
          className={`login__input ${
            errors.password ? 'login__input_is_not-valid' : ''
          }`}
          placeholder='Пароль'
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          required
          minLength='5'
          maxLength='30'
          disabled={props.isLoading ? true : false}
          onChange={onChange}
          value={values.password || ""}
        />
        <span className='login__error'>{errors.password}</span>
        <div className='login__empty-place'></div>
      </Auth>
    </main>
  );
};

export default Login;
