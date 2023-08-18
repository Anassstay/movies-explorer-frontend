import { Link } from 'react-router-dom';
import './Auth.css';
import Logo from '../Header/Logo/Logo';
import Form from './Form/Form';

function Auth (props) {
  return (
    <section className='auth'>
      <Logo />
      <h1 className='auth__title'>{props.headerText}</h1>
      <div className='auth__container'>
        <Form buttonText={props.buttonText} handleSubmit={props.handleSubmit} isFormValid={props.isFormValid}>
          {props.children}
          <span className={`auth__error ${props.errorFetchAuth ? 'auth__error_fetch' : ''}`}>{props.errorFetchAuth}</span>
        </Form>
        <div className='auth__link'>
          <p className='auth__link-text'>{`${props.paragraphText} зарегистрированы?`}</p>
          <Link to={props.url} className='auth__link-signin'>{props.linkText}</Link>
        </div>
      </div>
    </section>
  );
}

export default Auth;
