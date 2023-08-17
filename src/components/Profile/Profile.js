import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import Header from '../Header/Header';
import useForm from '../../hooks/useForm';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { nameRegExp } from '../../utils/regExp';

function Profile(props) {
  const { values, errors, isFormValid, onChange, resetValidation } = useForm();
  const currentUser = useContext(CurrentUserContext);
  const [isCurrentUser, setUserDifference] = useState(true);
  const [isEdit, setEditStatus] = useState(false);

  useEffect(() => {
    if (values.name !== currentUser.name || values.email !== currentUser.email) {
      setUserDifference(true);
    } else {
      setUserDifference(false);
    }
  }, [values.name, values.email, currentUser.name, currentUser.email]);

  useEffect(() => {
    resetValidation({ name: currentUser.name, email: currentUser.email }, {}, false);
  }, [currentUser, resetValidation]);

  function handleEditClick () {
    setEditStatus(!isEdit);
  }
  function handleSubmit (e) {
    e.preventDefault();
    console.log(values);
    props.onEditProfile(values);
  }

  useEffect(() => {
    function handleEscClose (e) {
      if (e.key === 'Escape') {
        handleEditClick();
      }
    }
    if (isEdit) {
      document.addEventListener('keydown', handleEscClose);
    } else {
      document.removeEventListener('keydown', handleEscClose);
    }
  }, [isEdit]);
  
  return (
    <>
      <Header isLoggedIn={props.isLoggedIn} />
      <main className='profile'>
        <section className='profile__container'>
          <h1 className='profile__title' place='profile'>{`Привет, ${currentUser.name || ''}!`}</h1>
          <form
            className='profile__form'
            onSubmit={handleSubmit}
            isFormValid={isFormValid}
            values={values}
            isLoading={props.isLoading}
            buttonText={props.isLoading ? 'Сохранение...' : 'Сохранить'}
          >
            <label className='profile__input-label' htmlFor='name'>Имя</label>
            <input
              className={`profile__input ${errors.name ? 'profile__input_is_not-valid' : ''
                }`}
              placeholder='Имя'
              type='text'
              name='name'
              id='name'
              autoComplete='off'
              required
              minLength='2'
              maxLength='30'
              pattern={nameRegExp}
              disabled={isEdit && !props.isLoading ? false : true}
              onChange={onChange}
              value={values.name || ''}
            />
            <label className='profile__input-label profile__input-label_email' htmlFor='email'>E-mail</label>
            <input
              className={`profile__input profile__input-label_email ${errors.name ? 'profile__input_is_not-valid' : ''
                }`}
              placeholder='E-mail'
              type='email'
              name='email'
              id='email'
              autoComplete='off'
              required
              disabled={isEdit && !props.isLoading ? false : true}
              onChange={onChange}
              value={values.email || ''}
            />
            {isEdit ? (
              <button
                type='submit'
                disabled={props.isLoading || !isFormValid || !isCurrentUser}
                className={`profile__submit ${!isCurrentUser ? 'profile__submit_not-changed' : ''
                  }`}
              >
                Сохранить
              </button>
            ) : ''}
          </form>
          {!isEdit ? (
            <div className='profile__buttons'>
              <button className='profile__edit-button' type='button' onClick={handleEditClick}>Редактировать</button>
              <button className='profile__logout-button' type='button' onClick={props.onSignOut}>Выйти из аккаунта</button>
            </div>
          ) : ''}
        </section>
      </main>
    </>
  );
}

export default Profile;



































// import './Profile.css';
// import { useContext, useState, useEffect } from 'react';
// import Header from '../Header/Header';
// import useForm from '../../hooks/useForm';
// import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
// import { nameRegExp } from '../../utils/regExp';
// import mainApi from '../../utils/mainApi';

// function Profile ({
//   onSignOut,
//   isLoggedIn,
//   isLoading,
//   setIsLoading,
//   setCurrentUser,
//   setTooltipImageSrc,
//   setTooltipText,
//   setIsTooltipOpen,
//   // handleUnauthorized,
// }) {
//   const currentUser = useContext(CurrentUserContext);
//   const { values, errors, handleChange, isInputValid, resetForm } = useForm();

//   const [isEditing, setIsEditing] = useState(false);
//   const [isDataChanged, setIsDataChanged] = useState(false);


//   useEffect(() => {
//     if (currentUser) {
//       resetForm(currentUser);
//     }
//   }, [currentUser, resetForm]);

//   useEffect(() => {
//     if (
//       currentUser &&
//       (values.name !== currentUser.name || values.email !== currentUser.email)
//     ) {
//       setIsDataChanged(true);
//     } else {
//       setIsDataChanged(false);
//     }
//   }, [currentUser, values]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await handleUpdateUser({
//         name: values.name,
//         email: values.email,
//       });
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleToggleEditing = () => {
//     setIsEditing(true);
//   };

//   const handleUpdateUser = async (newUserInfo) => {
//     try {
//       setIsLoading(true);
//       const data = await mainApi.getUserInfo(newUserInfo);
//       setCurrentUser(data);
//       setIsEditing(false);
//       setIsLoading(false);
//       // setTooltipImageSrc(success);
//       setTooltipText("Данные профиля успешно изменены!");
//       setIsTooltipOpen(true);
//     } catch (err) {
//       console.log(err);
//       // handleUnauthorized(err);
//       setIsLoading(false);
//       // setTooltipImageSrc(failure);
//       setTooltipText("Что-то пошло не так! Попробуйте ещё раз.");
//       setIsTooltipOpen(true);
//     }
//   };

//   return (
//   <>
//     <Header isLoggedIn={isLoggedIn} />
//     <main className='profile'>
//       <section className='profile__container'>
//         <h1 className='profile__title' place='profile'>{`Привет, ${currentUser.name || ''}!`}</h1>
//         <form 
//           className='profile__form'
//           onSubmit={handleSubmit}

//         >
//           <label className='profile__input-label' htmlFor='name'>Имя</label>
//           <input
//             className={`profile__input ${
//               errors.name ? 'profile__input_is_not-valid' : ''
//             }`}
//             placeholder='Имя'
//             type='text'
//             name='name'
//             id='name'
//             autoComplete='off'
//             required
//             minLength='2'
//             maxLength='30'
//             pattern={nameRegExp}
//             onChange={handleChange}
//             disabled={!isEditing}
//             value={values.name || ""}
//           />
//           <label className='profile__input-label profile__input-label_email' htmlFor='email'>E-mail</label>
//           <input
//             className={`profile__input profile__input-label_email ${
//               errors.name ? 'profile__input_is_not-valid' : ''
//             }`}
//             placeholder='E-mail'
//             type='email'
//             name='email'
//             id='email'
//             autoComplete='off'
//             required
//             onChange={handleChange}
//             disabled={!isEditing}
//             value={values.email || ""}
//           />
//         {isEditing  ? (
//               <button
//                 type="submit"
//                 disabled={isLoading || !isInputValid || !isDataChanged}
//                 className={`profile__submit ${
//                   !isDataChanged ? "profile__submit_not-changed" : ""
//                 }`}
//               >
//                 Сохранить
//               </button>
//             ) : (
//           <div className='profile__buttons'>
//             <button className='profile__edit-button' type='button' onClick={handleToggleEditing}>Редактировать</button>
//             <button className='profile__logout-button' type='button'  onClick={onSignOut}>Выйти из аккаунта</button>
//           </div>
//         )}
//       </form>
//       </section>
//     </main>
//   </>
//   );
// }

// export default Profile;
