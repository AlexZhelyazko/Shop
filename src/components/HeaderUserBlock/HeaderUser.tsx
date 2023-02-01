import './headerUser.scss';
import React, { useState } from 'react';

export const HeaderUser = () => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const handleClick = (e: any) => {
    setPopUpVisible(!popUpVisible);
  };
  return (
    <div className="header__user" onClick={(e) => handleClick(e)}>
      <span className="header__user-name">name</span>
      <div className="header__user-avatar"></div>
      {popUpVisible && (
        <div className="header__user-popup">
          <span>Exit</span>
        </div>
      )}
    </div>
  );
};
