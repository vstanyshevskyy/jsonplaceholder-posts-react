import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.css';

export default () => {
  return (
    <nav className='navigation'>
      <div className='navigation__inner'>
        <div className='navigation__title'>FE assignment</div>
        <NavLink className='navigation__link' to='/' exact activeClassName='navigation__link--active'>
          Home
        </NavLink>
      </div>
    </nav>
  );
}