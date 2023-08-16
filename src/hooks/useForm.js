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

// import { useState, useCallback } from "react";

// const useFormValidation = () => {
//   const [formState, setFormState] = useState({
//     values: {},
//     errors: {},
//     isInputValid: false,
//   });

//   const handleChange = (event) => {
//     const { name, value, validationMessage } = event.target;
//     const form = event.target.closest("form");

//     setFormState((prevState) => ({
//       values: {
//         ...prevState.values,
//         [name]: value,
//       },
//       errors: {
//         ...prevState.errors,
//         [name]: validationMessage,
//       },
//       isInputValid: form ? form.checkValidity() : prevState.isInputValid,
//     }));
//   };

//   const resetForm = useCallback(
//     (newValues = {}, newErrors = {}, newIsInputValid = false) => {
//       setFormState({
//         values: newValues,
//         errors: newErrors,
//         isInputValid: newIsInputValid,
//       });
//     },
//     []
//   );

//   return {
//     ...formState,
//     handleChange,
//     resetForm,
//   };
// };

// export default useFormValidation;
