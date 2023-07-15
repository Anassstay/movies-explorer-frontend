import './Form.css';

function Form({ name, children, buttonText }) {
  return (
    <form className='form' action='#' name={name}>
      {children}
    <button className='form__submit-button' type='submit'>{buttonText}</button>
    </form>
  );
}

export default Form;
