import './Form.css';

function Form (props) {
  return (
    <form className='form' name={props.name} onSubmit={props.handleSubmit}>
      {props.children}
      <button className='form__submit-button' type='submit' disabled={!props.isFormValid}>{props.buttonText}</button>
    </form>
  );
}

export default Form;
