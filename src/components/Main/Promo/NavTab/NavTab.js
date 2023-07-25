import './NavTab.css';

function NavTab() {
  return (
    <ul className='promo__navtab'>
      <li className='promo__navtab-item'>
        <a className='promo__navtab-text' href='#project'>
          О проекте
        </a>
      </li>
      <li className='promo__navtab-item'>
        <a className='promo__navtab-text' href='#techs'>
          Технологии
        </a>
      </li>
      <li className='promo__navtab-item'>
        <a className='promo__navtab-text' href='#aboutme'>
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
