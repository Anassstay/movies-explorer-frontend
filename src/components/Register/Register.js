import './Register.css';
import Auth from '../Auth/Auth';

const Register = ({ user }) => {
  return (
    <main className='register'>
      <Auth
        headerText='Добро пожаловать!'
        buttonText='Зарегистрироваться'
        paragraphText='Уже'
        url='/signin'
        linkText='Войти'
        name='register'
      >
        <label className='register__input-label' htmlFor='name'>Имя</label>
        <input
          className='register__input'
          placeholder='Имя'
          type='text'
          name='name'
          id='name'
          autoComplete='off'
          required
          minLength='5'
          maxLength='30'
          defaultValue={user.name}

        />
        <span className='register__error'></span>
        <label className='register__input-label' htmlFor='email'>E-mail</label>
        <input
          className='register__input'
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          required
          minLength='5'
          maxLength='30'
          defaultValue={user.email}

        />
        <span className='register__error'></span>
        <label className='register__input-label' htmlFor='password'>Пароль</label>
        <input
          type='password'
          className='register__input register__input_is_not-valid'
          name='password'
          id='password'
          placeholder='Пароль'
          minLength='5'
          maxLength='30'
          autoComplete='off'
          defaultValue='qwerty123'
          required
        />
        <span className='register__error'>Что-то пошло не так...</span>
      </Auth>
    </main>
  );
};

export default Register;
