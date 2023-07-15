import './Profile.css';
// import Form from './Form/Form';
// import AuthTitle from './AuthTitle/AuthTitle';

function Profile({ user, name, isEdit, onSignOut, onEditProfile, isFormValid, onSubmit }) {

  return (
    <main className='profile'>
      <section className='profile__container'>
        <h1 className='profile__title' place='profile'>{`Привет, ${user.name}!`}</h1>
        <form className='profile__form' name={name} isFormValid={isFormValid}>
          <label className='profile__input-label' htmlFor='name'>Имя</label>
          <input
            className='profile__input'
            placeholder='Имя'
            type='text'
            name='name'
            id='name'
            autoComplete='off'
            required
            minLength='2'
            maxLength='30'
            defaultValue={user.name}
            disabled={isEdit ? false : true}
          />
          <label className='profile__input-label profile__input-label_email' htmlFor='email'>E-mail</label>
          <input
            className='profile__input profile__input-label_email'
            placeholder='E-mail'
            type='email'
            name='email'
            id='email'
            autoComplete='off'
            required
            defaultValue={user.email}
            disabled={isEdit ? false : true}
          />
          </form>
        {!isEdit && (
          <div className='profile__buttons'>
            <button className='profile__edit-button' type='button'>Редактировать</button>
            <button className='profile__logout-button' type='button'>Выйти из аккаунта</button>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
