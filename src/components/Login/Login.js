import './Login.css';
import Auth from '../Auth/Auth';

const Login = ({ user }) => {
  return (
    <main className='login'>
      <Auth
        headerText='Рады видеть!'
        buttonText='Войти'
        paragraphText='Ещё не'
        url='/signup'
        linkText='Регистрация'
        name='login'
      >
        <label className='login__input-label' htmlFor='email'>E-mail</label>
        <input
          className='login__input'
          placeholder='E-mail'
          type='email'
          name='email'
          id='email'
          autoComplete='off'
          required
          defaultValue={user.email}
        />
        <span className='login__error'></span>
        <label className='login__input-label' htmlFor='password'>Пароль</label>
        <input
          className='login__input'
          placeholder='Пароль'
          type='password'
          name='password'
          id='password'
          autoComplete='off'
          required
          minLength='5'
          maxLength='30'
        />
        <span className='login__error'></span>
        <div className='login__empty-place'></div>
      </Auth>
    </main>
  );
};

export default Login;