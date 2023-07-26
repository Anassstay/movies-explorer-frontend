import { Link } from 'react-router-dom';
import './Auth.css';
import Logo from '../Header/Logo/Logo';
import Form from './Form/Form';

function Auth({ headerText, buttonText, paragraphText, url, linkText, children }) {
  return (
    <section className='auth'>
      <Logo />
      <h1 className='auth__title'>{headerText}</h1>
        <div className='auth__container'>
          <Form buttonText={buttonText}>
            {children}
          </Form>
          <div className='auth__link'>
            <p className='auth__link-text'>{`${paragraphText} зарегистрированы?`}</p>
            <Link to={url} className='auth__link-signin'>{linkText}</Link>
          </div>
        </div>
      </section>
  );
}

export default Auth;
