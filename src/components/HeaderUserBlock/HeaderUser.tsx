import './headerUser.scss';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCurrentUser, setIsAuth } from '../../redux/auth/authSlice';

export const HeaderUser = () => {
  const [popUpVisible, setPopUpVisible] = useState(false);
  const dispatch = useDispatch();
  const handleClick = (e: any) => {
    setPopUpVisible(!popUpVisible);
  };
  const onExitClick = () => {
    dispatch(setIsAuth(false));
    // dispatch(setCurrentUser({}));
  };
  return (
    <div className="header__user" onClick={(e) => handleClick(e)}>
      <span className="header__user-name">name</span>
      <div className="header__user-avatar"></div>
      {popUpVisible && (
        <div className="header__user-popup">
          <span onClick={onExitClick}>Exit</span>
        </div>
      )}
    </div>
  );
};
