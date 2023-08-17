import { useState, useCallback } from 'react';
import isEmail from 'validator/es/lib/isEmail';

function useForm() {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isFormValid, setFormValid] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    if (name === 'name' && e.target.validity.patternMismatch) {
      e.target.setCustomValidity('Имя должно содержать только кириллицу, латиницу, пробел или дефис');
    } else if (name === 'email' && !isEmail(value)) {
      e.target.setCustomValidity('Неверный формат адреса электронной почты');
    } else {
      e.target.setCustomValidity('');
    }
    setValues((values) => ({ ...values, [name]: value }));
    setErrors((errors) => ({ ...errors, [name]: e.target.validationMessage }));
    const isFormValid = e.target.closest('form').checkValidity();
    setFormValid(isFormValid);
  }

  const resetValidation = useCallback(function reset(values = {}, errors = {}, isFormValid = false) {
    setValues(values);
    setErrors(errors);
    setFormValid(isFormValid);
  }, []);

  return { values, errors, isFormValid, onChange, resetValidation };
}

export default useForm;
