import React from 'react';
import './MainPage.scss'
import { NavLink } from 'react-router-dom';

const MainPage: React.FC = () => {
  return (
  <article className = "mainPage-wrapper">
    <div className='mainPage-man_block'>
      <h2>For Man</h2>
      <NavLink to='/man'>Buy Now</NavLink>
    </div>
    <div className='mainPage-woman_block'>
      <h2>For Woman</h2>
      <NavLink to='/woman'>Buy Now</NavLink>
    </div>
    <div className='mainPage-child_block'>
      <h2>For Children</h2>
      <NavLink to='/children'>Buy Now</NavLink>
    </div>
  </article>
  )
};

export default MainPage;
