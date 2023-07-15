import './NavTab.css';

function NavTab() {
  return (
    <ul className='promo__navtab_list'>
      <li className='promo__navtab_list-item'>
        <a className='promo__navtab_list-text' href='#project'>
          О проекте
        </a>
      </li>
      <li className='promo__navtab_list-item'>
        <a className='promo__navtab_list-text' href='#techs'>
          Технологии
        </a>
      </li>
      <li className='promo__navtab_list-item'>
        <a className='promo__navtab_list-text' href='#aboutme'>
          Студент
        </a>
      </li>
    </ul>
  );
}

export default NavTab;
