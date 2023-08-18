import { Navigate } from 'react-router-dom';
import './Register.css';
import Auth from '../Auth/Auth';
import useForm from '../../hooks/useForm';
import { nameRegExp } from '../../utils/regExp';

const Register = (props) => {
  const { values, errors, isFormValid, onChange } = useForm();
  function handleSubmit (e) {
    e.preventDefault();
    props.onSignup(values);
  }

  return props.isLoggedIn ? (
    <Navigate to='/' replace />
  ) : (
    <main className='register'>
      <Auth
        headerText='Добро пожаловать!'
        buttonText={props.isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
        paragraphText='Уже'
        url='/signin'
        linkText='Войти'
        name='register'
        handleSubmit={handleSubmit}
        isFormValid={isFormValid}
        errorFetchAuth={props.errorFetchAuth}
      >
        <label className='register__input-label' htmlFor='name'>Имя</label>
        <input
          className={`register__input ${errors.name && 'register__input_is_not-valid'
            }`}
          placeholder='Имя'
          type='text'
          name='name'
          id='name'
          form='form'
          autoComplete='off'
          required
          minLength='5'
          maxLength='30'
          pattern={nameRegExp}
          disabled={props.isLoading ? true : false}
          value={values.name || ''}
          onChange={onChange}
        />
        <span className='register__error'>{errors.name}</span>
        <label className='register__input-label' htmlFor='email'>E-mail</label>
        <input
          className={`register__input ${errors.email && 'register__input_is_not-valid'}`}
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          form='form'
          autoComplete='off'
          required
          minLength='8'
          maxLength='30'
          disabled={props.isLoading ? true : false}
          value={values.email || ''}
          onChange={onChange}
        />
        <span className='register__error'>{errors.email}</span>
        <label className='register__input-label' htmlFor='password'>Пароль</label>
        <input
          className={`register__input ${errors.password && 'register__input_is_not-valid'}`}
          placeholder='Пароль'
          type='password'
          name='password'
          id='password'
          form='form'
          autoComplete='off'
          required
          minLength='8'
          maxLength='30'
          disabled={props.isLoading ? true : false}
          value={values.password || ''}
          onChange={onChange}
        />
        <span className='register__error'>{errors.password}</span>
      </Auth>
    </main>
  );
};

export default Register;
